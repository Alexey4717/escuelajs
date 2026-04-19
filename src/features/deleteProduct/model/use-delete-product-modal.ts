'use client';

import { useCallback } from 'react';

import { useAppStore } from '@/shared/lib/store';
import type { ModalRegistryMap } from '@/shared/lib/store/slices/modal/types';

type DeleteProductModalProps = ModalRegistryMap['productDelete'];
export const useDeleteProductModal = () => {
  const openModal = useAppStore((state) => state.openModal);
  const closeModal = useAppStore((state) => state.closeModal);
  const isOpen = useAppStore((state) => state.openedModal === 'productDelete');

  const open = useCallback(
    (props: DeleteProductModalProps) => {
      openModal('productDelete', props);
    },
    [openModal],
  );

  return {
    open,
    close: closeModal,
    isOpen,
  };
};
