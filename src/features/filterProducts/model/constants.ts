/** Нижняя граница диапазона цены в фильтре каталога. */
export const FILTER_PRICE_SLIDER_MIN = 0;

/**
 * Верхняя граница **трека** слайдера: на шаге `10000` можно задать ровно 10000,
 * крайняя позиция `10001` = «без верхнего предела» в запросе; подпись у правого ползунка: `> 10000`.
 */
export const FILTER_PRICE_SLIDER_MAX = 10_001;

/** Числовой потолок для подписи: при значении {@link FILTER_PRICE_SLIDER_MAX} показываем `> FILTER_PRICE_SLIDER_VALUE_CAP`. */
export const FILTER_PRICE_SLIDER_VALUE_CAP = 10_000;
