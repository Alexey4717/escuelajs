import type { QueryClient } from '@tanstack/react-query';

import { escuelaRestQueryKeys } from '@/shared/api/rest/query-keys';

/** Сбросить весь кеш клиента (осторожно: сотрёт и не-REST запросы). */
export function clearQueryCache(queryClient: QueryClient): void {
  queryClient.clear();
}

/** Инвалидация всех запросов к Escuela REST. */
export function invalidateEscuelaRest(queryClient: QueryClient) {
  return queryClient.invalidateQueries({
    queryKey: escuelaRestQueryKeys.root,
  });
}

export function invalidateEscuelaRestFiles(queryClient: QueryClient) {
  return queryClient.invalidateQueries({
    queryKey: escuelaRestQueryKeys.files.all(),
  });
}

export function invalidateEscuelaRestLocations(queryClient: QueryClient) {
  return queryClient.invalidateQueries({
    queryKey: escuelaRestQueryKeys.locations.all(),
  });
}
