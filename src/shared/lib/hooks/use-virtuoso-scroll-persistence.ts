'use client';

import { useCallback } from 'react';

import type { GridStateSnapshot } from 'react-virtuoso';

import { useAppStore } from '@/shared/lib/store';

/**
 * Только для списков на Virtuoso (сетка/лист с `customScrollParent`).
 *
 * Пиксели скролла (`scrollByPath`) уже пишет {@link Page} по событию `scroll` на
 * viewport — отдельно вызывать `setScrollPosition` из `stateChanged` не нужно.
 *
 * Снимок Virtuoso нужен дополнительно: в нём не только `scrollTop`, но и размеры
 * ячеек/viewport, без чего после возврата на страницу список может сброситься.
 */
export function useVirtuosoScrollPersistence(pathname: string) {
  const gridSnapshot = useAppStore((s) => s.virtuosoGridByPath[pathname]);
  const setVirtuosoGridState = useAppStore((s) => s.setVirtuosoGridState);

  const onGridStateChanged = useCallback(
    (state: GridStateSnapshot) => {
      setVirtuosoGridState(pathname, state);
    },
    [pathname, setVirtuosoGridState],
  );

  return {
    /** Передайте в `restoreStateFrom` у Virtuoso */
    restoreStateFrom: gridSnapshot ?? undefined,
    /** Передайте в `stateChanged` у Virtuoso */
    onGridStateChanged,
  };
}
