import { Injectable, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { UsersService } from '../users/users.service';
import { CheckGrammarDto } from './dto/check-grammar.dto';
import { GrammarChecker } from './grammar-checker';

@Injectable()
export class GrammarService {
  constructor(
    private supabase: SupabaseService,
    private usersService: UsersService,
  ) {}

  async checkGrammar(userId: string, checkDto: CheckGrammarDto) {
    const startTime = Date.now();

    // Check user's monthly quota
    await this.checkQuota(userId);

    // Perform grammar check
    const grammarChecker = new GrammarChecker();
    const result = await grammarChecker.check(checkDto.text, {
      language: checkDto.language || 'en-US',
      checkTypes: checkDto.checkTypes || ['grammar', 'spelling', 'punctuation', 'style'],
    });

    const processingTime = Date.now() - startTime;

    // Save grammar check to database
    const checkId = await this.saveGrammarCheck(userId, checkDto, result, processingTime);

    // Update usage stats
    await this.updateUsageStats(userId);

    return {
      checkId,
      errors: result.errors,
      summary: result.summary,
      processingTime,
      checkedAt: new Date().toISOString(),
    };
  }

  async getCheckHistory(userId: string, documentId?: string, limit: number = 50) {
    let query = this.supabase
      .getClient()
      .from('grammar_checks')
      .select('*')
      .eq('user_id', userId)
      .order('checked_at', { ascending: false })
      .limit(limit);

    if (documentId) {
      query = query.eq('document_id', documentId);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch grammar check history: ${error.message}`);
    }

    return data || [];
  }

  async getCheckDetails(checkId: string, userId: string) {
    const { data: check, error: checkError } = await this.supabase
      .getClient()
      .from('grammar_checks')
      .select('*')
      .eq('id', checkId)
      .eq('user_id', userId)
      .single();

    if (checkError || !check) {
      throw new BadRequestException('Grammar check not found');
    }

    // Get grammar errors for this check
    const { data: errors } = await this.supabase
      .getClient()
      .from('grammar_errors')
      .select('*')
      .eq('check_id', checkId)
      .order('start_position', { ascending: true });

    return {
      ...check,
      errors: errors || [],
    };
  }

  private async checkQuota(userId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Get current month usage
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    const { data: usage } = await this.supabase
      .getClient()
      .from('usage_stats')
      .select('grammar_checks')
      .eq('user_id', userId)
      .eq('year_month', `${currentMonth}-01`)
      .single();

    const used = usage?.grammar_checks || 0;

    // Get plan limits
    const { data: plan } = await this.supabase
      .getClient()
      .from('plans')
      .select('max_grammar_checks_monthly')
      .eq('name', user.plan_name)
      .single();

    const limit = plan?.max_grammar_checks_monthly || 0;

    // 0 means unlimited
    if (limit > 0 && used >= limit) {
      throw new BadRequestException({
        error: 'QUOTA_EXCEEDED',
        message: 'You have exceeded your monthly grammar check quota',
        plan: user.plan_name,
        monthlyLimit: limit,
        used,
        resetAt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString(),
      });
    }
  }

  private async saveGrammarCheck(
    userId: string,
    checkDto: CheckGrammarDto,
    result: any,
    processingTime: number,
  ): Promise<string> {
    const { data, error } = await this.supabase
      .getClient()
      .from('grammar_checks')
      .insert({
        user_id: userId,
        document_id: checkDto.documentId || null,
        original_text: checkDto.text,
        error_count: result.summary.totalErrors,
        grammar_errors: result.summary.grammarErrors,
        spelling_errors: result.summary.spellingErrors,
        punctuation_errors: result.summary.punctuationErrors,
        style_errors: result.summary.styleErrors,
        grammar_score: result.summary.grammarScore,
        processing_time_ms: processingTime,
        checked_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (error) {
      throw new Error(`Failed to save grammar check: ${error.message}`);
    }

    // Save individual errors
    if (result.errors && result.errors.length > 0) {
      await this.saveGrammarErrors(data.id, result.errors);
    }

    return data.id;
  }

  private async saveGrammarErrors(checkId: string, errors: any[]) {
    const errorsToInsert = errors.map((error) => ({
      check_id: checkId,
      error_type: error.type,
      severity: error.severity,
      category: error.category,
      start_position: error.position.start,
      end_position: error.position.end,
      original_text: error.original,
      suggested_corrections: error.suggestions,
      explanation: error.explanation,
      confidence_score: error.confidence,
      created_at: new Date().toISOString(),
    }));

    const { error } = await this.supabase
      .getClient()
      .from('grammar_errors')
      .insert(errorsToInsert);

    if (error) {
      console.error('Failed to save grammar errors:', error);
    }
  }

  private async updateUsageStats(userId: string) {
    const currentMonth = new Date().toISOString().slice(0, 7) + '-01';
    
    const { error } = await this.supabase
      .getClient()
      .from('usage_stats')
      .upsert(
        {
          user_id: userId,
          year_month: currentMonth,
          grammar_checks: 1,
        },
        {
          onConflict: 'user_id,year_month',
          ignoreDuplicates: false,
        },
      )
      .select();

    // If upsert doesn't work, try increment
    if (error) {
      // Try to increment existing record
      const { data: existing } = await this.supabase
        .getClient()
        .from('usage_stats')
        .select('grammar_checks')
        .eq('user_id', userId)
        .eq('year_month', currentMonth)
        .single();

      if (existing) {
        await this.supabase
          .getClient()
          .from('usage_stats')
          .update({ grammar_checks: (existing.grammar_checks || 0) + 1 })
          .eq('user_id', userId)
          .eq('year_month', currentMonth);
      } else {
        await this.supabase
          .getClient()
          .from('usage_stats')
          .insert({
            user_id: userId,
            year_month: currentMonth,
            grammar_checks: 1,
          });
      }
    }
  }
}

