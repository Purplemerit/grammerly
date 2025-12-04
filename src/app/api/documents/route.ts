import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/client';

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const sort = searchParams.get('sort') || '-created_at';
    const search = searchParams.get('search') || '';
    const filter = searchParams.get('filter') || '';

    // Forward to backend API
    const backendUrl = process.env.API_BASE_URL || 'http://localhost:3001';
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sort,
      ...(search && { search }),
      ...(filter && { filter }),
    });

    // Get token from request
    const authHeader = request.headers.get('authorization');
    const response = await fetch(`${backendUrl}/api/v1/documents?${params}`, {
      headers: {
        Authorization: authHeader || '',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const backendUrl = process.env.API_BASE_URL || 'http://localhost:3001';
    const authHeader = request.headers.get('authorization');

    const response = await fetch(`${backendUrl}/api/v1/documents`, {
      method: 'POST',
      headers: {
        Authorization: authHeader || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 },
    );
  }
}

