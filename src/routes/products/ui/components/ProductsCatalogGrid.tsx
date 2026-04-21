'use client';

import { type RefObject, useMemo } from 'react';

import { useShallow } from 'zustand/react/shallow';

import { pagesPath } from '@/shared/config/routes/$path';

import {
  hasActiveFilters,
  useFilterProductsStore,
} from '@/features/filterProducts';

import { useProductsQuery } from '../../api/useProductsQuery';
import { useProductsCatalogInfiniteScroll } from '../../lib/hooks/useProductsCatalogInfiniteScroll';
import { useRestoreProductsCatalogScroll } from '../../lib/hooks/useRestoreProductsCatalogScroll';
import {
  ProductsCatalogGridEmptyCatalog,
  ProductsCatalogGridEmptyFiltered,
} from './ProductsCatalogGridEmpty';
import { ProductsCatalogGridSkeleton } from './ProductsCatalogGridSkeleton';
import { ProductsCatalogVirtualizedGrid } from './ProductsCatalogVirtualizedGrid';

export interface ProductsCatalogGridProps {
  mainRef: RefObject<HTMLElement | null>;
  isAdmin: boolean;
}

const pathname = pagesPath.products.$url().pathname;

export const ProductsCatalogGrid = ({
  mainRef,
  isAdmin,
}: ProductsCatalogGridProps) => {
  const {
    data,
    initialLoading,
    hasMore,
    loadingMore,
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

  const products = useMemo(() => data?.products ?? [], [data?.products]);

  useProductsCatalogInfiniteScroll({
    scrollParent,
    hasMore,
    loadMore,
    productsLength: products.length,
  });

  useRestoreProductsCatalogScroll({
    scrollParent,
    productsLength: products.length,
    pathname,
  });

  const showFilterBar = filtersActive || products.length > 0;

  if (initialLoading) {
    return <ProductsCatalogGridSkeleton />;
  }

  if (products.length === 0 && filtersActive) {
    return (
      <ProductsCatalogGridEmptyFiltered productsNetworkStatus={networkStatus} />
    );
  }

  if (products.length === 0 && !filtersActive) {
    return <ProductsCatalogGridEmptyCatalog isAdmin={isAdmin} />;
  }

  return (
    <ProductsCatalogVirtualizedGrid
      products={products}
      scrollParent={scrollParent}
      loadingMore={loadingMore}
      showFilterBar={showFilterBar}
      productsNetworkStatus={networkStatus}
    />
  );
};
