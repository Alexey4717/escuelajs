'use client';

import { toast } from 'sonner';

import { clearCart, useCartStore } from '@/entities/Cart';

import { useOnboardingSessionStore } from '@/features/onboarding';

import type { CartCheckoutFormOutput } from '../form/scheme';

export function useCartRoute() {
  const items = useCartStore((s) => s.items);
  const removeItemByProductId = useCartStore((s) => s.removeItemByProductId);
  const isOnboardingDemoActive = useOnboardingSessionStore(
    (s) => s.isDemoActive,
  );

  async function handleOrder(data: CartCheckoutFormOutput) {
    await new Promise((r) => setTimeout(r, 1000));
    toast.success(`Заказ оформлен (демо): ${data.email}`);
    if (!isOnboardingDemoActive) {
      clearCart();
    }
  }

  return {
    items,
    removeItemByProductId,
    handleOrder,
    clearCart,
  };
}
