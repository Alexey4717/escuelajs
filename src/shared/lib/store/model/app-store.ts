import { create } from 'zustand';

import {
  createScrollSlice,
  type ScrollSlice,
} from '../slices/scroll/create-scroll-slice';
import {
  createSessionSlice,
  type SessionSlice,
} from '../slices/session/create-session-slice';

/** Корневой тип стора; при добавлении ленивых слайсов расширяется через пересечение типов. */
export type AppStore = SessionSlice & ScrollSlice;

export const useAppStore = create<AppStore>()((...args) => ({
  ...createSessionSlice(...args),
  ...createScrollSlice(...args),
}));
