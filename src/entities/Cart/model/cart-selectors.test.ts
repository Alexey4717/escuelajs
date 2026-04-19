import { describe, expect, it } from 'vitest';

import { selectCartItemCount, selectIsProductInCart } from './cart-selectors';
import type { CartState } from './types';

const stateWithItems = (items: CartState['items']): CartState => {
  const noop = () => {};
  return {
    items,
    addItem: noop,
    removeItemByProductId: noop,
    toggleItem: noop,
    clearCart: noop,
  };
};
describe('selectCartItemCount', () => {
  it('возвращает 0 для пустой корзины', () => {
    expect(selectCartItemCount(stateWithItems([]))).toBe(0);
  });

  it('возвращает число позиций', () => {
    expect(
      selectCartItemCount(
        stateWithItems([
          {
            id: '1',
            title: 'A',
            price: 1,
            image: '',
          },
          {
            id: '2',
            title: 'B',
            price: 2,
            image: '',
          },
        ]),
      ),
    ).toBe(2);
  });
});

describe('selectIsProductInCart', () => {
  const items: CartState['items'] = [
    { id: 'p1', title: 'T', price: 10, image: '' },
  ];

  it('возвращает true если товар с id есть в корзине', () => {
    expect(selectIsProductInCart('p1')(stateWithItems(items))).toBe(true);
  });

  it('возвращает false если товара нет', () => {
    expect(selectIsProductInCart('other')(stateWithItems(items))).toBe(false);
  });
});
