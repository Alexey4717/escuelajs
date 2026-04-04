'use client';

import { createContext, useContext } from 'react';

import type { CarouselContextValue } from '../types';

export const CarouselContext = createContext<CarouselContextValue | null>(null);

export function useCarousel() {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}
