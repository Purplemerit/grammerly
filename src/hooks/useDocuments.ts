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

export function useDocuments(
  page: number = 1,
  limit: number = 20,
  sort: string = '-created_at',
  search?: string,
  filter?: string,
) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort,
    ...(search && { search }),
    ...(filter && { filter }),
  });

  const { data, error, mutate, isLoading } = useSWR(
    token ? [`${API_BASE}/documents?${params}`, token] : null,
    ([url, t]) => fetcher(url, t),
  );

  return {
    documents: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error,
    mutate,
  };
}

export function useDocument(id: string | null) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const { data, error, mutate, isLoading } = useSWR(
    id && token ? [`${API_BASE}/documents/${id}`, token] : null,
    ([url, t]) => fetcher(url, t),
  );

  return {
    document: data,
    isLoading,
    error,
    mutate,
  };
}

export function useCreateDocument() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (documentData: {
    title: string;
    content: string;
    type?: string;
    language?: string;
    isPublic?: boolean;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(documentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create document');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create document';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
}

export function useUpdateDocument(id: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (updates: {
    title?: string;
    content?: string;
    type?: string;
    isArchived?: boolean;
    isPublic?: boolean;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/documents/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update document');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update document';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [id]);

  return { update, loading, error };
}

export function useDeleteDocument() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (documentId: string) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/documents/${documentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete document');
      }

      return await response.json();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete document';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
}

