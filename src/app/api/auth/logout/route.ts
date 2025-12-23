import { NextRequest, NextResponse } from 'next/server';
import { supabaseAuth } from '@/lib/auth/supabase-auth';

export async function POST(_request: NextRequest) {
  try {
    await supabaseAuth.signOut();
    return NextResponse.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Logout failed',
      },
      { status: 500 },
    );
  }
}

