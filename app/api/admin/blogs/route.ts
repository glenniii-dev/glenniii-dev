import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '../../proxy';
import { db } from '@/db/db';
import { blogs } from '@/db/schema';
import { eq, sql, desc } from 'drizzle-orm';

/**
 * Admin Blogs management route
 * ---------------------------
 * Methods supported:
 * - GET: list blogs with pagination (query params page, limit)
 * - POST: create a blog (JSON body: title, content, tags, isPublished)
 * - PUT: update a blog (JSON body must include id and fields to update)
 * - DELETE: delete a blog (JSON body: { id })
 *
 * All responses are JSON. This route is wrapped by `withAuth` so only
 * authenticated admin users can call it.
 */

/**
 * Admin Blog Management API Route
 * ------------------------------
 * Purpose: Manage blog posts (CRUD operations)
 * 
 * Authentication:
 * - Requires valid JWT token
 * - User must have isAdmin: true
 * 
 * HTTP Methods:
 * ------------
 * GET: Fetch all blogs
 * - Query params:
 *   - page: number (pagination)
 *   - limit: number (items per page)
 *   - published: boolean (filter by published status)
 * 
 * POST: Create new blog
 * - Required fields:
 *   {
 *     title: string
 *     content: string
 *     tags: string
 *     isPublished: boolean
 *   }
 * 
 * PUT /:id: Update blog
 * - URL parameter: blog ID
 * - Fields same as POST (all optional)
 * 
 * DELETE /:id: Delete blog
 * - URL parameter: blog ID
 * 
 * Response Format:
 * ---------------
 * GET:
 * {
 *   blogs: Blog[],
 *   total: number,
 *   page: number,
 *   totalPages: number
 * }
 * 
 * POST/PUT:
 * {
 *   blog: Blog
 * }
 * 
 * DELETE:
 * {
 *   success: true,
 *   id: number
 * }
 * 
 * Error Handling:
 * --------------
 * - 400: Bad Request (invalid input)
 * - 401: Unauthorized (no token or invalid token)
 * - 403: Forbidden (not an admin)
 * - 404: Blog not found
 * - 500: Server error
 * 
 * Usage Examples:
 * --------------
 * 1. Create blog:
 *    POST /api/admin/blogs
 *    {
 *      "title": "New Blog",
 *      "content": "Content here",
 *      "tags": "tech,programming",
 *      "isPublished": false
 *    }
 * 
 * 2. Update blog:
 *    PUT /api/admin/blogs/123
 *    {
 *      "isPublished": true
 *    }
 * 
 * 3. List blogs:
 *    GET /api/admin/blogs?page=1&limit=10&published=true
 * 
 * 4. Delete blog:
 *    DELETE /api/admin/blogs/123
 */

async function handler(req: NextRequest) {
  try {
    if (req.method === 'GET') {
      const url = req.nextUrl;
  const page = Number(url.searchParams.get('page') || '1');
  const limit = Math.min(Number(url.searchParams.get('limit') || '10'), 100);

      const offset = (Math.max(page, 1) - 1) * limit;

      // Count total
      const totalRes = await db.select({ total: sql<number>`count(*)` }).from(blogs);
      const total = Number(totalRes[0]?.total ?? 0);

      const rows = await db.select().from(blogs).orderBy(desc(blogs.createdAt)).limit(limit).offset(offset);

      return NextResponse.json({ blogs: rows, total, page, totalPages: Math.ceil(total / limit) });
    } else if (req.method === 'POST') {
      const body = await req.json();
      const { title, content, tags = '', isPublished = false } = body;
      if (!title || !content) {
        return NextResponse.json({ error: 'Missing title or content' }, { status: 400 });
      }
      const inserted = await db.insert(blogs).values({ title, content, tags, isPublished }).returning();
      return NextResponse.json({ blog: inserted[0] });
    } else if (req.method === 'PUT') {
      const body = await req.json();
      const { id, title, content, tags, isPublished } = body;
      if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
      await db.update(blogs).set({
        ...(title !== undefined ? { title } : {}),
        ...(content !== undefined ? { content } : {}),
        ...(tags !== undefined ? { tags } : {}),
        ...(isPublished !== undefined ? { isPublished } : {}),
      }).where(eq(blogs.id, Number(id)));
      const updated = await db.select().from(blogs).where(eq(blogs.id, Number(id)));
      return NextResponse.json({ blog: updated[0] });
    } else if (req.method === 'DELETE') {
      const body = await req.json();
      const { id } = body;
      if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
      await db.delete(blogs).where(eq(blogs.id, Number(id)));
      return NextResponse.json({ success: true, id: Number(id) });
    }

    // If no branch above returned a response, return a 405
    return NextResponse.json({ error: 'Method not implemented' }, { status: 405 });
  } catch (error) {
    console.error('Blog management error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return withAuth(req, handler);
}

export async function POST(req: NextRequest) {
  return withAuth(req, handler);
}

export async function PUT(req: NextRequest) {
  return withAuth(req, handler);
}

export async function DELETE(req: NextRequest) {
  return withAuth(req, handler);
}