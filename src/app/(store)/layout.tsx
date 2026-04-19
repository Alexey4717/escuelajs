import { type ReactNode } from 'react';

import { cookies } from 'next/headers';

import { PreloadQuery } from '@/shared/api/apollo-client/rsc';
import { UserDetailsDocument } from '@/shared/api/generated/graphql';
import { ACCESS_TOKEN_KEY } from '@/shared/config/consts/auth';
import { defineIsLoggedIn } from '@/shared/lib/auth/is-logged-in';
import { getSubFromAccessToken } from '@/shared/lib/auth/jwt-payload-sub/jwt-payload-sub';
import { nextCacheTags } from '@/shared/lib/cache/nextjs/tags';
import { emitDebugSessionLog } from '@/shared/lib/debug-session-log';

import { SessionHydration } from '@/entities/Session';

import { StoreLayoutShell } from '@/widgets/StoreLayout';

interface StoreLayoutProps {
  children: ReactNode;
}

export default async function StoreLayout({
  children,
}: Readonly<StoreLayoutProps>) {
  const isLoggedIn = await defineIsLoggedIn();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;
  const userId = getSubFromAccessToken(accessToken);

  // #region agent log
  emitDebugSessionLog({
    hypothesisId: 'H5',
    location: 'app/(store)/layout.tsx',
    message: 'store shell session',
    data: {
      isLoggedIn,
      userIdFromJwt: Boolean(userId),
      preloadUserDetailsBranch: Boolean(userId),
    },
  });
  // #endregion

  return (
    <SessionHydration userId={userId}>
      <div className="flex h-dvh max-h-dvh min-h-0 w-full overflow-hidden">
        {userId ? (
          <PreloadQuery
            query={UserDetailsDocument}
            variables={{ id: userId }}
            errorPolicy="all"
            context={{
              fetchOptions: {
                next: {
                  tags: [nextCacheTags.user(userId)],
                },
              },
            }}
          >
            <StoreLayoutShell isLoggedIn={isLoggedIn}>
              {children}
            </StoreLayoutShell>
          </PreloadQuery>
        ) : (
          <StoreLayoutShell isLoggedIn={isLoggedIn}>
            {children}
          </StoreLayoutShell>
        )}
      </div>
    </SessionHydration>
  );
}
