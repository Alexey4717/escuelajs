import { type ReactNode } from 'react';

import { defineIsLoggedIn } from '@/shared/lib/auth/is-logged-in';

import { StoreSidebar, StoreTopbar } from '@/widgets/StoreLayout';

interface StoreLayoutProps {
  children: ReactNode;
}

export default async function StoreLayout({
  children,
}: Readonly<StoreLayoutProps>) {
  const isLoggedIn = await defineIsLoggedIn();

  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <StoreTopbar isLoggedIn={isLoggedIn} />
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <StoreSidebar isLoggedIn={isLoggedIn} />
        <main className="min-h-0 flex-1 overflow-y-auto p-layout">
          {children}
        </main>
      </div>
    </div>
  );
}
