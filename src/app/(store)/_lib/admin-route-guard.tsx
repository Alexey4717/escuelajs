import { type ReactNode } from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { query } from '@/shared/api/apollo-client/rsc';
import { UserDetailsDocument } from '@/shared/api/generated/graphql';
import { ACCESS_TOKEN_KEY } from '@/shared/config/consts/auth';
import { getSubFromAccessToken } from '@/shared/lib/auth/jwt-payload-sub/jwt-payload-sub';
import { nextCacheTags } from '@/shared/lib/next-cache-tags/tags';
import { loginPageUrlWithFrom } from '@/shared/lib/redirects/safe-login-redirect';
import { pagesPath } from '@/shared/routes/$path';
import { RouteGuard } from '@/shared/ui/RouteGuard/RouteGuard';

import { parseUserRole } from '@/entities/User';

import { Page } from '@/widgets/Page';

async function getCurrentUserRole() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;
  const userId = getSubFromAccessToken(accessToken);

  if (!userId) {
    return null;
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

  return data?.user?.role ? parseUserRole(data.user.role) : null;
}

export async function protectAdminRouteOnServer(fromPath: string) {
  const role = await getCurrentUserRole();

  if (role == null) {
    redirect(loginPageUrlWithFrom(fromPath));
  }

  if (role !== 'admin') {
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
