'use client';

import { usePathname } from 'next/navigation';

import { VirtuosoGrid } from 'react-virtuoso';

import { useVirtuosoScrollPersistence } from '@/shared/lib/hooks/use-virtuoso-scroll-persistence';

import { Page } from '@/widgets/Page';

import { useProductsQuery } from '../../api/useProductsQuery';
import { ProductsListItem } from '../ProductsListItem/ProductsListItem';
import { productsGridComponents } from './productsGridComponents';

export const ProductsRoute = () => {
  const pathname = usePathname();

  const { mainRef, data, gridContext, loadMore, scrollParent } =
    useProductsQuery(pathname);

  const { restoreStateFrom, onGridStateChanged } =
    useVirtuosoScrollPersistence(pathname);

  return (
    <Page className="space-y-6" mainRef={mainRef} heading="Продукты">
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
          restoreStateFrom={restoreStateFrom}
          stateChanged={onGridStateChanged}
        />
      ) : (
        <div className="min-h-96" aria-hidden />
      )}
    </Page>
  );
};
