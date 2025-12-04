import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { SupabaseService } from '../supabase/supabase.service';
import { NotFoundException, ConflictException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let supabaseService: SupabaseService;

  const mockSupabaseClient = {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn(),
    })),
  };

  const mockSupabaseService = {
    getClient: jest.fn(() => mockSupabaseClient),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: SupabaseService,
          useValue: mockSupabaseService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    supabaseService = module.get<SupabaseService>(SupabaseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('should return user if found', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        full_name: 'Test User',
      };

      mockSupabaseClient.from().select().eq().single.mockResolvedValue({
        data: mockUser,
        error: null,
      });

      const result = await service.findOne('user-123');
      expect(result).toEqual(mockUser);
    });

    it('should return null if user not found', async () => {
      mockSupabaseClient.from().select().eq().single.mockResolvedValue({
        data: null,
        error: { message: 'Not found' },
      });

      const result = await service.findOne('non-existent');
      expect(result).toBeNull();
    });
  });

  describe('updateProfile', () => {
    it('should update user profile successfully', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'old@example.com',
        full_name: 'Old Name',
      };

      mockSupabaseClient.from().select().eq().single.mockResolvedValue({
        data: mockUser,
        error: null,
      });

      mockSupabaseClient.from().update().eq().select().single.mockResolvedValue({
        data: {
          ...mockUser,
          full_name: 'New Name',
          updated_at: new Date().toISOString(),
        },
        error: null,
      });

      const result = await service.updateProfile('user-123', {
        full_name: 'New Name',
      });

      expect(result.full_name).toBe('New Name');
    });

    it('should throw ConflictException if email already exists', async () => {
      mockSupabaseClient.from().select().eq().single
        .mockResolvedValueOnce({
          data: { id: 'user-123', email: 'old@example.com' },
          error: null,
        })
        .mockResolvedValueOnce({
          data: { id: 'other-user', email: 'new@example.com' },
          error: null,
        });

      await expect(
        service.updateProfile('user-123', {
          email: 'new@example.com',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });
});

