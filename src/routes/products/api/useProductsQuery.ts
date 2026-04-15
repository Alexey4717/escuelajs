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
import { ProductsGridContext } from '../ui/components/productsGridComponents';

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
    setScrollParent(viewport instanceof HTMLElement ? viewport : null);
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

  const filterKey = useMemo(() => JSON.stringify(filterVars), [filterVars]);
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

  const hasMoreRef = useRef(
    (dataResolved?.products.length ?? 0) === PRODUCTS_PAGE_SIZE,
  );
  const loadingMoreRef = useRef(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const lastBatchSizeRef = useRef(0);

  useEffect(() => {
    const len = dataResolved?.products.length ?? 0;
    // Только пока в кэше не больше одной «страницы»: иначе hasMore задаётся в .then() у fetchMore.
    if (len <= PRODUCTS_PAGE_SIZE) {
      hasMoreRef.current = len === PRODUCTS_PAGE_SIZE;
    }
  }, [filterKey, dataResolved?.products.length]);

  const loadMore = useCallback(() => {
    if (!hasMoreRef.current || loadingMoreRef.current) {
      return;
    }
    const listLen = dataResolved?.products.length ?? 0;
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
          lastBatchSizeRef.current = fetchMoreResult.products.length;
          return {
            ...prev,
            products: [...prev.products, ...fetchMoreResult.products],
          };
        },
      })
        .then(() => {
          if (lastBatchSizeRef.current < PRODUCTS_PAGE_SIZE) {
            hasMoreRef.current = false;
          }
        })
        .finally(() => {
          loadingMoreRef.current = false;
          setLoadingMore(false);
        });
    });
  }, [dataResolved?.products.length, fetchMore]);

  const gridContext: ProductsGridContext = { loadingMore };

  useLayoutEffect(() => {
    queueMicrotask(() => {
      applyMainToScrollParent();
    });
    const id = requestAnimationFrame(() => {
      applyMainToScrollParent();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, applyMainToScrollParent]);

  /** После первого ответа Apollo / смены макета ref `main` уже в DOM — повторяем поиск viewport. */
  useEffect(() => {
    queueMicrotask(() => {
      applyMainToScrollParent();
    });
  }, [dataResolved, initialLoading, pathname, applyMainToScrollParent]);

  useEffect(() => {
    return () => setScrollParent(null);
  }, []);

  return {
    data: dataResolved,
    initialLoading,
    gridContext,
    loadMore,
    scrollParent,
    networkStatus,
  };
};
