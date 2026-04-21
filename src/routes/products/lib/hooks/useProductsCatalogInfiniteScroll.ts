import { useEffect, useRef } from 'react';

import {
  LOAD_MORE_BOTTOM_PROXIMITY_PX,
  LOAD_MORE_SCROLL_THRESHOLD_PX,
} from '../constants';

interface UseProductsCatalogInfiniteScrollParams {
  scrollParent: HTMLElement | null;
  hasMore: boolean;
  loadMore: () => void;
  productsLength: number;
}

export const useProductsCatalogInfiniteScroll = ({
  scrollParent,
  hasMore,
  loadMore,
  productsLength,
}: UseProductsCatalogInfiniteScrollParams) => {
  const hasUserScrollSignalRef = useRef(false);

  useEffect(() => {
    hasUserScrollSignalRef.current = false;
  }, [productsLength]);

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
};
