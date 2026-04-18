'use client';

import {
  type CSSProperties,
  type RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import Link from 'next/link';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useShallow } from 'zustand/react/shallow';

import { BREAKPOINTS_PX } from '@/shared/config/consts';
import { pagesPath } from '@/shared/config/routes/$path';
import { ONBOARDING_TARGET_IDS } from '@/shared/lib/onboarding';
import { useAppStore } from '@/shared/lib/store';
import { Button } from '@/shared/ui/Button/Button';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Typography } from '@/shared/ui/Typography/Typography';

import {
  FilteredProductsEmptyMessage,
  FilterProductsBar,
  hasActiveFilters,
  useFilterProductsStore,
} from '@/features/filterProducts';

import { useProductsQuery } from '../../api/useProductsQuery';
import { ProductsCatalogGridItem } from './ProductsCatalogGridItem';

export type ProductsCatalogGridProps = {
  pathname: string;
  mainRef: RefObject<HTMLElement | null>;
  isAdmin: boolean;
};

const productsSkeletonItems = Array.from({ length: 8 }, (_, index) => index);
const LOAD_MORE_SCROLL_THRESHOLD_PX = 24;
const LOAD_MORE_BOTTOM_PROXIMITY_PX = 240;
const PRODUCT_CARD_ESTIMATED_HEIGHT_PX = 420;
const GRID_GAP_PX_BASE = 12;
const GRID_GAP_PX_SM = 16;
const GRID_OVERSCAN_ROWS = 3;
const PRODUCTS_GRID_CLASSNAME =
  'grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4';
const VIRTUAL_ROW_STYLE: CSSProperties = {
  left: 0,
  position: 'absolute',
  top: 0,
  width: '100%',
};

function resolveProductsGridColumns(width: number) {
  if (width >= BREAKPOINTS_PX.lg) {
    return 4;
  }
  if (width >= BREAKPOINTS_PX.md) {
    return 3;
  }
  if (width >= BREAKPOINTS_PX.sm) {
    return 2;
  }
  return 1;
}

function resolveProductsGridGap(width: number) {
  if (width >= BREAKPOINTS_PX.sm) {
    return GRID_GAP_PX_SM;
  }
  return GRID_GAP_PX_BASE;
}

function ProductsCatalogGridLoad() {
  return (
    <div
      className="space-y-6"
      data-onboarding={ONBOARDING_TARGET_IDS.productsList}
    >
      <div className="flex flex-wrap gap-2.5" aria-hidden>
        <Skeleton className="h-10 w-44 rounded-md" />
        <Skeleton className="h-10 w-36 rounded-md" />
        <Skeleton className="h-10 w-28 rounded-md" />
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>
      <div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
        aria-hidden
      >
        {productsSkeletonItems.map((item) => (
          <Skeleton key={item} loading className="rounded-xl bg-muted/70">
            <div className="h-[22rem] rounded-xl border border-border/40" />
          </Skeleton>
        ))}
      </div>
    </div>
  );
}

export function ProductsCatalogGrid({
  pathname,
  mainRef,
  isAdmin,
}: ProductsCatalogGridProps) {
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
  const virtualGridRef = useRef<HTMLDivElement | null>(null);
  const [columnsCount, setColumnsCount] = useState(4);
  const [rowGapPx, setRowGapPx] = useState(GRID_GAP_PX_SM);
  const rowsCount = Math.ceil(products.length / columnsCount);
  const hasUserScrollSignalRef = useRef(false);
  const restoredScrollPathRef = useRef<string | null>(null);

  /** Не зависит от `loading`: при refetch сохраняем предыдущий `data` через Apollo `previousData`. */
  const showFilterBar = filtersActive || products.length > 0;

  useEffect(() => {
    hasUserScrollSignalRef.current = false;
  }, [pathname, products.length]);

  useEffect(() => {
    restoredScrollPathRef.current = null;
  }, [pathname]);

  useEffect(() => {
    if (!scrollParent) {
      return;
    }
    const onScroll = () => {
      const scrollTop = scrollParent.scrollTop;
      if (scrollTop > LOAD_MORE_SCROLL_THRESHOLD_PX) {
        hasUserScrollSignalRef.current = true;
      }
      const distanceToBottom =
        scrollParent.scrollHeight - scrollTop - scrollParent.clientHeight;
      if (
        hasUserScrollSignalRef.current &&
        hasMore &&
        distanceToBottom <= LOAD_MORE_BOTTOM_PROXIMITY_PX
      ) {
        loadMore();
      }
    };
    scrollParent.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      scrollParent.removeEventListener('scroll', onScroll);
    };
  }, [hasMore, loadMore, scrollParent]);

  useEffect(() => {
    const element = virtualGridRef.current;
    if (!element) {
      return;
    }
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }
      const nextColumnsCount = resolveProductsGridColumns(
        entry.contentRect.width,
      );
      const nextRowGapPx = resolveProductsGridGap(entry.contentRect.width);
      setColumnsCount((prev) =>
        prev === nextColumnsCount ? prev : nextColumnsCount,
      );
      setRowGapPx((prev) => (prev === nextRowGapPx ? prev : nextRowGapPx));
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!scrollParent || products.length === 0) {
      return;
    }
    if (restoredScrollPathRef.current === pathname) {
      return;
    }
    const savedScrollTop = useAppStore.getState().scrollByPath[pathname] ?? 0;
    restoredScrollPathRef.current = pathname;
    if (savedScrollTop <= 0) {
      return;
    }
    const restoreScrollPosition = () => {
      scrollParent.scrollTop = savedScrollTop;
    };
    restoreScrollPosition();
    const rafId = requestAnimationFrame(restoreScrollPosition);
    const timeoutId = window.setTimeout(restoreScrollPosition, 120);
    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [pathname, products.length, scrollParent]);

  // eslint-disable-next-line react-hooks/incompatible-library -- `useVirtualizer` is required for windowing.
  const rowVirtualizer = useVirtualizer({
    count: rowsCount,
    estimateSize: () => PRODUCT_CARD_ESTIMATED_HEIGHT_PX + rowGapPx,
    getScrollElement: () => scrollParent,
    overscan: GRID_OVERSCAN_ROWS,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  if (initialLoading) {
    return <ProductsCatalogGridLoad />;
  }

  if (products.length === 0 && filtersActive) {
    return (
      <div
        className="space-y-6"
        data-onboarding={ONBOARDING_TARGET_IDS.productsList}
      >
        <FilterProductsBar productsNetworkStatus={networkStatus} />
        <FilteredProductsEmptyMessage />
      </div>
    );
  }

  if (products.length === 0 && !filtersActive) {
    return (
      <div
        className="flex flex-col items-center gap-4 py-12 text-center"
        data-onboarding={ONBOARDING_TARGET_IDS.productsList}
      >
        <Typography variant="muted">No products in the catalog yet.</Typography>
        {isAdmin ? (
          <Button asChild variant="default">
            <Link href={pagesPath.products.create.$url().path}>
              Add product
            </Link>
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className="space-y-6"
      data-onboarding={ONBOARDING_TARGET_IDS.productsList}
    >
      {showFilterBar ? (
        <FilterProductsBar productsNetworkStatus={networkStatus} />
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
          {productsSkeletonItems.slice(0, 4).map((item) => (
            <Skeleton key={item} className="h-3.5 rounded-md" />
          ))}
        </div>
      ) : null}
    </div>
  );
}
