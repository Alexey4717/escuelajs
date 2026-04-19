import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { PreloadQuery } from '@/shared/api/apollo-client/rsc';
import { UserDetailsDocument } from '@/shared/api/generated/graphql';
import { ACCESS_TOKEN_KEY } from '@/shared/config/consts/auth';
import { pagesPath } from '@/shared/config/routes/$path';
import { getSubFromAccessToken } from '@/shared/lib/auth/jwt-payload-sub/jwt-payload-sub';
import { emitDebugSessionLog } from '@/shared/lib/debug-session-log';
import { loginPageUrlWithFrom } from '@/shared/lib/redirects/safe-login-redirect';
import { buildNoIndexMetadata } from '@/shared/lib/seo';

import { ProfilePageClient } from '@/routes/profile';

export const metadata: Metadata = {
  ...buildNoIndexMetadata({
    title: 'Profile',
    description: 'Private account profile page.',
  }),
};

const profileFetchContext = {
  fetchOptions: {
    cache: 'no-store',
  },
} as const;

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;
  const userId = getSubFromAccessToken(accessToken);

  // #region agent log
  emitDebugSessionLog({
    hypothesisId: 'H2',
    location: 'profile/page.tsx',
    message: 'server auth gate',
    data: {
      hasAccessCookie: Boolean(accessToken?.length),
      jwtSegmentCount: accessToken?.split('.').length ?? 0,
      userIdFromJwt: Boolean(userId),
      nextStep: userId ? 'preload-user-details' : 'redirect-login',
    },
  });
  // #endregion

  if (!userId) {
    // #region agent log
    emitDebugSessionLog({
      hypothesisId: 'H2',
      location: 'profile/page.tsx',
      message: 'redirect no userId from access JWT',
      data: { reason: 'getSubFromAccessToken null or empty' },
    });
    // #endregion
    redirect(loginPageUrlWithFrom(pagesPath.profile.$url().path));
  }

  // #region agent log
  emitDebugSessionLog({
    hypothesisId: 'H3',
    location: 'profile/page.tsx',
    message: 'render PreloadQuery UserDetails',
    data: { hasUserId: true },
  });
  // #endregion

  return (
    <PreloadQuery
      query={UserDetailsDocument}
      variables={{ id: userId }}
      errorPolicy="all"
      context={profileFetchContext}
    >
      <ProfilePageClient />
    </PreloadQuery>
  );
}
