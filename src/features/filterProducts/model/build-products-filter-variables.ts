import type { ProductsQueryVariables } from '@/shared/api/generated/graphql';

import { FILTER_PRICE_SLIDER_MAX, FILTER_PRICE_SLIDER_MIN } from './constants';
import type { FilterProductsState } from './filter-products-store';

type FilterVars = Partial<
  Pick<
    ProductsQueryVariables,
    'price_min' | 'price_max' | 'title' | 'categoryId'
  >
>;

/**
 * Поля фильтрации для запроса `Products` (без limit/offset).
 * Не передаёт в API пустые/дефолтные ограничения.
 */
export const buildProductsFilterVariables = (
  state: Pick<
    FilterProductsState,
    'title' | 'categoryId' | 'priceMin' | 'priceMax'
  >,
): FilterVars => {
  const result: FilterVars = {};

  const trimmed = state.title.trim();
  if (trimmed !== '') {
    result.title = trimmed;
  }

  if (state.categoryId !== null) {
    result.categoryId = Number(state.categoryId);
  }

  /**
   * Бэкенд ожидает пару `price_min` + `price_max`: при любом сужении диапазона
   * отправляем оба поля, для «не тронутой» стороны — граница трека слайдера.
   */
  const priceRangeTouched =
    state.priceMin !== FILTER_PRICE_SLIDER_MIN ||
    state.priceMax !== FILTER_PRICE_SLIDER_MAX;
  if (priceRangeTouched) {
    result.price_min = state.priceMin;
    result.price_max = state.priceMax;
  }

  return result;
};
