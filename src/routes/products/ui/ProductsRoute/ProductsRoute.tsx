'use client';

import { VirtuosoGrid } from 'react-virtuoso';

import { Typography } from '@/shared/ui/Typography/Typography';

import { useProductsQuery } from '../../api/useProductsQuery';
import { ProductsListItem } from '../ProductsListItem/ProductsListItem';
import { productsGridComponents } from './productsGridComponents';

export const ProductsRoute = () => {
  const { data, gridContext, loadMore, scrollParent, setProductsRootRef } =
    useProductsQuery();

  return (
    <div ref={setProductsRootRef} className="space-y-6">
      <Typography variant="h1">Товары</Typography>
      {scrollParent ? (
        <VirtuosoGrid
          customScrollParent={scrollParent}
          className="w-full"
          components={productsGridComponents}
          context={gridContext}
          data={data.products}
          computeItemKey={(_, product) => product.id}
          endReached={loadMore}
          increaseViewportBy={{ bottom: 400, top: 200 }}
          itemContent={(_, product) => <ProductsListItem product={product} />}
        />
      ) : (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {data.products.map((product) => (
            <li key={product.id} className="h-full min-w-0">
              <ProductsListItem product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
