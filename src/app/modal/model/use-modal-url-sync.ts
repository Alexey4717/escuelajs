'use client';

import { useEffect, useRef } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type { ModalKey } from '@/shared/lib/modal/types';
import { useAppStore } from '@/shared/lib/store';

import { isModalKey } from './modal-registry';

const OPENED_MODAL_PARAM = 'openedModal';

export function useModalUrlSync() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const openedModal = useAppStore((state) => state.openedModal);
  const openModal = useAppStore((state) => state.openModal);
  const closeModal = useAppStore((state) => state.closeModal);
  const search = searchParams.toString();
  const pendingUrlOpenRef = useRef<ModalKey | null>(null);

  useEffect(() => {
    const queryValue = searchParams.get(OPENED_MODAL_PARAM);
    const queryModal = isModalKey(queryValue) ? queryValue : null;
    const currentModal = useAppStore.getState().openedModal;

    if (queryModal && currentModal !== queryModal) {
      pendingUrlOpenRef.current = queryModal;
      openModal(queryModal);
      return;
    }

    if (!queryModal && currentModal) {
      closeModal();
    }
  }, [search, searchParams, openModal, closeModal]);

  useEffect(() => {
    if (pendingUrlOpenRef.current) {
      if (openedModal === pendingUrlOpenRef.current) {
        pendingUrlOpenRef.current = null;
      }
      return;
    }

    const queryValue = searchParams.get(OPENED_MODAL_PARAM);
    const queryModal = isModalKey(queryValue) ? queryValue : null;

    if (queryModal === openedModal) return;

    const next = new URLSearchParams(searchParams.toString());
    if (openedModal && isModalKey(openedModal)) {
      next.set(OPENED_MODAL_PARAM, openedModal);
    } else {
      next.delete(OPENED_MODAL_PARAM);
    }

    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }, [pathname, router, search, searchParams, openedModal]);
}
