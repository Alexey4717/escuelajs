'use client';

import { type CSSProperties, useCallback, useState } from 'react';

import { CART_LIST_ITEM_ANIMATION_MS } from '@/shared/lib/animations/cart-list';

import type { CartLineItem } from '@/entities/Cart';

import { CartItemRow } from './CartItemRow/CartItemRow';

const listStyle = {
  '--cart-list-item-duration': `${CART_LIST_ITEM_ANIMATION_MS}ms`,
} as CSSProperties;

export interface CartItemsListProps {
  items: CartLineItem[];
  onRemoveItem: (productId: string) => void;
  /** Все строки в анимации удаления (полная очистка корзины). */
  bulkExiting?: boolean;
}

export const CartItemsList = ({
  items,
  onRemoveItem,
  bulkExiting = false,
}: CartItemsListProps) => {
  const [removingIds, setRemovingIds] = useState(() => new Set<string>());

  const requestRemove = useCallback(
    (id: string) => {
      if (bulkExiting) return;

      setRemovingIds((prev) => {
        if (prev.has(id)) return prev;

        window.setTimeout(() => {
          onRemoveItem(id);
          setRemovingIds((p) => {
            const next = new Set(p);
            next.delete(id);
            return next;
          });
        }, CART_LIST_ITEM_ANIMATION_MS);

        return new Set(prev).add(id);
      });
    },
    [bulkExiting, onRemoveItem],
  );

  return (
    <ul className="space-y-4" style={listStyle}>
      {items.map((item) => (
        <CartItemRow
          key={item.id}
          item={item}
          onRemove={requestRemove}
          isExiting={bulkExiting || removingIds.has(item.id)}
          removeDisabled={bulkExiting}
        />
      ))}
    </ul>
  );
};
