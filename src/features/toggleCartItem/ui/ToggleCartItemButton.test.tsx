import type { ComponentProps } from 'react';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/test/testing';

import { CART_PERSIST_STORAGE_KEY, useCartStore } from '@/entities/Cart';

import { ToggleCartItemButton } from './ToggleCartItemButton';

const line: ComponentProps<typeof ToggleCartItemButton> = {
  variant: 'card',
  id: 'p-toggle',
  title: 'Тестовый товар',
  price: 42,
  image: '',
};

describe('ToggleCartItemButton', () => {
  beforeEach(() => {
    localStorage.removeItem(CART_PERSIST_STORAGE_KEY);
    useCartStore.getState().clearCart();
  });

  it('variant card: первый клик добавляет товар в стор', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ToggleCartItemButton {...line} />);

    await user.click(screen.getByTestId('toggleCartItem__button__card'));

    expect(useCartStore.getState().items).toEqual([
      {
        id: 'p-toggle',
        title: 'Тестовый товар',
        price: 42,
        image: '',
      },
    ]);
  });

  it('variant card: второй клик убирает товар из стора', async () => {
    const user = userEvent.setup();
    useCartStore.getState().addItem({
      id: 'p-toggle',
      title: 'Тестовый товар',
      price: 42,
      image: '',
    });

    renderWithProviders(<ToggleCartItemButton {...line} />);

    await user.click(screen.getByTestId('toggleCartItem__button__card'));

    expect(useCartStore.getState().items).toEqual([]);
  });

  it('variant detail: переключает наличие в корзине', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ToggleCartItemButton {...line} variant="detail" />);

    await user.click(screen.getByTestId('toggleCartItem__button__detail'));
    expect(useCartStore.getState().items).toHaveLength(1);

    await user.click(screen.getByTestId('toggleCartItem__button__detail'));
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
