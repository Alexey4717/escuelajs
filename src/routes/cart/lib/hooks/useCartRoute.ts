'use client';

import { toast } from 'sonner';

import { clearCart, useCartStore } from '@/entities/Cart';

export function useCartRoute() {
  const items = useCartStore((s) => s.items);
  const removeItemByProductId = useCartStore((s) => s.removeItemByProductId);

  function handleOrder() {
    toast.success('Заказ оформлен (демо)');
    clearCart();
  }

  return {
    items,
    removeItemByProductId,
    handleOrder,
    clearCart,
  };
}
