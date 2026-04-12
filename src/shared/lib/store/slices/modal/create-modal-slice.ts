import type { StateCreator } from 'zustand';

import type { ModalKey, ModalRegistryMap } from './types';

export interface ModalSlice {
  openedModal: ModalKey | null;
  modalPropsByKey: Record<string, unknown>;
  openModal: <K extends ModalKey>(
    modalKey: K,
    props?: ModalRegistryMap[K],
  ) => void;
  closeModal: () => void;
}

export const createModalSlice: StateCreator<ModalSlice, [], [], ModalSlice> = (
  set,
) => ({
  openedModal: null,
  modalPropsByKey: {},
  openModal: (modalKey, props) =>
    set((state) => {
      const nextProps =
        props === undefined
          ? state.modalPropsByKey
          : { ...state.modalPropsByKey, [modalKey]: props };

      return {
        openedModal: modalKey,
        modalPropsByKey: nextProps,
      };
    }),
  closeModal: () =>
    set((state) => {
      if (!state.openedModal) {
        return {
          openedModal: null,
        };
      }

      const nextProps = { ...state.modalPropsByKey };
      delete nextProps[state.openedModal];

      return {
        openedModal: null,
        modalPropsByKey: nextProps,
      };
    }),
});
