'use client';

import { useCallback, useEffect } from 'react';

import { useAppStore } from '@/shared/lib/store';

import type { ProfileDeleteModalProps } from '../ui/components/ProfileDeleteModalContent';

type UseProfileDeleteModalOptions = {
  hydrateProps?: ProfileDeleteModalProps;
};

export function useProfileDeleteModal(options?: UseProfileDeleteModalOptions) {
  const openModal = useAppStore((state) => state.openModal);
  const closeModal = useAppStore((state) => state.closeModal);
  const isOpen = useAppStore((state) => state.openedModal === 'profileDelete');
  const rawProps = useAppStore((state) => state.modalPropsByKey.profileDelete);
  const hasResolvedProps =
    typeof (rawProps as { email?: unknown } | undefined)?.email === 'string';

  const open = useCallback(
    (props: ProfileDeleteModalProps) => {
      openModal('profileDelete', props);
    },
    [openModal],
  );

  const hydrateIfMissing = useCallback(
    (props: ProfileDeleteModalProps) => {
      if (!isOpen || hasResolvedProps) return;
      openModal('profileDelete', props);
    },
    [isOpen, hasResolvedProps, openModal],
  );

  useEffect(() => {
    if (!options?.hydrateProps) return;
    hydrateIfMissing(options.hydrateProps);
  }, [options?.hydrateProps, hydrateIfMissing]);

  return {
    open,
    hydrateIfMissing,
    close: closeModal,
    isOpen,
  };
}
