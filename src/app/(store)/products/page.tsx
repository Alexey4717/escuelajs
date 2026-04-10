import { Suspense } from 'react';

import type { Metadata } from 'next';

import { PreloadQuery } from '@/shared/api/apollo-client/rsc';
import { ProductsDocument } from '@/shared/api/generated/graphql';
import { nextCacheTags } from '@/shared/lib/next-cache-tags/tags';
import { Typography } from '@/shared/ui/Typography/Typography';

import { PRODUCTS_PAGE_SIZE, ProductsRoute } from '@/routes/products';

const productsListFetchContext = {
  fetchOptions: {
    next: {
      tags: [nextCacheTags.products],
    },
  },
} as const;

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
      errorPolicy="all"
      context={productsListFetchContext}
    >
      <Suspense
        fallback={<Typography variant="muted">Загрузка каталога…</Typography>}
      >
        <ProductsRoute />
      </Suspense>
    </PreloadQuery>
  );
}
