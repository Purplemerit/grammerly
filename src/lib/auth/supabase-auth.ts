import { createClient, createDirectClient } from '@/lib/supabase/client';
import type { User } from '@/types/auth';

export class SupabaseAuth {
  private getSupabase() {
    // Use direct client for server-side, component client for client-side
    if (typeof window === 'undefined') {
      return createDirectClient();
    }
    return createClient();
  }

  async signUp(email: string, password: string, fullName: string) {
    const supabase = this.getSupabase();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async signIn(email: string, password: string) {
    const supabase = this.getSupabase();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async signOut() {
    const supabase = this.getSupabase();
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const supabase = this.getSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    // Fetch user profile from database
    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    return {
      id: user.id,
      email: user.email || '',
      fullName: profile?.full_name || user.user_metadata?.full_name || '',
      avatarUrl: profile?.avatar_url || user.user_metadata?.avatar_url,
      plan: profile?.plan_name || 'FREE',
      emailVerified: user.email_confirmed_at !== null,
    };
  }

  async resetPassword(email: string) {
    const supabase = this.getSupabase();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  async updatePassword(newPassword: string) {
    const supabase = this.getSupabase();
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  async signInWithGoogle() {
    const supabase = this.getSupabase();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  async signInWithGithub() {
    const supabase = this.getSupabase();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      throw new Error(error.message);
    }
  }
}

export const supabaseAuth = new SupabaseAuth();

