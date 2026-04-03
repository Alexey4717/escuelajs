'use client';

import { startTransition, useCallback, useRef, useState } from 'react';

import { useSuspenseQuery } from '@apollo/client/react';

import { ProductsDocument } from '@/shared/api/generated/graphql';

import { PRODUCTS_PAGE_SIZE } from '../constants';
import { ProductsGridContext } from '../ui/ProductsRoute/productsGridComponents';

export const useProductsQuery = () => {
  const [scrollParent, setScrollParent] = useState<HTMLElement | null>(null);

  const setProductsRootRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) {
      setScrollParent(null);
      return;
    }
    const viewport = node.closest('[data-slot="scroll-area-viewport"]');
    setScrollParent(viewport instanceof HTMLElement ? viewport : null);
  }, []);

  const { data, fetchMore } = useSuspenseQuery(ProductsDocument, {
    variables: { limit: PRODUCTS_PAGE_SIZE, offset: 0 },
  });

  const hasMoreRef = useRef(data.products.length === PRODUCTS_PAGE_SIZE);
  const loadingMoreRef = useRef(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const lastBatchSizeRef = useRef(0);

  const loadMore = useCallback(() => {
    if (!hasMoreRef.current || loadingMoreRef.current) {
      return;
    }
    loadingMoreRef.current = true;
    setLoadingMore(true);
    startTransition(() => {
      void fetchMore({
        variables: {
          limit: PRODUCTS_PAGE_SIZE,
          offset: data.products.length,
        },
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
  }, [data.products.length, fetchMore]);

  const gridContext: ProductsGridContext = { loadingMore };

  return {
    data,
    gridContext,
    loadMore,
    scrollParent,
    setProductsRootRef,
  };
};
