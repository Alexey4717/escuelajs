'use client';

import { type ReactNode, useLayoutEffect } from 'react';

import { useAppStore } from '@/shared/lib/store';

interface SessionHydrationProps {
  userId: string | null;
  children: ReactNode;
}

/**
 * Пробрасывает id пользователя с сервера в клиентский Zustand, чтобы не тащить пропсы глубоко вниз.
 * useLayoutEffect — чтобы не мутировать глобальный стор во время SSR и обновить состояние до отрисовки на клиенте.
 */
export function SessionHydration({ userId, children }: SessionHydrationProps) {
  const setCurrentUserId = useAppStore((s) => s.setCurrentUserId);

  useLayoutEffect(() => {
    setCurrentUserId(userId);
  }, [userId, setCurrentUserId]);

  return children;
}
