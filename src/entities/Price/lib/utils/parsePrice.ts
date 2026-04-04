export const parsePrice = (price: number, currency: string) =>
  price.toLocaleString('ru-RU', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });
