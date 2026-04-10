import type { ApolloCache } from '@apollo/client';

import { ROOT_QUERY_ID } from './constants';
import type {
  EvictRootQueryFieldByArgsArgs,
  UpdateEntityInCacheArgs,
} from './types';

/** Удаляет поле из ROOT_QUERY и запускает сборку мусора кеша. */
export function evictRootQueryField(
  cache: ApolloCache,
  fieldName: string,
): void {
  cache.evict({ id: ROOT_QUERY_ID, fieldName });
  cache.gc();
}

/** Удаляет поле из ROOT_QUERY с аргументами и запускает сборку мусора кеша. */
export function evictRootQueryFieldByArgs({
  cache,
  fieldName,
  args,
}: EvictRootQueryFieldByArgsArgs): void {
  cache.evict({ id: ROOT_QUERY_ID, fieldName, args });
  cache.gc();
}

/**
 * Обновляет кеш сущности через cache.modify.
 * Если сущность не найдена, опционально инвалидирует указанный ROOT_QUERY field.
 */
export function updateEntityInCache({
  cache,
  typename,
  id,
  fields,
  fallbackRootFieldName,
}: UpdateEntityInCacheArgs): boolean {
  const entityCacheId = cache.identify({
    __typename: typename,
    id,
  });

  if (!entityCacheId) {
    if (fallbackRootFieldName) {
      evictRootQueryFieldByArgs({
        cache,
        fieldName: fallbackRootFieldName,
        args: { id },
      });
    }
    return false;
  }

  const apolloFields = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, () => value]),
  );

  cache.modify({
    id: entityCacheId,
    fields: apolloFields,
  });

  return true;
}
