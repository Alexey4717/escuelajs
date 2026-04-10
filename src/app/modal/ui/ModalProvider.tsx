'use client';

import { type ReactNode } from 'react';

import { useIsMobileWithServerSnapshot } from '@/shared/lib/hooks/use-mobile';

import { ModalHost } from './ModalHost';

interface ModalProviderProps {
  children: ReactNode;
  initialIsMobile: boolean;
}

export function ModalProvider({
  children,
  initialIsMobile,
}: ModalProviderProps) {
  const resolvedIsMobile = useIsMobileWithServerSnapshot(initialIsMobile);

  return (
    <>
      {children}
      <ModalHost isMobile={resolvedIsMobile} />
    </>
  );
}
