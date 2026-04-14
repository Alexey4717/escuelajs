import { useEffect, useRef } from 'react';

import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/testing';

import { useCartFlyOptional } from '@/shared/lib/animations/cart-fly';

import { CART_PERSIST_STORAGE_KEY, useCartStore } from '@/entities/Cart';

import { CartFlyAnimationProvider } from './CartFlyAnimationProvider';

describe('CartFlyAnimationProvider', () => {
  beforeEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    localStorage.removeItem(CART_PERSIST_STORAGE_KEY);
    useCartStore.getState().clearCart();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('isFlightInProgress отслеживает полёты по productId отдельно', async () => {
    installAnimateMock();
    const user = userEvent.setup();

    renderWithProviders(
      <CartFlyAnimationProvider>
        <CartFlyProviderHarness />
      </CartFlyAnimationProvider>,
    );

    await user.click(screen.getByTestId('start-a'));
    expect(screen.getByTestId('busy-a')).toHaveTextContent('busy');
    expect(screen.getByTestId('busy-b')).toHaveTextContent('idle');

    await user.click(screen.getByTestId('start-b'));
    expect(screen.getByTestId('busy-a')).toHaveTextContent('busy');
    expect(screen.getByTestId('busy-b')).toHaveTextContent('busy');

    await waitFor(() => {
      expect(screen.getByTestId('busy-a')).toHaveTextContent('idle');
      expect(screen.getByTestId('busy-b')).toHaveTextContent('idle');
      expect(
        useCartStore
          .getState()
          .items.map((i) => i.id)
          .sort(),
      ).toEqual(['prod-a', 'prod-b']);
    });
  });

  it('не планирует повторный полёт для того же productId пока первый не завершен', async () => {
    installAnimateMock();
    const addItemSpy = vi.spyOn(useCartStore.getState(), 'addItem');

    renderWithProviders(
      <CartFlyAnimationProvider>
        <CartFlyProviderHarness />
      </CartFlyAnimationProvider>,
    );

    fireEvent.click(screen.getByTestId('start-a'));
    fireEvent.click(screen.getByTestId('start-a'));

    await waitFor(() => {
      expect(useCartStore.getState().items.map((i) => i.id)).toEqual([
        'prod-a',
      ]);
      expect(addItemSpy).toHaveBeenCalledTimes(1);
    });
  });
});

function CartFlyProviderHarness() {
  const cartFly = useCartFlyOptional();
  const targetRef = useRef<HTMLSpanElement>(null);
  const sourceARef = useRef<HTMLButtonElement>(null);
  const sourceBRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cartFly?.registerCartFlyTarget(targetRef.current);
  }, [cartFly]);

  return (
    <div>
      <span
        ref={targetRef}
        style={{ display: 'inline-block', width: 20, height: 20 }}
      />
      <button
        ref={sourceARef}
        type="button"
        data-testid="start-a"
        onClick={() =>
          cartFly?.scheduleAddWithFly(
            { id: 'prod-a', title: 'A', price: 1, image: '' },
            () => sourceARef.current,
          )
        }
      >
        A
      </button>
      <button
        ref={sourceBRef}
        type="button"
        data-testid="start-b"
        onClick={() =>
          cartFly?.scheduleAddWithFly(
            { id: 'prod-b', title: 'B', price: 1, image: '' },
            () => sourceBRef.current,
          )
        }
      >
        B
      </button>
      <span data-testid="busy-a">
        {cartFly?.isFlightInProgress('prod-a') ? 'busy' : 'idle'}
      </span>
      <span data-testid="busy-b">
        {cartFly?.isFlightInProgress('prod-b') ? 'busy' : 'idle'}
      </span>
    </div>
  );
}

function installAnimateMock() {
  Object.defineProperty(Element.prototype, 'animate', {
    configurable: true,
    writable: true,
    value: vi.fn(
      () =>
        ({
          cancel: vi.fn(),
        }) as unknown as Animation,
    ),
  });
}
