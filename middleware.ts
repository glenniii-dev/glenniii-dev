import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/utils/auth';

const protectedPaths = [
  '/api/admin',
  '/api/blogs',
  // Add other protected paths here
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if the path is protected
  if (protectedPaths.some(prefix => path.startsWith(prefix))) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
  ],
};