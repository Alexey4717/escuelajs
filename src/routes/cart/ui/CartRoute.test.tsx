import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/testing';

import { CartRoute } from './CartRoute';

const useCartRouteMock = vi.fn();

vi.mock('../lib/hooks/useCartRoute', () => ({
  useCartRoute: () => useCartRouteMock(),
}));

function mockDesktopViewport() {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: String(query).includes('1024'),
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
    onchange: null,
  }));
}

describe('CartRoute', () => {
  const removeItemByProductId = vi.fn();
  const handleOrder = vi.fn();
  const clearCart = vi.fn();

  beforeEach(() => {
    mockDesktopViewport();
    useCartRouteMock.mockReset();
    removeItemByProductId.mockReset();
    handleOrder.mockReset();
    clearCart.mockReset();
    handleOrder.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.useRealTimers();
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

  it('очистка корзины вызывает clearCart из хука после анимации строк', async () => {
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

    await waitFor(() => {
      expect(clearCart).toHaveBeenCalledTimes(1);
    });
  });

  it('пустая форма: «Заказать» не вызывает handleOrder', async () => {
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

    expect(handleOrder).not.toHaveBeenCalled();
  });

  it('«Заказать» вызывает handleOrder с данными формы', async () => {
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

    await user.type(screen.getByTestId('cart__input__name'), 'Иван');
    await user.type(screen.getByTestId('cart__input__email'), 'ivan@test.com');
    await user.type(
      screen.getByTestId('cart__input__pickupAddress'),
      'ПВЗ ул. Тест, 1',
    );
    await user.click(screen.getByTestId('cartRoute__button__placeOrder'));

    expect(handleOrder).toHaveBeenCalledTimes(1);
    expect(handleOrder).toHaveBeenCalledWith({
      name: 'Иван',
      email: 'ivan@test.com',
      pickupAddress: 'ПВЗ ул. Тест, 1',
    });
  });
});
