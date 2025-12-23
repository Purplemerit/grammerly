import { createClient } from '@/lib/supabase/client';
import type { RealtimeChannel } from '@supabase/supabase-js';

/**
 * Subscribe to document changes in real-time
 */
export function subscribeToDocument(
  documentId: string,
  callback: (payload: unknown) => void,
): RealtimeChannel {
  const supabase = createClient();
  
  const channel = supabase
    .channel(`document:${documentId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'documents',
        filter: `id=eq.${documentId}`,
      },
      callback,
    )
    .subscribe();

  return channel;
}

/**
 * Unsubscribe from document changes
 */
export function unsubscribeFromDocument(channel: RealtimeChannel) {
  const supabase = createClient();
  supabase.removeChannel(channel);
}

/**
 * Subscribe to user's document list changes
 */
export function subscribeToDocumentsList(
  userId: string,
  callback: (payload: unknown) => void,
): RealtimeChannel {
  const supabase = createClient();
  
  const channel = supabase
    .channel(`documents:${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'documents',
        filter: `user_id=eq.${userId}`,
      },
      callback,
    )
    .subscribe();

  return channel;
}

