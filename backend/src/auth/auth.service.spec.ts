import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
    updateLastLogin: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'JWT_SECRET') return 'test-secret';
      if (key === 'JWT_EXPIRES_IN') return '1h';
      if (key === 'JWT_REFRESH_SECRET') return 'test-refresh-secret';
      if (key === 'JWT_REFRESH_EXPIRES_IN') return '30d';
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return access token and user on successful login', async () => {
      const hashedPassword = await bcrypt.hash('password123', 12);
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        password_hash: hashedPassword,
        plan_name: 'FREE',
        full_name: 'Test User',
        email_verified: true,
      };

      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      mockJwtService.sign.mockReturnValue('mock-token');
      mockUsersService.updateLastLogin.mockResolvedValue(undefined);

      const result = await service.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result).toHaveProperty('user');
      expect(result.user.email).toBe('test@example.com');
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      await expect(
        service.login({
          email: 'test@example.com',
          password: 'wrongpassword',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('signup', () => {
    it('should create new user successfully', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue({
        id: 'user-123',
        email: 'new@example.com',
        full_name: 'New User',
        created_at: new Date().toISOString(),
      });
      mockJwtService.sign.mockReturnValue('verification-token');

      const result = await service.signup({
        email: 'new@example.com',
        password: 'SecurePass123!',
        full_name: 'New User',
        acceptTerms: true,
        acceptPrivacy: true,
      });

      expect(result).toHaveProperty('id');
      expect(result.email).toBe('new@example.com');
      expect(mockUsersService.create).toHaveBeenCalled();
    });

    it('should throw ConflictException if email exists', async () => {
      mockUsersService.findByEmail.mockResolvedValue({
        id: 'user-123',
        email: 'existing@example.com',
      });

      await expect(
        service.signup({
          email: 'existing@example.com',
          password: 'SecurePass123!',
          full_name: 'Existing User',
          acceptTerms: true,
          acceptPrivacy: true,
        }),
      ).rejects.toThrow(ConflictException);
    });
  });
});

