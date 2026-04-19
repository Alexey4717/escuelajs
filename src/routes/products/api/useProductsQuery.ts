'use client';

import {
  type RefObject,
  startTransition,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useQuery } from '@apollo/client/react';
import { useShallow } from 'zustand/react/shallow';

import {
  ProductsDocument,
  type ProductsQueryVariables,
} from '@/shared/api/generated/graphql';

import {
  buildProductsFilterVariables,
  useFilterProductsStore,
} from '@/features/filterProducts';
import { useOnboardingSessionStore } from '@/features/onboarding';

import { resolveScrollAreaViewport } from '@/widgets/Page/lib/utils/findScrollContainer';

import { PRODUCTS_PAGE_SIZE } from '../constants';

export const useProductsQuery = (
  pathname: string,
  mainRef: RefObject<HTMLElement | null>,
) => {
  const [scrollParent, setScrollParent] = useState<HTMLElement | null>(null);

  const applyMainToScrollParent = useCallback(() => {
    const el = mainRef.current;
    if (!el) {
      return;
    }
    const viewport = resolveScrollAreaViewport(el);
    const nextScrollParent = viewport instanceof HTMLElement ? viewport : null;
    setScrollParent((prev) =>
      prev === nextScrollParent ? prev : nextScrollParent,
    );
  }, [mainRef]);

  const filterSnapshot = useFilterProductsStore(
    useShallow((s) => ({
      title: s.title,
      categoryId: s.categoryId,
      priceMin: s.priceMin,
      priceMax: s.priceMax,
    })),
  );

  const filterVars = useMemo(
    () => buildProductsFilterVariables(filterSnapshot),
    [filterSnapshot],
  );

  const isOnboardingDemoActive = useOnboardingSessionStore(
    (s) => s.isDemoActive,
  );

  const variables = useMemo(() => {
    if (isOnboardingDemoActive) {
      return {
        limit: PRODUCTS_PAGE_SIZE,
        offset: 0,
        price_min: filterVars.price_min ?? null,
        price_max: filterVars.price_max ?? null,
        title: filterVars.title ?? null,
        categoryId: filterVars.categoryId ?? null,
      } satisfies ProductsQueryVariables;
    }
    return {
      limit: PRODUCTS_PAGE_SIZE,
      offset: 0,
      ...filterVars,
    } as ProductsQueryVariables;
  }, [filterVars, isOnboardingDemoActive]);

  const { data, previousData, loading, fetchMore, networkStatus } = useQuery(
    ProductsDocument,
    {
      variables,
      notifyOnNetworkStatusChange: false,
      fetchPolicy: isOnboardingDemoActive ? 'cache-only' : undefined,
    },
  );

  /** Пока идёт refetch с новыми variables, Apollo может отдать `data: undefined` — не скрываем фильтры и список. */
  const dataResolved = data ?? previousData;

  /** Первый запрос без кэша: нет ни `data`, ни `previousData`. */
  const initialLoading = loading && dataResolved == null;

  const visibleProductsCount = dataResolved?.products.length ?? 0;
  const hasSinglePageSnapshot = visibleProductsCount <= PRODUCTS_PAGE_SIZE;
  const [hasMoreFromPagination, setHasMoreFromPagination] = useState(
    visibleProductsCount === PRODUCTS_PAGE_SIZE,
  );
  const hasMore = hasSinglePageSnapshot
    ? visibleProductsCount === PRODUCTS_PAGE_SIZE
    : hasMoreFromPagination;
  const hasMoreRef = useRef(hasMore);
  const loadingMoreRef = useRef(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  const loadMore = useCallback(() => {
    if (!hasMoreRef.current || loadingMoreRef.current) {
      return;
    }
    const listLen = visibleProductsCount;
    loadingMoreRef.current = true;
    setLoadingMore(true);
    const filters = buildProductsFilterVariables(
      useFilterProductsStore.getState(),
    );
    startTransition(() => {
      void fetchMore({
        variables: {
          limit: PRODUCTS_PAGE_SIZE,
          offset: listLen,
          ...filters,
        } as ProductsQueryVariables,
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }
          const mergedProducts = [
            ...prev.products,
            ...fetchMoreResult.products,
          ];
          const uniqueProducts = mergedProducts.filter(
            (product, index, array) =>
              array.findIndex((item) => item.id === product.id) === index,
          );
          return {
            ...prev,
            products: uniqueProducts,
          };
        },
      })
        .then((result) => {
          const fetchedBatchSize = result.data?.products.length ?? 0;
          setHasMoreFromPagination(fetchedBatchSize === PRODUCTS_PAGE_SIZE);
        })
        .finally(() => {
          loadingMoreRef.current = false;
          setLoadingMore(false);
        });
    });
  }, [fetchMore, visibleProductsCount]);

  useLayoutEffect(() => {
    queueMicrotask(() => {
      applyMainToScrollParent();
    });
    const rafId = requestAnimationFrame(() => {
      applyMainToScrollParent();
    });
    const timeoutId = window.setTimeout(() => {
      applyMainToScrollParent();
    }, 250);
    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [pathname, applyMainToScrollParent]);

  useEffect(() => () => setScrollParent(null), []);

  return {
    data: dataResolved,
    initialLoading,
    hasMore,
    loadingMore,
    loadMore,
    scrollParent,
    networkStatus,
  };
};
