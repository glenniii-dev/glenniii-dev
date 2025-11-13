import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { admin } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { withAuth } from '../proxy';
import { NextRequest } from 'next/server';

/**
 * Admin creation route
 * --------------------
 * Purpose:
 * - Allows creating the first/admin users. This route is intentionally
 *   exposed as public so the first admin can be created (see `proxy`'s
 *   publicRoutes list which allows `/api/admin`). After initial setup
 *   you can restrict access or remove this convenience.
 *
 * Input (POST JSON): { username, password, email, isAdmin }
 * Output: created admin record (without password) or error JSON
 * Errors: 400 for validation, 500 for server errors
 */

async function handler(req: NextRequest) {
  try {
    const { username, password, email, isAdmin = false } = await req.json();

    // Basic validation
    if (!username || !password || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.select().from(admin)
      .where(eq(admin.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin user
    const newAdmin = await db.insert(admin).values({
      username,
      password: hashedPassword,
      email,
      isAdmin,
    }).returning();

    return NextResponse.json(newAdmin[0]);
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json(
      { error: 'Failed to create admin' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return withAuth(req, handler);
}