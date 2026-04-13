import { DEFAULT_PRICE_CURRENCY } from '../constants';

export const parsePrice = (price: number, currency?: string) =>
  price.toLocaleString('ru-RU', {
    style: 'currency',
    currency: currency ?? DEFAULT_PRICE_CURRENCY,
    maximumFractionDigits: 0,
  });
