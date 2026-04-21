import { BREAKPOINTS_PX } from '@/shared/config/consts';

import { GRID_GAP_PX_BASE, GRID_GAP_PX_SM } from '../constants';

export const resolveProductsGridColumns = (width: number) => {
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
};

export const resolveProductsGridGap = (width: number) => {
  if (width >= BREAKPOINTS_PX.sm) {
    return GRID_GAP_PX_SM;
  }
  return GRID_GAP_PX_BASE;
};
