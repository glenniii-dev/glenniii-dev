import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { admin } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { username, password, email, phone } = await req.json();

    // Basic validation
    if (!username || !password || !email || !phone) {
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
      phone,
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