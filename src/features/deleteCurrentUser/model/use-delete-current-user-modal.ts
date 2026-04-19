'use client';

import { useCallback } from 'react';

import { useAppStore } from '@/shared/lib/store';
import type { ModalRegistryMap } from '@/shared/lib/store/slices/modal/types';

type DeleteCurrentUserModalProps = ModalRegistryMap['profileDelete'];
export const useDeleteCurrentUserModal = () => {
  const openModal = useAppStore((state) => state.openModal);
  const closeModal = useAppStore((state) => state.closeModal);
  const isOpen = useAppStore((state) => state.openedModal === 'profileDelete');

  const open = useCallback(
    (props: DeleteCurrentUserModalProps) => {
      openModal('profileDelete', props);
    },
    [openModal],
  );

  return {
    open,
    close: closeModal,
    isOpen,
  };
};
