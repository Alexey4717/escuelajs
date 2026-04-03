'use client';

import { useSuspenseQuery } from '@apollo/client/react';

import { ProductsDocument } from '@/shared/api/generated/graphql';
import { Typography } from '@/shared/ui/Typography/Typography';

import { PRODUCTS_PAGE_SIZE } from '../constants';
import { ProductsListItem } from './ProductsListItem/ProductsListItem';

export function ProductsRoute() {
  const { data } = useSuspenseQuery(ProductsDocument, {
    variables: { limit: PRODUCTS_PAGE_SIZE, offset: 0 },
  });

  return (
    <div className="space-y-6">
      <Typography variant="h1">Товары</Typography>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <li key={product.id} className="h-full min-w-0">
            <ProductsListItem product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
