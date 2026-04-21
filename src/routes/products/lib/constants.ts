import type { CSSProperties } from 'react';

export const PRODUCTS_CATALOG_GRID_SKELETON_INDICES = Array.from(
  { length: 8 },
  (_, index) => index,
);

export const LOAD_MORE_SCROLL_THRESHOLD_PX = 24;
export const LOAD_MORE_BOTTOM_PROXIMITY_PX = 240;
export const PRODUCT_CARD_ESTIMATED_HEIGHT_PX = 420;
export const GRID_GAP_PX_BASE = 12;
export const GRID_GAP_PX_SM = 16;
export const GRID_OVERSCAN_ROWS = 3;

export const PRODUCTS_GRID_CLASSNAME =
  'grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4';

export const VIRTUAL_ROW_STYLE: CSSProperties = {
  left: 0,
  position: 'absolute',
  top: 0,
  width: '100%',
};
