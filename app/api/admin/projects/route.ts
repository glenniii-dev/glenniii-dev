import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '../../proxy';
import { db } from '@/db/db';
import { projects } from '@/db/schema';
import { eq, sql, desc } from 'drizzle-orm';

/* ----------------------- GET ----------------------- */
/**
 * Fetch paginated list of projects
 */
export const GET = withAuth(async (req: NextRequest) => {
  try {
    const url = req.nextUrl;
    const page = Math.max(Number(url.searchParams.get('page') || '1'), 1);
    const limit = Math.min(Number(url.searchParams.get('limit') || '10'), 100);
    const offset = (page - 1) * limit;

    const [{ total }] = await db
      .select({ total: sql<number>`count(*)` })
      .from(projects);

    const rows = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.id))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({
      projects: rows,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('GET /projects error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
});

/* ----------------------- POST ----------------------- */
/**
 * Create a new project
 */
export const POST = withAuth(async (req: NextRequest) => {
  try {
    const { title, description, link } = await req.json();

    if (!title || !description || !link) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const [inserted] = await db
      .insert(projects)
      .values({ title, description, link })
      .returning();

    return NextResponse.json({ project: inserted });
  } catch (error) {
    console.error('POST /projects error:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
});

/* ----------------------- PUT ----------------------- */
/**
 * Update an existing project
 */
export const PUT = withAuth(async (req: NextRequest) => {
  try {
    const { id, title, description, link } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    await db
      .update(projects)
      .set({
        ...(title !== undefined ? { title } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(link !== undefined ? { link } : {}),
      })
      .where(eq(projects.id, Number(id)));

    const [updated] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, Number(id)));

    return NextResponse.json({ project: updated });
  } catch (error) {
    console.error('PUT /projects error:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
});

/* ----------------------- DELETE ----------------------- */
/**
 * Delete a project
 */
export const DELETE = withAuth(async (req: NextRequest) => {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    await db.delete(projects).where(eq(projects.id, Number(id)));
    return NextResponse.json({ success: true, id: Number(id) });
  } catch (error) {
    console.error('DELETE /projects error:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
});
