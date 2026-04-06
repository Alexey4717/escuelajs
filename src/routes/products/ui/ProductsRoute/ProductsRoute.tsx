'use client';

import { usePathname } from 'next/navigation';

import { VirtuosoGrid } from 'react-virtuoso';

import { useVirtuosoScrollPersistence } from '@/shared/lib/hooks/use-virtuoso-scroll-persistence';

import { ProductCard } from '@/entities/Product';

import { Page } from '@/widgets/Page';

import { useProductsQuery } from '../../api/useProductsQuery';
import { productsGridComponents } from './productsGridComponents';

export const ProductsRoute = () => {
  const pathname = usePathname();

  const { mainRef, data, gridContext, loadMore, scrollParent } =
    useProductsQuery(pathname);

  const { restoreStateFrom, onGridStateChanged } =
    useVirtuosoScrollPersistence(pathname);

  return (
    <Page
      className="space-y-6"
      mainRef={mainRef}
      heading="Продукты"
      withSavingScrollPosition
    >
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
          itemContent={(_, product) => <ProductCard product={product} />}
          restoreStateFrom={restoreStateFrom}
          stateChanged={onGridStateChanged}
        />
      ) : (
        <div className="min-h-96" aria-hidden />
      )}
    </Page>
  );
};
