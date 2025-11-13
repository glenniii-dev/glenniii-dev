import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Make sure to set this in .env
const TOKEN_EXPIRY = '24h';

export interface UserToken {
  id: number;
  email: string;
  username: string;
  isAdmin: boolean;
}

export const createToken = (user: UserToken) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
};

export const verifyAuth = async (token: string): Promise<boolean> => {
  try {
    const user = jwt.verify(token, JWT_SECRET) as UserToken;
    return user.isAdmin === true;
  } catch (error) {
    return false;
  }
};

export const verifyToken = (token: string): UserToken | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as UserToken;
  } catch (error) {
    return null;
  }
};

export const getTokenFromCookies = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('token')?.value;
};

export const getUserFromToken = async (): Promise<UserToken | null> => {
  const token = await getTokenFromCookies();
  if (!token) return null;
  return verifyToken(token);
};

export const isAuthenticated = async (): Promise<boolean> => {
  return (await getUserFromToken()) !== null;
};