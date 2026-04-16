'use client';

import { type RefObject } from 'react';

import Link from 'next/link';

import { VirtuosoGrid } from 'react-virtuoso';
import { useShallow } from 'zustand/react/shallow';

import { pagesPath } from '@/shared/config/routes/$path';
import { useVirtuosoScrollPersistence } from '@/shared/lib/hooks/use-virtuoso-scroll-persistence';
import { ONBOARDING_TARGET_IDS } from '@/shared/lib/onboarding';
import { Button } from '@/shared/ui/Button/Button';
import { Typography } from '@/shared/ui/Typography/Typography';

import { ProductCard } from '@/entities/Product';

import {
  FilteredProductsEmptyMessage,
  FilterProductsBar,
  hasActiveFilters,
  useFilterProductsStore,
} from '@/features/filterProducts';
import {
  ONBOARDING_ADMIN_DEMO_PRODUCT_A_ID,
  ONBOARDING_DEMO_PRODUCT_A_ID,
  ONBOARDING_DEMO_PRODUCT_B_ID,
} from '@/features/onboarding';
import { ToggleCartItemButton } from '@/features/toggleCartItem';

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
    return (
      <div data-onboarding={ONBOARDING_TARGET_IDS.productsList}>
        <Typography variant="muted">Загрузка каталога…</Typography>
      </div>
    );
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
    <div
      className="space-y-6"
      data-onboarding={ONBOARDING_TARGET_IDS.productsList}
    >
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
        itemContent={(_, product) => {
          const isDemoA = product.id === ONBOARDING_DEMO_PRODUCT_A_ID;
          const isDemoB = product.id === ONBOARDING_DEMO_PRODUCT_B_ID;
          const isAdminDemoProductA =
            product.id === ONBOARDING_ADMIN_DEMO_PRODUCT_A_ID;
          const titleOnboardingTarget = isDemoB
            ? ONBOARDING_TARGET_IDS.catalogSecondProductLink
            : isAdminDemoProductA
              ? ONBOARDING_TARGET_IDS.productsListAdminDemoProductLink
              : undefined;
          return (
            <ProductCard
              product={product}
              titleDataOnboarding={titleOnboardingTarget}
              cartAction={
                <span
                  data-onboarding={
                    isDemoA
                      ? ONBOARDING_TARGET_IDS.catalogFirstProductCart
                      : undefined
                  }
                >
                  <ToggleCartItemButton
                    variant="card"
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.images[0] ?? ''}
                  />
                </span>
              }
            />
          );
        }}
        restoreStateFrom={restoreStateFrom}
        stateChanged={onGridStateChanged}
      />
    </div>
  );
}
