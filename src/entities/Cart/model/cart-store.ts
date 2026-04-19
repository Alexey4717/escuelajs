'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { CART_PERSIST_STORAGE_KEY } from './constants';
import { type CartState } from './types';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((s) => {
          const rest = s.items.filter((i) => i.id !== item.id);
          return { items: [...rest, item] };
        }),
      removeItemByProductId: (productId) =>
        set((s) => ({
          items: s.items.filter((i) => i.id !== productId),
        })),
      toggleItem: (item) => {
        const { items } = get();
        if (items.some((i) => i.id === item.id)) {
          get().removeItemByProductId(item.id);
        } else {
          get().addItem(item);
        }
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: CART_PERSIST_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export const clearCart = (): void => {
  useCartStore.getState().clearCart();
};
