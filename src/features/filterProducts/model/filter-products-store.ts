import { create } from 'zustand';

import { FILTER_PRICE_SLIDER_MAX, FILTER_PRICE_SLIDER_MIN } from './constants';

export type FilterProductsState = {
  title: string;
  categoryId: string | null;
  priceMin: number;
  priceMax: number;
  setTitle: (title: string) => void;
  setCategoryId: (categoryId: string | null) => void;
  setPriceRange: (priceMin: number, priceMax: number) => void;
  reset: () => void;
};

const initialState = {
  title: '',
  categoryId: null,
  priceMin: FILTER_PRICE_SLIDER_MIN,
  priceMax: FILTER_PRICE_SLIDER_MAX,
} as const;

export const useFilterProductsStore = create<FilterProductsState>((set) => ({
  ...initialState,
  setTitle: (title) => set({ title }),
  setCategoryId: (categoryId) => set({ categoryId }),
  setPriceRange: (priceMin, priceMax) => set({ priceMin, priceMax }),
  reset: () => set({ ...initialState }),
}));
