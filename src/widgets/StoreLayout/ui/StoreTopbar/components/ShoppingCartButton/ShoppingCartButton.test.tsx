import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/testing';

import {
  CartFlyContext,
  type CartFlyContextValue,
} from '@/shared/lib/animations/cart-fly';

import { ShoppingCartButton } from './ShoppingCartButton';

describe('ShoppingCartButton', () => {
  it('регистрирует fly-target элемент в cartFly контексте', () => {
    const registerCartFlyTarget =
      vi.fn<CartFlyContextValue['registerCartFlyTarget']>();

    renderWithProviders(
      <CartFlyContext.Provider
        value={{
          registerCartFlyTarget,
          scheduleAddWithFly: vi.fn(),
          isFlightInProgress: vi.fn().mockReturnValue(false),
        }}
      >
        <ShoppingCartButton />
      </CartFlyContext.Provider>,
    );

    expect(screen.getByTestId('storeTopbar__link__cart')).toBeInTheDocument();
    expect(registerCartFlyTarget).toHaveBeenCalled();
    expect(registerCartFlyTarget).toHaveBeenCalledWith(expect.any(HTMLElement));
  });
});
