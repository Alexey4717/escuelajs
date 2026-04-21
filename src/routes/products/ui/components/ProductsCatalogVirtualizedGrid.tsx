'use client';

import { useRef } from 'react';

import { NetworkStatus } from '@apollo/client';
import { useVirtualizer } from '@tanstack/react-virtual';

import { type ProductsQuery } from '@/shared/api/generated/graphql';
import { ONBOARDING_TARGET_IDS } from '@/shared/lib/onboarding';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import { FilterProductsBar } from '@/features/filterProducts';

import {
  GRID_OVERSCAN_ROWS,
  PRODUCT_CARD_ESTIMATED_HEIGHT_PX,
  PRODUCTS_CATALOG_GRID_SKELETON_INDICES,
  PRODUCTS_GRID_CLASSNAME,
  VIRTUAL_ROW_STYLE,
} from '../../lib/constants';
import { useProductsCatalogGridMetrics } from '../../lib/hooks/useProductsCatalogGridMetrics';
import { ProductsCatalogGridItem } from './ProductsCatalogGridItem';

interface ProductsCatalogVirtualizedGridProps {
  products: ProductsQuery['products'];
  scrollParent: HTMLElement | null;
  loadingMore: boolean;
  showFilterBar: boolean;
  productsNetworkStatus: NetworkStatus;
}

export const ProductsCatalogVirtualizedGrid = ({
  products,
  scrollParent,
  loadingMore,
  showFilterBar,
  productsNetworkStatus,
}: ProductsCatalogVirtualizedGridProps) => {
  const virtualGridRef = useRef<HTMLDivElement | null>(null);
  const { columnsCount, rowGapPx } = useProductsCatalogGridMetrics({
    containerRef: virtualGridRef,
  });
  const rowsCount = Math.ceil(products.length / columnsCount);

  // eslint-disable-next-line react-hooks/incompatible-library -- `useVirtualizer` is required for windowing.
  const rowVirtualizer = useVirtualizer({
    count: rowsCount,
    estimateSize: () => PRODUCT_CARD_ESTIMATED_HEIGHT_PX + rowGapPx,
    getScrollElement: () => scrollParent,
    overscan: GRID_OVERSCAN_ROWS,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  return (
    <div
      className="space-y-6"
      data-onboarding={ONBOARDING_TARGET_IDS.productsList}
    >
      {showFilterBar ? (
        <FilterProductsBar productsNetworkStatus={productsNetworkStatus} />
      ) : null}
      <div ref={virtualGridRef} className="relative">
        <div
          className="relative w-full"
          style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
        >
          {virtualRows.map((virtualRow) => {
            const rowStart = virtualRow.index * columnsCount;
            const rowEnd = rowStart + columnsCount;
            const rowProducts = products.slice(rowStart, rowEnd);
            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
                style={{
                  ...VIRTUAL_ROW_STYLE,
                  paddingBottom:
                    virtualRow.index === rowsCount - 1 ? 0 : `${rowGapPx}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div className={PRODUCTS_GRID_CLASSNAME}>
                  {rowProducts.map((product) => (
                    <ProductsCatalogGridItem
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {loadingMore ? (
        <div className="grid grid-cols-1 gap-3 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {PRODUCTS_CATALOG_GRID_SKELETON_INDICES.slice(0, 4).map((item) => (
            <>
              ggg
              <Skeleton key={item} className="h-3.5 rounded-md" />
            </>
          ))}
        </div>
      ) : null}
    </div>
  );
};
