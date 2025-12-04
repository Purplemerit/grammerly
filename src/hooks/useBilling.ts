'use client';

import { useState, useCallback } from 'react';
import useSWR from 'swr';

const API_BASE = process.env.NEXT_PUBLIC_APP_URL
  ? `${process.env.NEXT_PUBLIC_APP_URL}/api/v1`
  : 'http://localhost:3001/api/v1';

async function fetcher(url: string, token?: string) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  return response.json();
}

export function useBillingPlans() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const { data, error, isLoading } = useSWR(
    token ? [`${API_BASE}/billing/plans`, token] : null,
    ([url, t]) => fetcher(url, t),
  );

  return {
    plans: data || [],
    isLoading,
    error,
  };
}

export function useSubscription() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const { data, error, mutate, isLoading } = useSWR(
    token ? [`${API_BASE}/billing/subscription`, token] : null,
    ([url, t]) => fetcher(url, t),
  );

  return {
    subscription: data,
    isLoading,
    error,
    mutate,
  };
}

export function useUsage() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const { data, error, mutate, isLoading } = useSWR(
    token ? [`${API_BASE}/billing/usage`, token] : null,
    ([url, t]) => fetcher(url, t),
  );

  return {
    usage: data?.usage,
    limits: data?.limits,
    plan: data?.plan,
    isLoading,
    error,
    mutate,
  };
}

export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkout = useCallback(async (planId: string) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/billing/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ planId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create checkout');
      }

      const data = await response.json();
      
      // Redirect to PhonePe checkout URL
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }

      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create checkout';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { checkout, loading, error };
}

export function useCancelSubscription() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cancel = useCallback(async (reason?: string) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/billing/subscription/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to cancel subscription');
      }

      return await response.json();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to cancel subscription';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { cancel, loading, error };
}

