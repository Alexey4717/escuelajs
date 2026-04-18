import type { StateCreator } from 'zustand';

export interface ScrollSlice {
  /** Пиксельный скролл viewport — обновляет `Page`, хватает для обычных списков */
  scrollByPath: Record<string, number>;
  setScrollPosition: (path: string, position: number) => void;
}

export const createScrollSlice: StateCreator<
  ScrollSlice,
  [],
  [],
  ScrollSlice
> = (set) => ({
  scrollByPath: {},
  setScrollPosition: (path, position) =>
    set((state) => ({
      scrollByPath: { ...state.scrollByPath, [path]: position },
    })),
});
