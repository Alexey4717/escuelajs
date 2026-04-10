import { type ApolloCache } from '@apollo/client';

type CacheEntityFields = Record<string, unknown>;

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
