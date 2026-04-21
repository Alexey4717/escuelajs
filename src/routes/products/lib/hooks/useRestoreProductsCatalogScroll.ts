import { useEffect, useRef } from 'react';

import { useAppStore } from '@/shared/lib/store';

interface UseRestoreProductsCatalogScrollParams {
  scrollParent: HTMLElement | null;
  productsLength: number;
  pathname: string;
}

export const useRestoreProductsCatalogScroll = ({
  scrollParent,
  productsLength,
  pathname,
}: UseRestoreProductsCatalogScrollParams) => {
  const restoredScrollPathRef = useRef<string | null>(null);

  useEffect(() => {
    restoredScrollPathRef.current = null;
  }, []);

  useEffect(() => {
    const el = scrollParent;
    if (!el || productsLength === 0) {
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
      el.scrollTo({ top: savedScrollTop, behavior: 'instant' });
    };
    restoreScrollPosition();
    const rafId = requestAnimationFrame(restoreScrollPosition);
    const timeoutId = window.setTimeout(restoreScrollPosition, 120);
    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [productsLength, scrollParent, pathname]);
};
