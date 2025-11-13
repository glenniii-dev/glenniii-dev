/**
 * Authentication API Route: Login Endpoint
 * 
 * This module handles user authentication by validating credentials and issuing JWT tokens.
 * It uses bcrypt for password hashing and implements secure cookie-based authentication.
 */

import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { admin } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { createToken } from '@/utils/auth';
import { withAuth } from '../../proxy';
import { NextRequest } from 'next/server';

/**
 * Request handler for the login endpoint
 * 
 * @param req - The incoming HTTP request containing email and password
 * @returns NextResponse with authentication result and token cookie
 * 
 * Process:
 * 1. Validates required fields (email, password)
 * 2. Checks user existence in database
 * 3. Verifies password using bcrypt
 * 4. Issues JWT token on successful authentication
 * 5. Sets secure HTTP-only cookie with token
 */
async function handler(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await db.select().from(admin)
      .where(eq(admin.email, email))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Compare password
    const isValidPassword = await bcrypt.compare(password, user[0].password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create user data and token
    const userData = {
      id: user[0].id,
      username: user[0].username,
      email: user[0].email,
      isAdmin: !!user[0].isAdmin,
    };

    const token = createToken(userData);

    // Create the response
    const response = NextResponse.json({
      message: 'Login successful',
      user: userData
    });

    // Set the token in an HTTP-only cookie
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return withAuth(req, handler);
}