import { type RefObject, useEffect, useState } from 'react';

import { GRID_GAP_PX_SM } from '../constants';
import {
  resolveProductsGridColumns,
  resolveProductsGridGap,
} from '../utils/resolveProductsGridLayout';

interface UseProductsCatalogGridMetricsParams {
  containerRef: RefObject<HTMLDivElement | null>;
}

export const useProductsCatalogGridMetrics = ({
  containerRef,
}: UseProductsCatalogGridMetricsParams) => {
  const [columnsCount, setColumnsCount] = useState(4);
  const [rowGapPx, setRowGapPx] = useState(GRID_GAP_PX_SM);

  useEffect(() => {
    const element = containerRef.current;
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
  }, [containerRef]);

  return { columnsCount, rowGapPx };
};
