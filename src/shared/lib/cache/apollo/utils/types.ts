import { type ApolloCache } from '@apollo/client';
import { type DocumentNode } from 'graphql';

type CacheEntityFields = Record<string, unknown>;

/** Объект с `id` (и при необходимости `__typename`) для `cache.identify`. */
export type CacheIdentifiableEntity = {
  __typename?: string;
  id: string;
};

export type UpdateEntityInCacheArgs = {
  cache: ApolloCache;
  typename: string;
  id: string | number;
  fields: CacheEntityFields;
  fallbackRootFieldName?: string;
};

export type EvictRootQueryFieldByArgsArgs = {
  cache: ApolloCache;
  fieldName: string;
  args?: Record<string, unknown>;
};

export type WriteEntityFragmentToCacheArgs<
  TEntity extends CacheIdentifiableEntity = CacheIdentifiableEntity,
> = {
  cache: ApolloCache;
  entity: TEntity;
  fragment: DocumentNode;
};
