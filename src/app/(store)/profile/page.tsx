import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { ACCESS_TOKEN_KEY } from '@/shared/config/consts/auth';
import { getSubFromAccessToken } from '@/shared/lib/auth/jwt-payload-sub/jwt-payload-sub';
import { loginPageUrlWithFrom } from '@/shared/lib/redirects/safe-login-redirect';
import { pagesPath } from '@/shared/routes/$path';

import { ProfilePageClient } from '@/routes/profile';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;
  const userId = getSubFromAccessToken(accessToken);

  if (!userId) {
    redirect(loginPageUrlWithFrom(pagesPath.profile.$url().path));
  }

  return <ProfilePageClient />;
}
