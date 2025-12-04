'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabaseAuth } from '@/lib/auth/supabase-auth';
import type { User, LoginCredentials, SignupCredentials } from '@/types/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUser = useCallback(async () => {
    try {
      setLoading(true);
      const currentUser = await supabaseAuth.getCurrentUser();
      setUser(currentUser);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const signUp = useCallback(async (credentials: SignupCredentials) => {
    try {
      setLoading(true);
      setError(null);
      await supabaseAuth.signUp(
        credentials.email,
        credentials.password,
        credentials.fullName,
      );
      await loadUser();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign up failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadUser]);

  const signIn = useCallback(async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      await supabaseAuth.signIn(credentials.email, credentials.password);
      await loadUser();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign in failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadUser]);

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await supabaseAuth.signOut();
      setUser(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign out failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      await supabaseAuth.resetPassword(email);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Password reset failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      setError(null);
      await supabaseAuth.signInWithGoogle();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Google sign in failed';
      setError(message);
      throw err;
    }
  }, []);

  const signInWithGithub = useCallback(async () => {
    try {
      setError(null);
      await supabaseAuth.signInWithGithub();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'GitHub sign in failed';
      setError(message);
      throw err;
    }
  }, []);

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    resetPassword,
    signInWithGoogle,
    signInWithGithub,
    refreshUser: loadUser,
  };
}

export function useUser() {
  const { user, loading } = useAuth();
  return { user, loading };
}

export function useProtectedRoute() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/login';
    }
  }, [user, loading]);

  return { user, loading };
}

