import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private supabase: SupabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const { data, error } = await this.supabase
      .getClient()
      .from('users')
      .insert({
        email: createUserDto.email,
        full_name: createUserDto.full_name,
        avatar_url: createUserDto.avatar_url,
        password_hash: createUserDto.password_hash,
        auth_provider: createUserDto.auth_provider || 'email',
        email_verified: createUserDto.email_verified || false,
        plan_name: createUserDto.plan_name || 'FREE',
        subscription_status: createUserDto.subscription_status || 'active',
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }

    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return null;
    }

    return data;
  }

  async findByEmail(email: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      return null;
    }

    return data;
  }

  async updateLastLogin(userId: string) {
    const { error } = await this.supabase
      .getClient()
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', userId);

    if (error) {
      console.error('Failed to update last login:', error);
    }
  }

  async updateProfile(userId: string, updateDto: UpdateProfileDto) {
    // Check if email is being changed and if it's already taken
    if (updateDto.email) {
      const existingUser = await this.findByEmail(updateDto.email);
      if (existingUser && existingUser.id !== userId) {
        throw new ConflictException('Email already exists');
      }
    }

    const { data, error } = await this.supabase
      .getClient()
      .from('users')
      .update({
        ...(updateDto.full_name && { full_name: updateDto.full_name }),
        ...(updateDto.email && { email: updateDto.email }),
        ...(updateDto.avatar_url && { avatar_url: updateDto.avatar_url }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update profile: ${error.message}`);
    }

    if (!data) {
      throw new NotFoundException('User not found');
    }

    return data;
  }

  async updatePreferences(userId: string, preferencesDto: UpdatePreferencesDto) {
    const { data, error } = await this.supabase
      .getClient()
      .from('users')
      .update({
        ...(preferencesDto.language && { language: preferencesDto.language }),
        ...(preferencesDto.timezone && { timezone: preferencesDto.timezone }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update preferences: ${error.message}`);
    }

    if (!data) {
      throw new NotFoundException('User not found');
    }

    return {
      language: data.language,
      timezone: data.timezone,
    };
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.password_hash) {
      throw new Error('Password cannot be changed for OAuth users');
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isCurrentPasswordValid) {
      throw new ConflictException('Current password is incorrect');
    }

    // Hash new password
    const saltRounds = 12;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    const { error } = await this.supabase
      .getClient()
      .from('users')
      .update({
        password_hash: newPasswordHash,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) {
      throw new Error(`Failed to change password: ${error.message}`);
    }

    return { success: true, message: 'Password changed successfully' };
  }

  async deleteAccount(userId: string, password: string) {
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verify password for email-based accounts
    if (user.password_hash) {
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        throw new ConflictException('Password is incorrect');
      }
    }

    // Soft delete - set is_deleted flag
    const { error } = await this.supabase
      .getClient()
      .from('users')
      .update({
        is_deleted: true,
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) {
      throw new Error(`Failed to delete account: ${error.message}`);
    }

    return { success: true, message: 'Account deleted successfully' };
  }

  async getActivity(userId: string, limit: number = 50) {
    const { data, error } = await this.supabase
      .getClient()
      .from('audit_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Failed to fetch activity: ${error.message}`);
    }

    return data || [];
  }

  async getBillingInfo(userId: string) {
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      plan: user.plan_name,
      subscriptionStatus: user.subscription_status,
      subscriptionEndDate: user.subscription_end_date,
      phonepeCustomerId: user.phonepe_customer_id,
      phonepeSubscriptionId: user.phonepe_subscription_id,
    };
  }
}

