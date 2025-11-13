import { UserToken } from '@/utils/auth';

declare module 'next/server' {
  interface NextRequest {
    user?: UserToken;
  }
}