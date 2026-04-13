'use client';

import { Page } from '@/widgets/Page';

import { CART_PAGE_HEADING } from '../lib/constants';
import { useCartRoute } from '../lib/hooks/useCartRoute';
import { CartCheckoutSection } from './components/CartCheckoutSection';
import { CartEmptyState } from './components/CartEmptyState';
import { CartItemsList } from './components/CartItemsList';
import { ClearCartButton } from './components/ClearCartButton';

export function CartRoute() {
  const { items, removeItemByProductId, handleOrder, clearCart } =
    useCartRoute();

  if (items.length === 0) {
    return (
      <Page heading={CART_PAGE_HEADING} narrow>
        <CartEmptyState />
      </Page>
    );
  }

  return (
    <Page heading={CART_PAGE_HEADING} narrow>
      <ClearCartButton onClear={clearCart} />
      <CartItemsList items={items} onRemoveItem={removeItemByProductId} />
      <CartCheckoutSection onOrder={handleOrder} />
    </Page>
  );
}
