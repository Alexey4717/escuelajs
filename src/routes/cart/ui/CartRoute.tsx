'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { CART_LIST_ITEM_ANIMATION_MS } from '@/shared/lib/animations/cart-list';
import { ScrollArea } from '@/shared/ui/ScrollArea/ScrollArea';

import { Page } from '@/widgets/Page';

import { CART_PAGE_HEADING } from '../lib/constants';
import { useCartRoute } from '../lib/hooks/useCartRoute';
import { CartCheckoutSection } from './components/CartCheckoutSection/CartCheckoutSection';
import { CartEmptyState } from './components/CartEmptyState';
import { CartItemsList } from './components/CartItemsList';

export function CartRoute() {
  const { items, removeItemByProductId, handleOrder, clearCart } =
    useCartRoute();
  const [bulkExiting, setBulkExiting] = useState(false);
  const clearTimeoutRef = useRef<number | null>(null);

  const handleClearCart = useCallback(() => {
    if (bulkExiting || items.length === 0) {
      return;
    }
    setBulkExiting(true);
    clearTimeoutRef.current = window.setTimeout(() => {
      clearCart();
      setBulkExiting(false);
      clearTimeoutRef.current = null;
    }, CART_LIST_ITEM_ANIMATION_MS);
  }, [bulkExiting, clearCart, items.length]);

  useEffect(() => {
    return () => {
      if (clearTimeoutRef.current !== null) {
        window.clearTimeout(clearTimeoutRef.current);
      }
    };
  }, []);

  if (items.length === 0) {
    return (
      <Page heading={CART_PAGE_HEADING} narrow>
        <CartEmptyState />
      </Page>
    );
  }

  return (
    <Page heading={CART_PAGE_HEADING} narrow>
      <div className="flex flex-col gap-6 lg:h-[calc(100dvh-11.5rem)] lg:overflow-hidden lg:grid lg:grid-cols-[1fr_minmax(280px,400px)] lg:items-start lg:gap-8 xl:grid-cols-[1fr_minmax(300px,420px)]">
        <ScrollArea className="min-h-0 lg:h-full pb-[min(38vh,280px)] max-lg:min-h-[40vh] lg:pb-0">
          <div className="pr-2">
            <CartItemsList
              items={items}
              onRemoveItem={removeItemByProductId}
              bulkExiting={bulkExiting}
            />
          </div>
        </ScrollArea>
        <CartCheckoutSection
          onCheckoutSubmit={handleOrder}
          onClearCart={handleClearCart}
          clearCartDisabled={bulkExiting}
        />
      </div>
    </Page>
  );
}
