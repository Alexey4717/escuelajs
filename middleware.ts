import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from './src/shared/config/consts';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith('/profile')) {
    return NextResponse.next();
  }

  const hasAccess = request.cookies.has(ACCESS_TOKEN_KEY);
  const hasRefresh = request.cookies.has(REFRESH_TOKEN_KEY);
  if (!hasAccess && !hasRefresh) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/profile/:path*'],
};
