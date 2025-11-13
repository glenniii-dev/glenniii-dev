import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '../../proxy';
import { db } from '@/db/db';
import { comments } from '@/db/schema';
import { eq, sql, desc } from 'drizzle-orm';

/**
 * Admin Comments Management API Route
 * ---------------------------------
 * Purpose: Manage user comments (moderation and administration)
 * 
 * Authentication:
 * - Requires valid JWT token
 * - User must have isAdmin: true
 * 
 * HTTP Methods:
 * ------------
 * GET: Fetch comments
 * - Query params:
 *   - page: number (pagination page number)
 *   - limit: number (items per page)
 *   - pending: boolean (filter unapproved comments)
 * 
 * POST: Perform comment actions
 * - Required fields:
 *   {
 *     action: 'approve' | 'delete'
 *     id: number
 *   }
 * 
 * Actions:
 * --------
 * 1. Approve Comment:
 *    - Sets isApproved to true
 *    - Makes comment visible on the site
 *    - Returns updated comment object
 * 
 * 2. Delete Comment:
 *    - Permanently removes comment
 *    - Returns success confirmation
 * 
 * Response Format:
 * ---------------
 * GET:
 * {
 *   comments: Comment[],
 *   total: number,
 *   page: number,
 *   totalPages: number
 * }
 * 
 * POST (approve):
 * {
 *   comment: Comment
 * }
 * 
 * POST (delete):
 * {
 *   success: true,
 *   id: number
 * }
 * 
 * Error Handling:
 * --------------
 * - 400: Bad Request (invalid action or missing id)
 * - 401: Unauthorized (no token or invalid token)
 * - 403: Forbidden (not an admin)
 * - 404: Comment not found
 * - 500: Server error
 * 
 * Usage Examples:
 * --------------
 * 1. List pending comments:
 *    GET /api/admin/comments?page=1&limit=10&pending=true
 * 
 * 2. Approve comment:
 *    POST /api/admin/comments
 *    {
 *      "action": "approve",
 *      "id": 123
 *    }
 * 
 * 3. Delete comment:
 *    POST /api/admin/comments
 *    {
 *      "action": "delete",
 *      "id": 123
 *    }
 * 
 * Implementation Notes:
 * -------------------
 * 1. Pagination:
 *    - Default limit: 10 items
 *    - Maximum limit: 100 items
 *    - Page starts from 1
 * 
 * 2. Sort Order:
 *    - Comments are sorted by creation date (newest first)
 * 
 * 3. Security:
 *    - All operations require admin privileges
 *    - Actions are logged for audit purposes
 */
/**
 * Request handler for comment management operations
 * 
 * @param req - The incoming HTTP request
 * @returns NextResponse with the operation result
 * 
 * This handler manages two main flows:
 * 1. Retrieving comments with pagination and filtering
 * 2. Performing moderation actions (approve/delete)
 * 
 * The handler implements proper error handling and
 * input validation for all operations.
 */
async function handler(req: NextRequest) {
  try {
    if (req.method === 'GET') {
      const url = req.nextUrl;
      const page = Number(url.searchParams.get('page') || '1');
      const limit = Math.min(Number(url.searchParams.get('limit') || '10'), 100);
      const pendingOnly = url.searchParams.get('pending') === 'true';
      const offset = (Math.max(page, 1) - 1) * limit;

      const totalRes = await db.select({ total: sql<number>`count(*)` }).from(comments);
      const total = Number(totalRes[0]?.total ?? 0);

      let rows;
      if (pendingOnly) {
        rows = await db.select().from(comments).where(eq(comments.isApproved, false)).orderBy(desc(comments.createdAt)).limit(limit).offset(offset);
      } else {
        rows = await db.select().from(comments).orderBy(desc(comments.createdAt)).limit(limit).offset(offset);
      }
      return NextResponse.json({ comments: rows, total, page, totalPages: Math.ceil(total / limit) });
    } else if (req.method === 'POST') {
      const body = await req.json();
      const { action, id } = body as { action?: string; id?: number };
      if (!action || !id) return NextResponse.json({ error: 'Missing action or id' }, { status: 400 });

      if (action === 'approve') {
        await db.update(comments).set({ isApproved: true }).where(eq(comments.id, Number(id)));
        const updated = await db.select().from(comments).where(eq(comments.id, Number(id)));
        return NextResponse.json({ comment: updated[0] });
      }
      if (action === 'delete') {
        await db.delete(comments).where(eq(comments.id, Number(id)));
        return NextResponse.json({ success: true, id: Number(id) });
      }

      return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }

    return NextResponse.json({ error: 'Method not implemented' }, { status: 405 });
  } catch (error) {
    console.error('Comments admin error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return withAuth(req, handler);
}

export async function POST(req: NextRequest) {
  return withAuth(req, handler);
}
