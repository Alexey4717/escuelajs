import { create } from 'zustand';

import {
  createSessionSlice,
  type SessionSlice,
} from '../slices/session/create-session-slice';

/** Корневой тип стора; при добавлении ленивых слайсов расширяется через пересечение типов. */
export type AppStore = SessionSlice;

export const useAppStore = create<AppStore>()((...args) => ({
  ...createSessionSlice(...args),
}));
