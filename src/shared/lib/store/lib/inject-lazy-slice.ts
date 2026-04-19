import type { StoreApi } from 'zustand';

import type { AppStore } from '../model/app-store';
import { useAppStore } from '../model/app-store';

const pending = new Map<string, Promise<void>>();

/**
 * Ленивая подгрузка куска состояния (аналог injectReducer в Redux).
 * Модуль слайса экспортирует `applySlice`, который через `api.setState`
 * добавляет поля и экшены в корневой стор.
 *
 * @example
 * ```ts
 * // entities/cart/model/apply-cart-slice.ts
 * import type { StoreApi } from 'zustand';
 * import type { AppStore } from '@/shared/lib/store';
 *
 * export function applyCartSlice(api: StoreApi<AppStore & CartSlice>) {
 *   api.setState((s) => ({ ...s, items: [], addItem: (x) => ... }));
 * }
 *
 * // В клиентском компоненте страницы корзины:
 * await ensureLazySlice('cart', () =>
 *   import('@/entities/cart/model/apply-cart-slice').then((m) => ({
 *     applySlice: m.applyCartSlice,
 *   })),
 * );
 * ```
 */
export const ensureLazySlice = (
  name: string,
  loader: () => Promise<{
    applySlice: (api: StoreApi<AppStore>) => void;
  }>,
): Promise<void> => {
  const cached = pending.get(name);
  if (cached) return cached;

  const promise = loader().then(({ applySlice }) => {
    applySlice(useAppStore);
  });
  pending.set(name, promise);
  return promise;
};
