'use client';

import { useCallback } from 'react';

import { useAppStore } from '@/shared/lib/store';
import type { ModalRegistryMap } from '@/shared/lib/store/slices/modal/types';

type PickupPointMapModalProps = ModalRegistryMap['pickupPointMap'];

export const usePickupPointMapModal = () => {
  const openModal = useAppStore((state) => state.openModal);
  const closeModal = useAppStore((state) => state.closeModal);

  const open = useCallback(
    (props: PickupPointMapModalProps) => {
      openModal('pickupPointMap', props);
    },
    [openModal],
  );

  return {
    open,
    close: closeModal,
  };
};
