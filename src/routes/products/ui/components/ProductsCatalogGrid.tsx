'use client';

import { type RefObject } from 'react';

import Link from 'next/link';

import { VirtuosoGrid } from 'react-virtuoso';
import { useShallow } from 'zustand/react/shallow';

import { useVirtuosoScrollPersistence } from '@/shared/lib/hooks/use-virtuoso-scroll-persistence';
import { pagesPath } from '@/shared/routes/$path';
import { Button } from '@/shared/ui/Button/Button';
import { Typography } from '@/shared/ui/Typography/Typography';

import { ProductCard } from '@/entities/Product';

import {
  FilteredProductsEmptyMessage,
  FilterProductsBar,
  hasActiveFilters,
  useFilterProductsStore,
} from '@/features/filterProducts';

import { useProductsQuery } from '../../api/useProductsQuery';
import { productsGridComponents } from './productsGridComponents';

export type ProductsCatalogGridProps = {
  pathname: string;
  mainRef: RefObject<HTMLElement | null>;
  isAdmin: boolean;
};

export function ProductsCatalogGrid({
  pathname,
  mainRef,
  isAdmin,
}: ProductsCatalogGridProps) {
  const {
    data,
    initialLoading,
    gridContext,
    loadMore,
    scrollParent,
    networkStatus,
  } = useProductsQuery(pathname, mainRef);

  const filterSnapshot = useFilterProductsStore(
    useShallow((s) => ({
      title: s.title,
      categoryId: s.categoryId,
      priceMin: s.priceMin,
      priceMax: s.priceMax,
    })),
  );

  const filtersActive = hasActiveFilters(filterSnapshot);

  const products = data?.products ?? [];

  /** Не зависит от `loading`: при refetch сохраняем предыдущий `data` через Apollo `previousData`. */
  const showFilterBar = filtersActive || products.length > 0;

  const { restoreStateFrom, onGridStateChanged } =
    useVirtuosoScrollPersistence(pathname);

  if (initialLoading) {
    return <Typography variant="muted">Загрузка каталога…</Typography>;
  }

  if (products.length === 0 && filtersActive) {
    return (
      <div className="space-y-6">
        <FilterProductsBar productsNetworkStatus={networkStatus} />
        <FilteredProductsEmptyMessage />
      </div>
    );
  }

  if (products.length === 0 && !filtersActive) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <Typography variant="muted">В каталоге пока нет продуктов.</Typography>
        {isAdmin ? (
          <Button asChild variant="default">
            <Link href={pagesPath.products.create.$url().path}>
              Добавить продукт
            </Link>
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showFilterBar ? (
        <FilterProductsBar productsNetworkStatus={networkStatus} />
      ) : null}
      <VirtuosoGrid
        customScrollParent={scrollParent ?? undefined}
        className="w-full"
        components={productsGridComponents}
        context={gridContext}
        data={products}
        computeItemKey={(_, product) => product.id}
        endReached={loadMore}
        increaseViewportBy={{ bottom: 400, top: 200 }}
        itemContent={(_, product) => <ProductCard product={product} />}
        restoreStateFrom={restoreStateFrom}
        stateChanged={onGridStateChanged}
      />
    </div>
  );
}
