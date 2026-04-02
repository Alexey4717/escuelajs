import type { StateCreator } from 'zustand';

export interface SessionSlice {
  currentUserId: string | null;
  setCurrentUserId: (id: string | null) => void;
}

export const createSessionSlice: StateCreator<
  SessionSlice,
  [],
  [],
  SessionSlice
> = (set) => ({
  currentUserId: null,
  setCurrentUserId: (id) => set({ currentUserId: id }),
});
