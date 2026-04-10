'use client';

import { useCallback } from 'react';

import type { ModalRegistryMap } from '@/shared/lib/modal/types';
import { useAppStore } from '@/shared/lib/store';

type DeleteProductModalProps = ModalRegistryMap['productDelete'];

export function useDeleteProductModal() {
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
}
