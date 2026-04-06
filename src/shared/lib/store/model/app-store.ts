import { create } from 'zustand';

import {
  createModalSlice,
  type ModalSlice,
} from '../slices/modal/create-modal-slice';
import {
  createScrollSlice,
  type ScrollSlice,
} from '../slices/scroll/create-scroll-slice';
import {
  createSessionSlice,
  type SessionSlice,
} from '../slices/session/create-session-slice';

/** Корневой тип стора; при добавлении ленивых слайсов расширяется через пересечение типов. */
export type AppStore = SessionSlice & ScrollSlice & ModalSlice;

export const useAppStore = create<AppStore>()((...args) => ({
  ...createSessionSlice(...args),
  ...createScrollSlice(...args),
  ...createModalSlice(...args),
}));
