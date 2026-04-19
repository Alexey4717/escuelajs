'use client';

import { createContext, useContext } from 'react';

import type { CartFlyContextValue } from './types';

export const CartFlyContext = createContext<CartFlyContextValue | null>(null);

export const useCartFlyOptional = (): CartFlyContextValue | null =>
  useContext(CartFlyContext);
