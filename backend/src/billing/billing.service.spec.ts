import { Test, TestingModule } from '@nestjs/testing';
import { BillingService } from './billing.service';
import { UsersService } from '../users/users.service';
import { SupabaseService } from '../supabase/supabase.service';
import { PhonePeService } from './phonepe/phonepe.service';
import { NotFoundException } from '@nestjs/common';

describe('BillingService', () => {
  let service: BillingService;
  let usersService: UsersService;
  let phonepeService: PhonePeService;

  const mockSupabaseClient = {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      single: jest.fn(),
    })),
  };

  const mockSupabaseService = {
    getClient: jest.fn(() => mockSupabaseClient),
  };

  const mockUsersService = {
    findOne: jest.fn(),
  };

  const mockPhonePeService = {
    createPaymentSession: jest.fn(),
    cancelSubscription: jest.fn(),
    verifyWebhookSignature: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BillingService,
        {
          provide: SupabaseService,
          useValue: mockSupabaseService,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: PhonePeService,
          useValue: mockPhonePeService,
        },
      ],
    }).compile();

    service = module.get<BillingService>(BillingService);
    usersService = module.get<UsersService>(UsersService);
    phonepeService = module.get<PhonePeService>(PhonePeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPlans', () => {
    it('should return all active plans', async () => {
      const mockPlans = [
        { id: 'plan-1', name: 'FREE', price_monthly: 0 },
        { id: 'plan-2', name: 'PRO', price_monthly: 999 },
      ];

      mockSupabaseClient.from().select().eq().order.mockResolvedValue({
        data: mockPlans,
        error: null,
      });

      const result = await service.getPlans();
      expect(result).toEqual(mockPlans);
    });
  });

  describe('getSubscription', () => {
    it('should return user subscription details', async () => {
      mockUsersService.findOne.mockResolvedValue({
        id: 'user-123',
        plan_name: 'PRO',
        subscription_status: 'active',
        subscription_end_date: new Date().toISOString(),
      });

      mockSupabaseClient.from().select().eq().single.mockResolvedValue({
        data: {
          id: 'plan-2',
          name: 'PRO',
          price_monthly: 999,
        },
        error: null,
      });

      const result = await service.getSubscription('user-123');
      expect(result.planName).toBe('PRO');
      expect(result.subscriptionStatus).toBe('active');
    });

    it('should throw NotFoundException if user not found', async () => {
      mockUsersService.findOne.mockResolvedValue(null);

      await expect(service.getSubscription('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createCheckout', () => {
    it('should create checkout session', async () => {
      mockUsersService.findOne.mockResolvedValue({
        id: 'user-123',
        plan_name: 'FREE',
      });

      mockSupabaseClient.from().select().eq().single.mockResolvedValue({
        data: {
          id: 'plan-2',
          name: 'PRO',
          price_monthly: 999,
          is_active: true,
        },
        error: null,
      });

      mockPhonePeService.createPaymentSession.mockResolvedValue(
        'https://checkout.phonepe.com/session-123',
      );

      const result = await service.createCheckout('user-123', 'plan-2');
      expect(result).toHaveProperty('checkoutUrl');
      expect(mockPhonePeService.createPaymentSession).toHaveBeenCalled();
    });
  });
});

