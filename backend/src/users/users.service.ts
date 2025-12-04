import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateUserDto } from './dto/create-user.dto';

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
}

