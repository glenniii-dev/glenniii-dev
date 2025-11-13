import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '../../proxy';
import { db } from '@/db/db';
import { blogs, projects, comments } from '@/db/schema';
import { desc, sql } from 'drizzle-orm';

/**
 * Admin Dashboard API
 * -------------------
 * Purpose:
 * - Provide aggregated data needed by the admin dashboard UI.
 * - Returns basic stats, recent blogs/projects, and pending comments.
 *
 * Authentication:
 * - Protected by `withAuth` wrapper. Caller must include the auth cookie.
 *
 * Response format:
 * {
 *   stats: { totalBlogs, totalProjects, pendingComments },
 *   recentBlogs: Blog[],
 *   recentProjects: Project[],
 *   pendingComments: Comment[]
 * }
 */

/**
 * Admin Dashboard API Route
 * ------------------------
 * Purpose: Provides overview data for the admin dashboard including:
 * - Recent blog posts
 * - Recent projects
 * - Pending comments
 * - Basic statistics
 * 
 * Authentication:
 * - Requires valid JWT token
 * - User must have isAdmin: true
 * 
 * HTTP Methods:
 * - GET: Fetch dashboard data
 * 
 * Response Format:
 * {
 *   stats: {
 *     totalBlogs: number,
 *     totalProjects: number,
 *     pendingComments: number
 *   },
 *   recentBlogs: Blog[],
 *   recentProjects: Project[],
 *   pendingComments: Comment[]
 * }
 * 
 * Error Handling:
 * - 401: Unauthorized (no token or invalid token)
 * - 403: Forbidden (not an admin)
 * - 500: Server error
 */

async function handler(req: NextRequest) {
  try {
    // Get dashboard statistics
    const stats = await db.select({
      totalBlogs: sql<number>`count(distinct ${blogs.id})`,
      totalProjects: sql<number>`count(distinct ${projects.id})`,
      pendingComments: sql<number>`count(distinct ${comments.id}) filter (where ${comments.isApproved} = false)`
    }).from(blogs)
      .leftJoin(projects, sql`1=1`)
      .leftJoin(comments, sql`1=1`);

    // Get recent blogs
    const recentBlogs = await db.select()
      .from(blogs)
      .orderBy(desc(blogs.createdAt))
      .limit(5);

    // Get recent projects
    const recentProjects = await db.select()
      .from(projects)
      .orderBy(desc(projects.id))
      .limit(5);

    // Get pending comments
    const pendingComments = await db.select()
      .from(comments)
      .where(sql`${comments.isApproved} = false`)
      .orderBy(desc(comments.createdAt))
      .limit(10);

    // Return the aggregated dashboard payload
    return NextResponse.json({
      stats: stats[0],
      recentBlogs,
      recentProjects,
      pendingComments
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return withAuth(req, handler);
}