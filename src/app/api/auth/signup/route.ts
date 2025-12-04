import { NextRequest, NextResponse } from 'next/server';
import { supabaseAuth } from '@/lib/auth/supabase-auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, fullName } = body;

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Email, password, and full name are required' },
        { status: 400 },
      );
    }

    const data = await supabaseAuth.signUp(email, password, fullName);

    return NextResponse.json(
      {
        success: true,
        user: data.user,
        message: 'Account created successfully. Please check your email for verification.',
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Sign up failed',
      },
      { status: 400 },
    );
  }
}

