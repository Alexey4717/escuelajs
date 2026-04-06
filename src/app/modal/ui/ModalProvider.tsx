'use client';

import { type ReactNode } from 'react';

import { useIsMobileWithServerSnapshot } from '@/shared/lib/hooks/use-mobile';

import { useModalUrlSync } from '../model/use-modal-url-sync';
import { ModalHost } from './ModalHost';

type ModalProviderProps = {
  children: ReactNode;
  initialIsMobile: boolean;
};

export function ModalProvider({
  children,
  initialIsMobile,
}: ModalProviderProps) {
  const resolvedIsMobile = useIsMobileWithServerSnapshot(initialIsMobile);

  useModalUrlSync();

  return (
    <>
      {children}
      <ModalHost isMobile={resolvedIsMobile} />
    </>
  );
}
