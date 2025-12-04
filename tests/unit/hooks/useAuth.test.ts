import { renderHook, waitFor } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';

// Mock Supabase
jest.mock('@/lib/auth/supabase-auth', () => ({
  supabaseAuth: {
    getCurrentUser: jest.fn().mockResolvedValue({
      id: 'user-123',
      email: 'test@example.com',
      fullName: 'Test User',
      plan: 'FREE',
      emailVerified: true,
    }),
    signIn: jest.fn().mockResolvedValue({}),
    signUp: jest.fn().mockResolvedValue({}),
    signOut: jest.fn().mockResolvedValue({}),
  },
}));

describe('useAuth Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads user on mount', async () => {
    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toBeTruthy();
    expect(result.current.user?.email).toBe('test@example.com');
  });

  it('handles sign in', async () => {
    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await result.current.signIn({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(result.current.user).toBeTruthy();
  });

  it('handles sign out', async () => {
    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await result.current.signOut();

    expect(result.current.user).toBeNull();
  });
});

