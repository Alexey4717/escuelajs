import { environmentManager, QueryClient } from '@tanstack/react-query';

import { makeQueryClient } from './make-query-client';

/**
 * Один инстанс на вкладку в браузере; на сервере — новый на запрос (Next.js RSC / SSR).
 * Используйте в `QueryProvider` и при prefetch в Server Components (см. advanced-ssr).
 * @see https://tanstack.com/query/v5/docs/framework/react/guides/advanced-ssr
 */
let browserQueryClient: QueryClient | undefined;

export const getQueryClient = (): QueryClient => {
  if (environmentManager.isServer()) {
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
};
