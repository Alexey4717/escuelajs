'use client';

import { useSuspenseQuery } from '@apollo/client/react';

import {
  ProductsDocument,
  type ProductsQuery,
  type ProductsQueryVariables,
} from '../api/products.generated';
import { PRODUCTS_PAGE_SIZE } from '../constants';
import { ProductsListItem } from './ProductsListItem';

export function ProductsView() {
  const { data } = useSuspenseQuery<ProductsQuery, ProductsQueryVariables>(
    ProductsDocument,
    {
      variables: { limit: PRODUCTS_PAGE_SIZE, offset: 0 },
    },
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Товары</h1>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.products.map((product) => (
          <ProductsListItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}
