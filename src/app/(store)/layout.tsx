import { type ReactNode } from 'react';

import { cookies } from 'next/headers';

import { ACCESS_TOKEN_KEY } from '@/shared/config/consts/auth';
import { defineIsLoggedIn } from '@/shared/lib/auth/is-logged-in';
import { getSubFromAccessToken } from '@/shared/lib/auth/jwt-payload-sub';

import { SessionHydration } from '@/entities/Session';

import { StoreSidebar, StoreTopbar } from '@/widgets/StoreLayout';

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
      <div className="flex h-dvh min-h-0 flex-col overflow-hidden">
        <StoreTopbar isLoggedIn={isLoggedIn} />
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <StoreSidebar />
          <main className="min-h-0 flex-1 overflow-y-auto p-layout">
            {children}
          </main>
        </div>
      </div>
    </SessionHydration>
  );
}
