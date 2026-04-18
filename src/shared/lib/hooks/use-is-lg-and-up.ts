import { useSyncExternalStore } from 'react';

import { MEDIA_QUERIES } from '@/shared/config/consts';

/** Tailwind `lg` (shared breakpoint constant). */
const LG_MIN_QUERY = MEDIA_QUERIES.lgAndUp;

function subscribe(onStoreChange: () => void) {
  const mql = window.matchMedia(LG_MIN_QUERY);
  mql.addEventListener('change', onStoreChange);
  return () => mql.removeEventListener('change', onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(LG_MIN_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function useIsLgAndUp() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
