import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/utils/auth';

/**
 * API proxy / middleware for route protection
 * -----------------------------------------
 * Purpose:
 * - Centralizes authentication checks for API routes under /api
 * - Allows public routes (login, initial admin creation) to pass through
 * - Protects admin-only routes and enforces isAdmin on those routes
 *
 * How it works:
 * - `withAuth` is a small wrapper that accepts the incoming NextRequest
 *   and a handler function. It performs cookie-token lookup and JWT
 *   verification, then either returns a 401/403 Response or delegates to
 *   the provided handler. The handler should return a Response (or NextResponse).
 *
 * Notes:
 * - This is server-side code that runs for app route handlers. We read
 *   the HTTP-only cookie named `token` and verify it using `verifyToken`.
 * - The wrapper mutates `request.user` to make the verified user object
 *   available to downstream handlers. The handler can read `request.user`.
 */

// Define route access levels
const publicRoutes = [
  '/api/auth/login',
  '/api/admin', // Allow initial admin creation
];

const adminOnlyRoutes = [
  '/api/dashboard',
  '/api/projects',
  '/api/blogs',
];

const isPublicRoute = (path: string) => {
  return publicRoutes.some(route => path === route);
};

const requiresAdmin = (path: string) => {
  return adminOnlyRoutes.some(route => path.startsWith(route));
};

/**
 * Higher-order function that protects routes and injects `user` into the request.
 * Usage: export const GET = withAuth(async (req) => { ... })
 */

export function withAuth(
  handler: (request: NextRequest) => Promise<Response> | Response
) {
  return async (request: NextRequest) => {
    const path = request.nextUrl.pathname;

    // Allow public routes
    if (isPublicRoute(path)) {
      return handler(request);
    }

    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Enforce admin access if route requires it
    if (requiresAdmin(path) && !user.isAdmin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Attach user info to request
    const authRequest = Object.assign(request, { user });

    // Proceed with the protected handler
    return handler(authRequest);
  };
}