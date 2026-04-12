import type { Metadata } from 'next';

import { PreloadQuery } from '@/shared/api/apollo-client/rsc';
import {
  ProductsDocument,
  type ProductsQueryVariables,
} from '@/shared/api/generated/graphql';
import { nextCacheTags } from '@/shared/lib/next-cache-tags/tags';

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

const productsListQueryVariables = {
  limit: PRODUCTS_PAGE_SIZE,
  offset: 0,
} as ProductsQueryVariables;

// Suspence нет, т.к. клиентский компонент со сложной фильтрацией,
// данные которой хранятся в глобальном сторе и могут инициализироваться с ними
// при возврате на роут
export default function ProductsPage() {
  return (
    <PreloadQuery
      query={ProductsDocument}
      variables={productsListQueryVariables}
      errorPolicy="all"
      context={productsListFetchContext}
    >
      <ProductsRoute />
    </PreloadQuery>
  );
}
