import { useSyncExternalStore } from 'react';

/** Tailwind `lg` (1024px). */
const LG_MIN_QUERY = '(min-width: 1024px)';

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
