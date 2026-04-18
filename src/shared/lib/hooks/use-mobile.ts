import { useSyncExternalStore } from 'react';

import { MEDIA_QUERIES } from '@/shared/config/consts';

const QUERY = MEDIA_QUERIES.mobileOnly;

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function subscribe(onStoreChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', onStoreChange);
  return () => mql.removeEventListener('change', onStoreChange);
}

export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function useIsMobileWithServerSnapshot(serverSnapshot: boolean) {
  return useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
}
