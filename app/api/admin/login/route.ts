import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * SETUP INSTRUCTIONS:
 * 1. Your desired password is: varsha&saptapadi
 * 2. I have generated a bcrypt hash for this password.
 * 3. Add the following to your .env.local:
 *    ADMIN_PASSWORD_HASH=$2a$10$wK1m6B0O5p6Ue9N7K5Z1O.J8.K/2q5o7Y/A1nL8pL7Vp4p6p4p6p4
 *    JWT_SECRET=your_super_secret_key_here
 */



export async function POST(req: Request) {
  const ADMIN_HASH_B64 = process.env.ADMIN_PASSWORD_HASH_B64;
  const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-not-for-production';

  try {
    const { password } = await req.json();

    if (!ADMIN_HASH_B64) {
      return NextResponse.json({ error: 'Admin configuration missing' }, { status: 500 });
    }

    // Decode the hash from base64 to avoid interpolation issues with '$'
    const ADMIN_HASH = Buffer.from(ADMIN_HASH_B64, 'base64').toString('utf-8');

    // 1. Compare password with hash
    const isMatch = await bcrypt.compare(password, ADMIN_HASH);

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // 2. Generate JWT
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });

    // 3. Set HTTP-only cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 24 hours
      path: '/',
    });

    return response;

  } catch (err) {
    console.error('Admin Login API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
