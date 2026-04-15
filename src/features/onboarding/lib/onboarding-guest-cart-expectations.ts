import { useCartStore } from '@/entities/Cart';

import {
  makeOnboardingProductListItem,
  ONBOARDING_DEMO_PRODUCT_A_ID,
  ONBOARDING_DEMO_PRODUCT_B_ID,
} from './onboarding-demo-fixtures';

export type GuestCartExpectation = 'empty' | 'onlyA' | 'both';

function itemA() {
  const p = makeOnboardingProductListItem(
    ONBOARDING_DEMO_PRODUCT_A_ID,
    'Демо-товар A',
    1000,
  );
  return {
    id: p.id,
    title: p.title,
    price: p.price,
    image: p.images[0] ?? '',
  };
}

function itemB() {
  const p = makeOnboardingProductListItem(
    ONBOARDING_DEMO_PRODUCT_B_ID,
    'Демо-товар B',
    2500,
  );
  return {
    id: p.id,
    title: p.title,
    price: p.price,
    image: p.images[0] ?? '',
  };
}

/** Приводит демо-корзину к ожидаемому для шага состоянию. */
export function ensureGuestCartState(expectation: GuestCartExpectation): void {
  const { clearCart, addItem } = useCartStore.getState();
  clearCart();
  if (expectation === 'empty') {
    return;
  }
  addItem(itemA());
  if (expectation === 'onlyA') {
    return;
  }
  addItem(itemB());
}

/** Ожидание корзины перед показом шага с индексом `stepIndex`. */
export function guestCartExpectationForStep(
  stepIndex: number,
): GuestCartExpectation {
  if (stepIndex <= 2) {
    return 'empty';
  }
  if (stepIndex <= 4) {
    return 'onlyA';
  }
  return 'both';
}
