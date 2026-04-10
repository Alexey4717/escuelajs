'use client';

import { useCallback } from 'react';

import type { ModalRegistryMap } from '@/shared/lib/modal/types';
import { useAppStore } from '@/shared/lib/store';

type DeleteCategoryModalProps = ModalRegistryMap['categoryDelete'];

export function useDeleteCategoryModal() {
  const openModal = useAppStore((state) => state.openModal);
  const closeModal = useAppStore((state) => state.closeModal);

  const open = useCallback(
    (props: DeleteCategoryModalProps) => {
      openModal('categoryDelete', props);
    },
    [openModal],
  );

  return {
    open,
    close: closeModal,
  };
}
