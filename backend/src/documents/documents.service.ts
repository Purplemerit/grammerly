import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { UsersService } from '../users/users.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { ShareDocumentDto } from './dto/share-document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    private supabase: SupabaseService,
    private usersService: UsersService,
  ) {}

  async create(userId: string, createDto: CreateDocumentDto) {
    // Check document limit based on plan
    await this.checkDocumentLimit(userId);

    // Calculate word count and reading time
    const wordCount = this.calculateWordCount(createDto.content);
    const characterCount = createDto.content.length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed

    const { data, error } = await this.supabase
      .getClient()
      .from('documents')
      .insert({
        user_id: userId,
        title: createDto.title,
        content: createDto.content,
        type: createDto.type || 'article',
        language: createDto.language || 'en-US',
        word_count: wordCount,
        character_count: characterCount,
        reading_time_minutes: readingTime,
        is_public: createDto.isPublic || false,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create document: ${error.message}`);
    }

    return data;
  }

  async findAll(
    userId: string,
    page: number = 1,
    limit: number = 20,
    sort: string = '-created_at',
    search?: string,
    filter?: string,
  ) {
    const offset = (page - 1) * limit;
    let query = this.supabase
      .getClient()
      .from('documents')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .eq('is_deleted', false);

    // Apply filters
    if (filter === 'archived') {
      query = query.eq('is_archived', true);
    } else if (filter === 'draft') {
      query = query.eq('word_count', 0);
    } else {
      query = query.eq('is_archived', false);
    }

    // Search
    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    // Sorting
    const sortField = sort.startsWith('-') ? sort.slice(1) : sort;
    const ascending = !sort.startsWith('-');
    query = query.order(sortField, { ascending });

    // Pagination
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      throw new Error(`Failed to fetch documents: ${error.message}`);
    }

    return {
      data: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
      },
    };
  }

  async findOne(documentId: string, userId: string) {
    // Check if user has access (owner or shared)
    const document = await this.checkAccess(documentId, userId);

    return document;
  }

  async update(documentId: string, userId: string, updateDto: UpdateDocumentDto) {
    // Check access and permission
    const document = await this.checkAccess(documentId, userId);
    await this.checkEditPermission(documentId, userId);

    // Calculate new word count if content changed
    const updates: any = {
      updated_at: new Date().toISOString(),
    };

    if (updateDto.title !== undefined) {
      updates.title = updateDto.title;
    }

    if (updateDto.content !== undefined) {
      updates.content = updateDto.content;
      updates.word_count = this.calculateWordCount(updateDto.content);
      updates.character_count = updateDto.content.length;
      updates.reading_time_minutes = Math.ceil(updates.word_count / 200);
    }

    if (updateDto.type !== undefined) {
      updates.type = updateDto.type;
    }

    if (updateDto.isArchived !== undefined) {
      updates.is_archived = updateDto.isArchived;
    }

    if (updateDto.isPublic !== undefined) {
      updates.is_public = updateDto.isPublic;
    }

    const { data, error } = await this.supabase
      .getClient()
      .from('documents')
      .update(updates)
      .eq('id', documentId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update document: ${error.message}`);
    }

    return data;
  }

  async remove(documentId: string, userId: string) {
    // Check access
    await this.checkAccess(documentId, userId);

    // Soft delete
    const { error } = await this.supabase
      .getClient()
      .from('documents')
      .update({
        is_deleted: true,
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', documentId);

    if (error) {
      throw new Error(`Failed to delete document: ${error.message}`);
    }

    return { success: true, message: 'Document moved to trash' };
  }

  async restore(documentId: string, userId: string) {
    const { data: document, error } = await this.supabase
      .getClient()
      .from('documents')
      .select('*')
      .eq('id', documentId)
      .eq('user_id', userId)
      .single();

    if (error || !document) {
      throw new NotFoundException('Document not found');
    }

    if (!document.is_deleted) {
      throw new BadRequestException('Document is not deleted');
    }

    // Check if within 30-day recovery period
    const deletedAt = new Date(document.deleted_at);
    const daysSinceDeleted = (Date.now() - deletedAt.getTime()) / (1000 * 60 * 60 * 24);

    if (daysSinceDeleted > 30) {
      throw new BadRequestException('Document cannot be restored after 30 days');
    }

    const { data, error: updateError } = await this.supabase
      .getClient()
      .from('documents')
      .update({
        is_deleted: false,
        deleted_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', documentId)
      .select()
      .single();

    if (updateError) {
      throw new Error(`Failed to restore document: ${updateError.message}`);
    }

    return data;
  }

  async share(documentId: string, userId: string, shareDto: ShareDocumentDto) {
    // Check if user owns the document
    const document = await this.checkAccess(documentId, userId);
    if (document.user_id !== userId) {
      throw new ForbiddenException('Only document owner can share');
    }

    // Find user to share with
    let sharedWithId: string | null = null;
    if (shareDto.email) {
      const user = await this.usersService.findByEmail(shareDto.email);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      sharedWithId = user.id;
    }

    const { data, error } = await this.supabase
      .getClient()
      .from('shared_documents')
      .insert({
        document_id: documentId,
        shared_by_id: userId,
        shared_with_id: sharedWithId,
        team_id: shareDto.teamId || null,
        permission: shareDto.permission,
        share_type: shareDto.shareType || 'USER',
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to share document: ${error.message}`);
    }

    return data;
  }

  async getSharedDocuments(userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('shared_documents')
      .select(`
        *,
        document:documents(*),
        shared_by:users!shared_documents_shared_by_id_fkey(id, email, full_name)
      `)
      .eq('shared_with_id', userId)
      .eq('is_active', true)
      .order('shared_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch shared documents: ${error.message}`);
    }

    return data || [];
  }

  async getTrash(userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .eq('is_deleted', true)
      .order('deleted_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch trash: ${error.message}`);
    }

    return data || [];
  }

  private async checkDocumentLimit(userId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get plan limits
    const { data: plan } = await this.supabase
      .getClient()
      .from('plans')
      .select('max_documents')
      .eq('name', user.plan_name)
      .single();

    const limit = plan?.max_documents || 0;

    // 0 means unlimited
    if (limit > 0) {
      const { count } = await this.supabase
        .getClient()
        .from('documents')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('is_deleted', false);

      if (count && count >= limit) {
        throw new BadRequestException({
          error: 'DOCUMENT_LIMIT_EXCEEDED',
          message: `${user.plan_name} plan allows maximum ${limit} documents`,
          plan: user.plan_name,
          limit,
          current: count,
        });
      }
    }
  }

  private async checkAccess(documentId: string, userId: string) {
    // Check if user owns the document
    const { data: document } = await this.supabase
      .getClient()
      .from('documents')
      .select('*')
      .eq('id', documentId)
      .eq('user_id', userId)
      .single();

    if (document) {
      return document;
    }

    // Check if document is shared with user
    const { data: shared } = await this.supabase
      .getClient()
      .from('shared_documents')
      .select('document:documents(*)')
      .eq('document_id', documentId)
      .eq('shared_with_id', userId)
      .eq('is_active', true)
      .single();

    if (shared && shared.document) {
      return shared.document;
    }

    // Check if document is public
    const { data: publicDoc } = await this.supabase
      .getClient()
      .from('documents')
      .select('*')
      .eq('id', documentId)
      .eq('is_public', true)
      .single();

    if (publicDoc) {
      return publicDoc;
    }

    throw new NotFoundException('Document not found or access denied');
  }

  private async checkEditPermission(documentId: string, userId: string) {
    // Check if user owns the document
    const { data: document } = await this.supabase
      .getClient()
      .from('documents')
      .select('*')
      .eq('id', documentId)
      .eq('user_id', userId)
      .single();

    if (document) {
      return true;
    }

    // Check if user has edit permission via sharing
    const { data: shared } = await this.supabase
      .getClient()
      .from('shared_documents')
      .select('permission')
      .eq('document_id', documentId)
      .eq('shared_with_id', userId)
      .eq('is_active', true)
      .in('permission', ['EDIT', 'MANAGE'])
      .single();

    if (shared) {
      return true;
    }

    throw new ForbiddenException('You do not have permission to edit this document');
  }

  private calculateWordCount(text: string): number {
    return text.trim().split(/\s+/).filter((word) => word.length > 0).length;
  }
}

