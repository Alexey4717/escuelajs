import { useCartStore } from '@/entities/Cart';

import {
  ONBOARDING_DEMO_PRODUCT_A_ID,
  ONBOARDING_DEMO_PRODUCT_B_ID,
  ONBOARDING_DEMO_PRODUCTS_LIST,
} from './onboarding-demo-fixtures';

export type GuestCartExpectation = 'empty' | 'onlyA' | 'both';
const cartLineFromDemoProduct = (id: string) => {
  const p = ONBOARDING_DEMO_PRODUCTS_LIST.find((x) => x.id === id);
  if (!p) {
    throw new Error(`Onboarding demo product missing: ${id}`);
  }
  return {
    id: p.id,
    title: p.title,
    price: p.price,
    image: p.images[0] ?? '',
  };
};

const itemA = () => cartLineFromDemoProduct(ONBOARDING_DEMO_PRODUCT_A_ID);

const itemB = () => cartLineFromDemoProduct(ONBOARDING_DEMO_PRODUCT_B_ID);

/** Приводит демо-корзину к ожидаемому для шага состоянию. */
export const ensureGuestCartState = (
  expectation: GuestCartExpectation,
): void => {
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
};

/** Ожидание корзины перед показом шага с индексом `stepIndex`. */
export const guestCartExpectationForStep = (
  stepIndex: number,
): GuestCartExpectation => {
  if (stepIndex <= 2) {
    return 'empty';
  }
  if (stepIndex <= 4) {
    return 'onlyA';
  }
  return 'both';
};
