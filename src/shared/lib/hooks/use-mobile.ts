import { useSyncExternalStore } from 'react';

const MOBILE_BREAKPOINT = 768;
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

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
