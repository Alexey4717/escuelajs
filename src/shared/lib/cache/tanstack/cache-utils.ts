import type { QueryClient } from '@tanstack/react-query';

import { escuelaRestQueryKeys } from '@/shared/api/rest/query-keys';

/** Сбросить весь кеш клиента (осторожно: сотрёт и не-REST запросы). */
export const clearQueryCache = (queryClient: QueryClient): void => {
  queryClient.clear();
};

/** Инвалидация всех запросов к Escuela REST. */
export const invalidateEscuelaRest = (queryClient: QueryClient) =>
  queryClient.invalidateQueries({
    queryKey: escuelaRestQueryKeys.root,
  });

export const invalidateEscuelaRestFiles = (queryClient: QueryClient) =>
  queryClient.invalidateQueries({
    queryKey: escuelaRestQueryKeys.files.all(),
  });

export const invalidateEscuelaRestLocations = (queryClient: QueryClient) =>
  queryClient.invalidateQueries({
    queryKey: escuelaRestQueryKeys.locations.all(),
  });
