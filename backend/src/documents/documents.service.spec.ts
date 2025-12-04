import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsService } from './documents.service';
import { UsersService } from '../users/users.service';
import { SupabaseService } from '../supabase/supabase.service';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

describe('DocumentsService', () => {
  let service: DocumentsService;
  let usersService: UsersService;
  let supabaseService: SupabaseService;

  const mockSupabaseClient = {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      or: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      range: jest.fn().mockReturnThis(),
      single: jest.fn(),
    })),
  };

  const mockSupabaseService = {
    getClient: jest.fn(() => mockSupabaseClient),
  };

  const mockUsersService = {
    findOne: jest.fn(),
    findByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentsService,
        {
          provide: SupabaseService,
          useValue: mockSupabaseService,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<DocumentsService>(DocumentsService);
    usersService = module.get<UsersService>(UsersService);
    supabaseService = module.get<SupabaseService>(SupabaseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a document successfully', async () => {
      mockUsersService.findOne.mockResolvedValue({
        id: 'user-123',
        plan_name: 'FREE',
      });

      mockSupabaseClient.from().select().eq().single.mockResolvedValue({
        data: { max_documents: 10 },
        error: null,
      });

      mockSupabaseClient.from().select().eq().single.mockResolvedValueOnce({
        data: { count: 5 },
        error: null,
      });

      mockSupabaseClient.from().insert().select().single.mockResolvedValue({
        data: {
          id: 'doc-123',
          title: 'Test Document',
          content: 'Test content',
          user_id: 'user-123',
          word_count: 2,
          created_at: new Date().toISOString(),
        },
        error: null,
      });

      const result = await service.create('user-123', {
        title: 'Test Document',
        content: 'Test content',
      });

      expect(result).toHaveProperty('id');
      expect(result.title).toBe('Test Document');
    });

    it('should throw error if document limit exceeded', async () => {
      mockUsersService.findOne.mockResolvedValue({
        id: 'user-123',
        plan_name: 'FREE',
      });

      mockSupabaseClient.from().select().eq().single.mockResolvedValue({
        data: { max_documents: 5 },
        error: null,
      });

      mockSupabaseClient.from().select().eq().single.mockResolvedValueOnce({
        data: { count: 5 },
        error: null,
      });

      await expect(
        service.create('user-123', {
          title: 'Test Document',
          content: 'Test content',
        }),
      ).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('should return document if user owns it', async () => {
      const mockDocument = {
        id: 'doc-123',
        user_id: 'user-123',
        title: 'Test Document',
        content: 'Test content',
      };

      mockSupabaseClient.from().select().eq().single.mockResolvedValue({
        data: mockDocument,
        error: null,
      });

      const result = await service.findOne('doc-123', 'user-123');
      expect(result).toEqual(mockDocument);
    });

    it('should throw NotFoundException if document not found', async () => {
      mockSupabaseClient.from().select().eq().single.mockResolvedValue({
        data: null,
        error: { message: 'Not found' },
      });

      mockSupabaseClient.from().select().eq().single.mockResolvedValueOnce({
        data: null,
        error: { message: 'Not found' },
      });

      await expect(service.findOne('non-existent', 'user-123')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

