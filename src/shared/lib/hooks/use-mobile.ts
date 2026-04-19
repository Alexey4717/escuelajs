import { useSyncExternalStore } from 'react';

import { MEDIA_QUERIES } from '@/shared/config/consts';

const QUERY = MEDIA_QUERIES.mobileOnly;

const getSnapshot = () => window.matchMedia(QUERY).matches;

const subscribe = (onStoreChange: () => void) => {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', onStoreChange);
  return () => mql.removeEventListener('change', onStoreChange);
};

export const useIsMobile = () =>
  useSyncExternalStore(subscribe, getSnapshot, () => false);

export const useIsMobileWithServerSnapshot = (serverSnapshot: boolean) =>
  useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
