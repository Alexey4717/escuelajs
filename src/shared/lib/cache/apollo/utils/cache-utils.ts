import type { ApolloCache } from '@apollo/client';

import { ROOT_QUERY_ID } from './constants';
import type {
  EvictRootQueryFieldByArgsArgs,
  UpdateEntityInCacheArgs,
  WriteEntityFragmentToCacheArgs,
} from './types';

/** Удаляет поле из ROOT_QUERY и запускает сборку мусора кеша. */
export const evictRootQueryField = (
  cache: ApolloCache,
  fieldName: string,
): void => {
  cache.evict({ id: ROOT_QUERY_ID, fieldName });
  cache.gc();
};

/** Удаляет поле из ROOT_QUERY с аргументами и запускает сборку мусора кеша. */
export const evictRootQueryFieldByArgs = ({
  cache,
  fieldName,
  args,
}: EvictRootQueryFieldByArgsArgs): void => {
  cache.evict({ id: ROOT_QUERY_ID, fieldName, args });
  cache.gc();
};

/**
 * Обновляет кеш сущности через cache.modify.
 * Если сущность не найдена, опционально инвалидирует указанный ROOT_QUERY field.
 */
export const updateEntityInCache = ({
  cache,
  typename,
  id,
  fields,
  fallbackRootFieldName,
}: UpdateEntityInCacheArgs): boolean => {
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
};

/**
 * Пишет в кеш данные фрагмента для нормализованной сущности (`identify` + `writeFragment`).
 * @returns `false`, если `cache.identify` не смог построить id (сущность ещё не в кеше).
 */
export const writeEntityFragmentToCache = <
  TEntity extends WriteEntityFragmentToCacheArgs['entity'],
>({
  cache,
  entity,
  fragment,
}: WriteEntityFragmentToCacheArgs<TEntity>): boolean => {
  const cacheId = cache.identify(entity);
  if (!cacheId) {
    return false;
  }

  cache.writeFragment({
    id: cacheId,
    fragment,
    data: entity,
  });

  return true;
};
