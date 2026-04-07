'use client';

import { useCallback, useEffect } from 'react';

import type { ModalRegistryMap } from '@/shared/lib/modal/types';
import { useAppStore } from '@/shared/lib/store';

type DeleteCurrentUserModalProps = ModalRegistryMap['profileDelete'];

type UseDeleteCurrentUserModalOptions = {
  hydrateProps?: DeleteCurrentUserModalProps;
};

export function useDeleteCurrentUserModal(
  options?: UseDeleteCurrentUserModalOptions,
) {
  const openModal = useAppStore((state) => state.openModal);
  const closeModal = useAppStore((state) => state.closeModal);
  const isOpen = useAppStore((state) => state.openedModal === 'profileDelete');
  const rawProps = useAppStore((state) => state.modalPropsByKey.profileDelete);
  const typedRawProps = rawProps as DeleteCurrentUserModalProps | undefined;
  const hasResolvedProps =
    typeof typedRawProps?.email === 'string' &&
    typeof typedRawProps?.userId === 'string';

  const open = useCallback(
    (props: DeleteCurrentUserModalProps) => {
      openModal('profileDelete', props);
    },
    [openModal],
  );

  const hydrateIfMissing = useCallback(
    (props: DeleteCurrentUserModalProps) => {
      if (!isOpen || hasResolvedProps) return;
      openModal('profileDelete', props);
    },
    [hasResolvedProps, isOpen, openModal],
  );

  useEffect(() => {
    if (!options?.hydrateProps) return;
    hydrateIfMissing(options.hydrateProps);
  }, [hydrateIfMissing, options?.hydrateProps]);

  return {
    open,
    hydrateIfMissing,
    close: closeModal,
    isOpen,
  };
}
