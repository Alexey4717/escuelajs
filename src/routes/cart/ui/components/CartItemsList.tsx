import type { CartLineItem } from '@/entities/Cart';

import { CartItemRow } from './CartItemRow';

export interface CartItemsListProps {
  items: CartLineItem[];
  onRemoveItem: (productId: string) => void;
}

export function CartItemsList({ items, onRemoveItem }: CartItemsListProps) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <CartItemRow key={item.id} item={item} onRemove={onRemoveItem} />
      ))}
    </ul>
  );
}
