import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Get admin from database with direct password comparison
    const result = await query(
      'SELECT * FROM admin_table WHERE email = ? AND password = ?',
      [email, password]
    ) as any[];

    if (!result.length) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Set a simple session cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', 'true', {
      maxAge: 86400 // 1 day
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
} 