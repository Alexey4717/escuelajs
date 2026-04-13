import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/testing';

import { CartRoute } from './CartRoute';

const useCartRouteMock = vi.fn();

vi.mock('../lib/hooks/useCartRoute', () => ({
  useCartRoute: () => useCartRouteMock(),
}));

describe('CartRoute', () => {
  const removeItemByProductId = vi.fn();
  const handleOrder = vi.fn();
  const clearCart = vi.fn();

  beforeEach(() => {
    useCartRouteMock.mockReset();
    removeItemByProductId.mockReset();
    handleOrder.mockReset();
    clearCart.mockReset();
  });

  it('показывает пустое состояние если нет товаров', () => {
    useCartRouteMock.mockReturnValue({
      items: [],
      removeItemByProductId,
      handleOrder,
      clearCart,
    });

    renderWithProviders(<CartRoute />);

    expect(screen.getByText(/Корзина пуста/)).toBeInTheDocument();
    expect(screen.getByTestId('cartRoute__link__catalog')).toHaveAttribute(
      'href',
      expect.stringContaining('/products'),
    );
  });

  it('показывает список, очистку и оформление заказа', () => {
    useCartRouteMock.mockReturnValue({
      items: [
        {
          id: '1',
          title: 'Товар А',
          price: 100,
          image: '',
        },
      ],
      removeItemByProductId,
      handleOrder,
      clearCart,
    });

    renderWithProviders(<CartRoute />);

    expect(
      screen.getByTestId('cartRoute__link__productTitle'),
    ).toHaveTextContent('Товар А');
    expect(
      screen.getByTestId('cartRoute__button__clearCart'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Оформить заказ' }),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('cartRoute__button__placeOrder'),
    ).toBeInTheDocument();
  });

  it('очистка корзины вызывает clearCart из хука', async () => {
    const user = userEvent.setup();
    useCartRouteMock.mockReturnValue({
      items: [
        {
          id: '1',
          title: 'T',
          price: 1,
          image: '',
        },
      ],
      removeItemByProductId,
      handleOrder,
      clearCart,
    });

    renderWithProviders(<CartRoute />);

    await user.click(screen.getByTestId('cartRoute__button__clearCart'));

    expect(clearCart).toHaveBeenCalledTimes(1);
  });

  it('«Заказать» вызывает handleOrder', async () => {
    const user = userEvent.setup();
    useCartRouteMock.mockReturnValue({
      items: [
        {
          id: '1',
          title: 'T',
          price: 1,
          image: '',
        },
      ],
      removeItemByProductId,
      handleOrder,
      clearCart,
    });

    renderWithProviders(<CartRoute />);

    await user.click(screen.getByTestId('cartRoute__button__placeOrder'));

    expect(handleOrder).toHaveBeenCalledTimes(1);
  });
});
