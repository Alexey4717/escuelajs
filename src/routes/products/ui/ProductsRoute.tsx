'use client';

import { useRef } from 'react';

import { useCurrentUserRole } from '@/entities/Session';

import { Page } from '@/widgets/Page';

import { ProductsCatalogGrid } from './components/ProductsCatalogGrid';

export const ProductsRoute = () => {
  const mainRef = useRef<HTMLElement | null>(null);

  const { role, loading: roleLoading } = useCurrentUserRole();
  const isAdmin = !roleLoading && role === 'admin';

  return (
    <Page mainRef={mainRef} heading="Products" withSavingScrollPosition>
      <ProductsCatalogGrid mainRef={mainRef} isAdmin={isAdmin} />
    </Page>
  );
};
