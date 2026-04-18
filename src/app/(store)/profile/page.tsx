import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { PreloadQuery } from '@/shared/api/apollo-client/rsc';
import { UserDetailsDocument } from '@/shared/api/generated/graphql';
import { ACCESS_TOKEN_KEY } from '@/shared/config/consts/auth';
import { pagesPath } from '@/shared/config/routes/$path';
import { getSubFromAccessToken } from '@/shared/lib/auth/jwt-payload-sub/jwt-payload-sub';
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

  if (!userId) {
    redirect(loginPageUrlWithFrom(pagesPath.profile.$url().path));
  }

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
