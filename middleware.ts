import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Check if it's a dashboard route
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Skip login page
    if (request.nextUrl.pathname === '/dashboard/login') {
      return NextResponse.next();
    }

    const adminSession = await request.cookies.get('admin_session');

    if (!adminSession?.value) {
      return NextResponse.redirect(new URL('/dashboard/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*'
}; 