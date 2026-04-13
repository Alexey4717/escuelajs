import { type ReactNode } from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { query } from '@/shared/api/apollo-client/rsc';
import { UserDetailsDocument } from '@/shared/api/generated/graphql';
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from '@/shared/config/consts/auth';
import { getSubFromAccessToken } from '@/shared/lib/auth/jwt-payload-sub/jwt-payload-sub';
import { nextCacheTags } from '@/shared/lib/cache/nextjs/tags';
import { loginPageUrlWithFrom } from '@/shared/lib/redirects/safe-login-redirect';
import { pagesPath } from '@/shared/routes/$path';
import { RouteGuard } from '@/shared/ui/RouteGuard/RouteGuard';

import { parseUserRole } from '@/entities/User';

import { Page } from '@/widgets/Page';

async function getCurrentUserRole() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;
  const hasRefreshToken = cookieStore.has(REFRESH_TOKEN_KEY);
  const userId = getSubFromAccessToken(accessToken);

  if (!userId) {
    return { userId: null, role: null, hasRefreshToken };
  }

  const { data } = await query({
    query: UserDetailsDocument,
    variables: { id: userId },
    errorPolicy: 'all',
    context: {
      fetchOptions: {
        next: {
          tags: [nextCacheTags.user(userId)],
        },
      },
    },
  });

  return {
    userId,
    role: data?.user?.role ? parseUserRole(data.user.role) : null,
    hasRefreshToken,
  };
}

export async function protectAdminRouteOnServer(fromPath: string) {
  const { userId, role, hasRefreshToken } = await getCurrentUserRole();

  // На логин отправляем только когда в cookie вообще нет access token (или он невалиден по структуре).
  // Если userId есть, но роль не удалось получить (например, истёк access token), даём клиенту шанс
  // обновить сессию через refresh и доопределить доступ в RouteGuard.
  if (!userId && !hasRefreshToken) {
    redirect(loginPageUrlWithFrom(fromPath));
  }

  if (role != null && role !== 'admin') {
    redirect(pagesPath.forbidden.$url().path);
  }
}

interface AdminRouteClientGuardProps {
  heading: string;
  children: ReactNode;
}

export function AdminRouteClientGuard({
  heading,
  children,
}: AdminRouteClientGuardProps) {
  return (
    <RouteGuard
      requiredRole="admin"
      fallback={
        <Page narrow heading={heading}>
          <p className="text-sm text-muted-foreground">Проверка доступа…</p>
        </Page>
      }
    >
      {children}
    </RouteGuard>
  );
}
