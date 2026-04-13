import { CartState } from './types';

export function selectCartItemCount(state: CartState): number {
  return state.items.length;
}

export function selectIsProductInCart(productId: string) {
  return (state: CartState) => state.items.some((i) => i.id === productId);
}
