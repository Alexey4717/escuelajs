import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from './src/shared/config/consts';
import { pagesPath } from './src/shared/config/routes/$path';
import { emitDebugSessionLog } from './src/shared/lib/debug-session-log';

// Не забывать обновлять config.matcher
const protectedPaths = [
  pagesPath.profile.$url().path,
  pagesPath.admin_panel.$url().path,
] as const;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const protectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );
  if (!protectedPath) {
    return NextResponse.next();
  }

  const hasAccess = request.cookies.has(ACCESS_TOKEN_KEY);
  const hasRefresh = request.cookies.has(REFRESH_TOKEN_KEY);
  // #region agent log
  emitDebugSessionLog({
    hypothesisId: 'H1',
    location: 'middleware.ts',
    message: 'protected route',
    data: {
      pathname,
      hasAccess,
      hasRefresh,
      decision: !hasAccess && !hasRefresh ? 'redirect-login' : 'next',
    },
  });
  // #endregion
  if (!hasAccess && !hasRefresh) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // В Next.js matcher должен быть статически парсимым литералом.
  // Тут должны быть такие же пути как в protectedPaths
  matcher: [
    '/profile',
    '/profile/:path*',
    '/admin-panel',
    '/admin-panel/:path*',
  ],
};
