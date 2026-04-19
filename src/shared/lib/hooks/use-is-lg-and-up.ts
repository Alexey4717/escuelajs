import { useSyncExternalStore } from 'react';

import { MEDIA_QUERIES } from '@/shared/config/consts';

/** Tailwind `lg` (shared breakpoint constant). */
const LG_MIN_QUERY = MEDIA_QUERIES.lgAndUp;

const subscribe = (onStoreChange: () => void) => {
  const mql = window.matchMedia(LG_MIN_QUERY);
  mql.addEventListener('change', onStoreChange);
  return () => mql.removeEventListener('change', onStoreChange);
};

const getSnapshot = () => window.matchMedia(LG_MIN_QUERY).matches;

const getServerSnapshot = () => false;

export const useIsLgAndUp = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
