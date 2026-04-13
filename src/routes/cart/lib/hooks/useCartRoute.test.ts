import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { clearCart, useCartStore } from '@/entities/Cart';

import { useCartRoute } from './useCartRoute';

const { toastSuccessMock, clearCartMock } = vi.hoisted(() => ({
  toastSuccessMock: vi.fn(),
  clearCartMock: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: {
    success: toastSuccessMock,
  },
}));

vi.mock('@/entities/Cart', async () => {
  const actual =
    await vi.importActual<typeof import('@/entities/Cart')>('@/entities/Cart');

  return {
    ...actual,
    clearCart: clearCartMock,
  };
});

describe('useCartRoute', () => {
  beforeEach(() => {
    vi.useRealTimers();
    toastSuccessMock.mockReset();
    clearCartMock.mockReset();
    useCartStore.getState().clearCart();
  });

  it('возвращает товары и removeItemByProductId из cart store', () => {
    useCartStore.getState().addItem({
      id: 'product-1',
      title: 'Тестовый товар',
      price: 100,
      image: '',
    });

    const { result } = renderHook(() => useCartRoute());

    expect(result.current.items).toHaveLength(1);
    expect(result.current.removeItemByProductId).toBe(
      useCartStore.getState().removeItemByProductId,
    );
    expect(result.current.clearCart).toBe(clearCart);
  });

  it('handleOrder ждёт задержку, показывает toast и очищает корзину', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useCartRoute());

    const orderPromise = result.current.handleOrder({
      name: 'Иван',
      email: 'ivan@test.com',
      pickupAddress: 'ПВЗ ул. Тест, 1',
    });

    expect(toastSuccessMock).not.toHaveBeenCalled();
    expect(clearCartMock).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(1000);
    await orderPromise;

    expect(toastSuccessMock).toHaveBeenCalledTimes(1);
    expect(toastSuccessMock).toHaveBeenCalledWith(
      'Заказ оформлен (демо): ivan@test.com',
    );
    expect(clearCartMock).toHaveBeenCalledTimes(1);
  });
});
