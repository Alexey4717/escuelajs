import { CartState } from './types';

export const selectCartItemCount = (state: CartState): number =>
  state.items.length;

export const selectIsProductInCart =
  (productId: string) => (state: CartState) =>
    state.items.some((i) => i.id === productId);
