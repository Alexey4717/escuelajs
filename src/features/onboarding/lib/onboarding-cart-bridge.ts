import { type CartLineItem, useCartStore } from '@/entities/Cart';

let savedCartSnapshot: CartLineItem[] | null = null;

/** Снять persist-корзину пользователя и начать с пустой для демо. */
export function enterOnboardingCartIsolation(): void {
  if (savedCartSnapshot !== null) {
    return;
  }
  const items = useCartStore.getState().items.map((i) => ({ ...i }));
  savedCartSnapshot = items;
  useCartStore.getState().clearCart();
}

/** Восстановить корзину пользователя после выхода из онбординга. */
export function exitOnboardingCartIsolation(): void {
  useCartStore.getState().clearCart();
  if (savedCartSnapshot !== null) {
    for (const item of savedCartSnapshot) {
      useCartStore.getState().addItem(item);
    }
    savedCartSnapshot = null;
  }
}
