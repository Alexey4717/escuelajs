import { type ReactNode } from 'react';

import { defineIsLoggedIn } from '@/shared/lib/auth/is-logged-in';

import { StoreSidebar, StoreTopbar } from '@/widgets/StoreLayout';

interface StoreLayoutProps {
  children: ReactNode;
}

export default async function StoreLayout({ children }: Readonly<StoreLayoutProps>) {
  const isLoggedIn = await defineIsLoggedIn();

  return (
    <div>
      <StoreTopbar isLoggedIn={isLoggedIn} />
      <div>
        <StoreSidebar />
        <main>{children}</main>
      </div>
    </div>
  );
}
