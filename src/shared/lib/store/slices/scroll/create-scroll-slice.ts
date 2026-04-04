import type { GridStateSnapshot } from 'react-virtuoso';
import type { StateCreator } from 'zustand';

export interface ScrollSlice {
  /** Пиксельный скролл viewport — обновляет `Page`, хватает для обычных списков */
  scrollByPath: Record<string, number>;
  /**
   * Только для маршрутов с Virtuoso: полный снимок (scrollTop + gap/item/viewport).
   * Без этого после ремаунта виртуализатор теряет измерения.
   */
  virtuosoGridByPath: Record<string, GridStateSnapshot>;
  setScrollPosition: (path: string, position: number) => void;
  setVirtuosoGridState: (
    path: string,
    snapshot: GridStateSnapshot | null,
  ) => void;
}

export const createScrollSlice: StateCreator<
  ScrollSlice,
  [],
  [],
  ScrollSlice
> = (set) => ({
  scrollByPath: {},
  virtuosoGridByPath: {},
  setScrollPosition: (path, position) =>
    set((state) => ({
      scrollByPath: { ...state.scrollByPath, [path]: position },
    })),
  setVirtuosoGridState: (path, snapshot) =>
    set((state) => {
      if (snapshot === null) {
        const next = { ...state.virtuosoGridByPath };
        delete next[path];
        return { virtuosoGridByPath: next };
      }
      return {
        virtuosoGridByPath: { ...state.virtuosoGridByPath, [path]: snapshot },
      };
    }),
});
