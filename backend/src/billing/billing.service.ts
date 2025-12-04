import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { UsersService } from '../users/users.service';
import { PhonePeService } from './phonepe/phonepe.service';

@Injectable()
export class BillingService {
  constructor(
    private supabase: SupabaseService,
    private usersService: UsersService,
    private phonepeService: PhonePeService,
  ) {}

  async getPlans() {
    const { data, error } = await this.supabase
      .getClient()
      .from('plans')
      .select('*')
      .eq('is_active', true)
      .order('price_monthly', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch plans: ${error.message}`);
    }

    return data || [];
  }

  async getSubscription(userId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { data: plan } = await this.supabase
      .getClient()
      .from('plans')
      .select('*')
      .eq('name', user.plan_name)
      .single();

    return {
      plan: plan || null,
      planName: user.plan_name,
      subscriptionStatus: user.subscription_status,
      subscriptionEndDate: user.subscription_end_date,
      phonepeCustomerId: user.phonepe_customer_id,
      phonepeSubscriptionId: user.phonepe_subscription_id,
    };
  }

  async createCheckout(userId: string, planId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { data: plan } = await this.supabase
      .getClient()
      .from('plans')
      .select('*')
      .eq('id', planId)
      .single();

    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    if (!plan.is_active) {
      throw new BadRequestException('Plan is not available');
    }

    // Create PhonePe payment session (placeholder - to be implemented)
    const checkoutUrl = await this.phonepeService.createPaymentSession({
      userId,
      planId,
      amount: plan.price_monthly,
      planName: plan.name,
    });

    return {
      checkoutUrl,
      planId: plan.id,
      planName: plan.name,
      amount: plan.price_monthly,
    };
  }

  async updateSubscription(userId: string, planId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { data: plan } = await this.supabase
      .getClient()
      .from('plans')
      .select('*')
      .eq('id', planId)
      .single();

    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    // Update user's plan
    const { data, error } = await this.supabase
      .getClient()
      .from('users')
      .update({
        plan_id: planId,
        plan_name: plan.name,
        subscription_status: 'active',
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update subscription: ${error.message}`);
    }

    return {
      success: true,
      plan: plan.name,
      message: 'Subscription updated successfully',
    };
  }

  async cancelSubscription(userId: string, reason?: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Cancel PhonePe subscription (placeholder)
    if (user.phonepe_subscription_id) {
      await this.phonepeService.cancelSubscription(user.phonepe_subscription_id);
    }

    // Update user subscription status
    const { error } = await this.supabase
      .getClient()
      .from('users')
      .update({
        subscription_status: 'cancelled',
        subscription_end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) {
      throw new Error(`Failed to cancel subscription: ${error.message}`);
    }

    return {
      success: true,
      message: 'Subscription cancelled. Access will continue until end of billing period.',
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };
  }

  async getUsage(userId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get current month usage
    const currentMonth = new Date().toISOString().slice(0, 7) + '-01';
    const { data: usage } = await this.supabase
      .getClient()
      .from('usage_stats')
      .select('*')
      .eq('user_id', userId)
      .eq('year_month', currentMonth)
      .single();

    // Get plan limits
    const { data: plan } = await this.supabase
      .getClient()
      .from('plans')
      .select('*')
      .eq('name', user.plan_name)
      .single();

    return {
      usage: usage || {
        grammar_checks: 0,
        paraphrase_requests: 0,
        tone_analyses: 0,
        storage_used_mb: 0,
        documents_count: 0,
      },
      limits: {
        max_grammar_checks_monthly: plan?.max_grammar_checks_monthly || 0,
        max_paraphrase_requests_monthly: plan?.max_paraphrase_requests_monthly || 0,
        max_documents: plan?.max_documents || 0,
        max_storage_gb: plan?.max_storage_gb || 0,
      },
      plan: user.plan_name,
    };
  }

  async handleWebhook(payload: any, signature: string) {
    // Verify PhonePe webhook signature (placeholder)
    const isValid = await this.phonepeService.verifyWebhookSignature(payload, signature);
    
    if (!isValid) {
      throw new BadRequestException('Invalid webhook signature');
    }

    // Handle different webhook events
    const eventType = payload.event || payload.type;

    switch (eventType) {
      case 'payment.success':
        await this.handlePaymentSuccess(payload);
        break;
      case 'payment.failed':
        await this.handlePaymentFailed(payload);
        break;
      case 'subscription.updated':
        await this.handleSubscriptionUpdated(payload);
        break;
      case 'subscription.cancelled':
        await this.handleSubscriptionCancelled(payload);
        break;
      default:
        console.log('Unhandled webhook event:', eventType);
    }

    return { success: true };
  }

  private async handlePaymentSuccess(payload: any) {
    const { userId, planId, subscriptionId } = payload.data;

    // Update user subscription
    const { data: plan } = await this.supabase
      .getClient()
      .from('plans')
      .select('*')
      .eq('id', planId)
      .single();

    if (plan) {
      await this.supabase
        .getClient()
        .from('users')
        .update({
          plan_id: planId,
          plan_name: plan.name,
          subscription_status: 'active',
          phonepe_subscription_id: subscriptionId,
          subscription_end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);
    }
  }

  private async handlePaymentFailed(payload: any) {
    const { userId } = payload.data;

    // Update subscription status
    await this.supabase
      .getClient()
      .from('users')
      .update({
        subscription_status: 'expired',
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);
  }

  private async handleSubscriptionUpdated(payload: any) {
    // Handle subscription updates
    console.log('Subscription updated:', payload);
  }

  private async handleSubscriptionCancelled(payload: any) {
    const { userId } = payload.data;

    await this.supabase
      .getClient()
      .from('users')
      .update({
        subscription_status: 'cancelled',
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);
  }
}

