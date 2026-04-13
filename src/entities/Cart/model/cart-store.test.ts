import { beforeEach, describe, expect, it } from 'vitest';

import { clearCart, useCartStore } from './cart-store';
import { CART_PERSIST_STORAGE_KEY } from './constants';

const sampleItem = {
  id: 'p1',
  title: 'Товар',
  price: 99,
  image: 'https://example.com/img.png',
};

describe('useCartStore', () => {
  beforeEach(() => {
    localStorage.removeItem(CART_PERSIST_STORAGE_KEY);
    useCartStore.getState().clearCart();
  });

  it('addItem добавляет позицию', () => {
    useCartStore.getState().addItem(sampleItem);
    expect(useCartStore.getState().items).toEqual([sampleItem]);
  });

  it('addItem с тем же id заменяет позицию', () => {
    useCartStore.getState().addItem(sampleItem);
    useCartStore
      .getState()
      .addItem({ ...sampleItem, title: 'Новое имя', price: 1 });
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].title).toBe('Новое имя');
    expect(useCartStore.getState().items[0].price).toBe(1);
  });

  it('removeItemByProductId удаляет позицию', () => {
    useCartStore.getState().addItem(sampleItem);
    useCartStore.getState().removeItemByProductId('p1');
    expect(useCartStore.getState().items).toEqual([]);
  });

  it('toggleItem добавляет если товара не было', () => {
    useCartStore.getState().toggleItem(sampleItem);
    expect(useCartStore.getState().items).toEqual([sampleItem]);
  });

  it('toggleItem удаляет если товар уже в корзине', () => {
    useCartStore.getState().addItem(sampleItem);
    useCartStore.getState().toggleItem(sampleItem);
    expect(useCartStore.getState().items).toEqual([]);
  });

  it('clearCart очищает все позиции', () => {
    useCartStore.getState().addItem(sampleItem);
    useCartStore.getState().addItem({
      id: 'p2',
      title: 'Другой',
      price: 5,
      image: '',
    });
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toEqual([]);
  });
});

describe('clearCart (хелпер)', () => {
  beforeEach(() => {
    localStorage.removeItem(CART_PERSIST_STORAGE_KEY);
    useCartStore.getState().clearCart();
  });

  it('очищает корзину вне подписки React', () => {
    useCartStore.getState().addItem(sampleItem);
    clearCart();
    expect(useCartStore.getState().items).toEqual([]);
  });
});
