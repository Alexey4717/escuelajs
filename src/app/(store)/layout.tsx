import { type ReactNode } from 'react';

import { cookies } from 'next/headers';

import { ACCESS_TOKEN_KEY } from '@/shared/config/consts/auth';
import { defineIsLoggedIn } from '@/shared/lib/auth/is-logged-in';
import { getSubFromAccessToken } from '@/shared/lib/auth/jwt-payload-sub';

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

  return (
    <SessionHydration userId={userId}>
      <div className="flex h-dvh max-h-dvh min-h-0 w-full overflow-hidden">
        <StoreLayoutShell isLoggedIn={isLoggedIn}>{children}</StoreLayoutShell>
      </div>
    </SessionHydration>
  );
}
