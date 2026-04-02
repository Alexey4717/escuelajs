import { Suspense } from 'react';

import type { Metadata } from 'next';

import { PreloadQuery } from '@/shared/api/apollo-client/rsc';
import { ProductsDocument } from '@/shared/api/generated/graphql';

import { PRODUCTS_PAGE_SIZE, ProductsView } from '@/routes/products';

/** Apollo RSC + BFF используют `headers()` (cookie) — страница не статическая. */
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Товары',
  description: 'Каталог товаров',
};

export default function ProductsPage() {
  return (
    <PreloadQuery
      query={ProductsDocument}
      variables={{ limit: PRODUCTS_PAGE_SIZE, offset: 0 }}
    >
      <Suspense
        fallback={<p className="text-muted-foreground">Загрузка каталога…</p>}
      >
        <ProductsView />
      </Suspense>
    </PreloadQuery>
  );
}
