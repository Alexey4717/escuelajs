import { type ComponentProps, useEffect, useRef } from 'react';

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/testing';

import { useCartFlyOptional } from '@/shared/lib/animations/cart-fly';

import { CART_PERSIST_STORAGE_KEY, useCartStore } from '@/entities/Cart';

import { CartFlyAnimationProvider } from '@/widgets/StoreLayout/ui/CartFlyAnimationProvider/CartFlyAnimationProvider';

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
    vi.useRealTimers();
    vi.restoreAllMocks();
    localStorage.removeItem(CART_PERSIST_STORAGE_KEY);
    useCartStore.getState().clearCart();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
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

  it('multi-flight: разные товары добавляются параллельно', async () => {
    installAnimateMock();
    const user = userEvent.setup();

    renderWithProviders(
      <CartFlyAnimationProvider>
        <CartFlyTargetStub />
        <ToggleCartItemButton
          variant="card"
          id="p-1"
          title="Товар 1"
          price={10}
          image=""
        />
        <ToggleCartItemButton
          variant="card"
          id="p-2"
          title="Товар 2"
          price={20}
          image=""
        />
      </CartFlyAnimationProvider>,
    );

    const [first, second] = screen.getAllByTestId(
      'toggleCartItem__button__card',
    );
    await user.click(first);
    await user.click(second);

    expect(first).toBeDisabled();
    expect(second).toBeDisabled();
    expect(useCartStore.getState().items).toHaveLength(0);

    await waitFor(() => {
      expect(
        useCartStore
          .getState()
          .items.map((i) => i.id)
          .sort(),
      ).toEqual(['p-1', 'p-2']);
    });
  });

  it('multi-flight: блокируется только нажатая кнопка', async () => {
    installAnimateMock();
    const user = userEvent.setup();

    renderWithProviders(
      <CartFlyAnimationProvider>
        <CartFlyTargetStub />
        <ToggleCartItemButton
          variant="card"
          id="p-1"
          title="Товар 1"
          price={10}
          image=""
        />
        <ToggleCartItemButton
          variant="card"
          id="p-2"
          title="Товар 2"
          price={20}
          image=""
        />
      </CartFlyAnimationProvider>,
    );

    const [first, second] = screen.getAllByTestId(
      'toggleCartItem__button__card',
    );

    await user.click(first);
    expect(first).toBeDisabled();
    expect(second).not.toBeDisabled();

    await user.click(first);
    expect(useCartStore.getState().items).toHaveLength(0);

    await waitFor(() => {
      expect(useCartStore.getState().items.map((i) => i.id)).toEqual(['p-1']);
    });
  });
});

const CartFlyTargetStub = () => {
  const cartFly = useCartFlyOptional();
  const targetRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    cartFly?.registerCartFlyTarget(targetRef.current);
  }, [cartFly]);

  return (
    <span
      ref={targetRef}
      style={{ display: 'inline-block', width: 20, height: 20 }}
    />
  );
};

const installAnimateMock = () => {
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
};
