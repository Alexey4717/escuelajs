'use client';

import { createContext, useContext } from 'react';

import type { CartFlyContextValue } from './types';

export const CartFlyContext = createContext<CartFlyContextValue | null>(null);

export function useCartFlyOptional(): CartFlyContextValue | null {
  return useContext(CartFlyContext);
}
