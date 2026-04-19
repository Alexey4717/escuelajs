import { FILTER_PRICE_SLIDER_MAX, FILTER_PRICE_SLIDER_MIN } from './constants';
import type { FilterProductsState } from './filter-products-store';

export const hasActiveFilters = (
  state: Pick<
    FilterProductsState,
    'title' | 'categoryId' | 'priceMin' | 'priceMax'
  >,
): boolean => {
  if (state.title.trim() !== '') {
    return true;
  }
  if (state.categoryId !== null) {
    return true;
  }
  if (
    state.priceMin !== FILTER_PRICE_SLIDER_MIN ||
    state.priceMax !== FILTER_PRICE_SLIDER_MAX
  ) {
    return true;
  }
  return false;
};
