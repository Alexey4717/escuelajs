import { useSyncExternalStore } from 'react';

/**
 * `true` только в браузере после гидратации; на сервере и при первом проходе гидратации — `false`.
 * Нужен, чтобы не расходился HTML с persist/localStorage и другим состоянием, недоступным на SSR.
 */
export const useIsClient = (): boolean =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
