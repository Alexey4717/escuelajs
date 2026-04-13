'use client';

import { useMemo } from 'react';

import { useQuery } from '@apollo/client/react';

import {
  ProductsDocument,
  type ProductsQueryVariables,
} from '@/shared/api/generated/graphql';

function categoryIdToFloat(categoryId: string): number | null {
  const n = Number(categoryId);
  return Number.isFinite(n) ? n : null;
}

/**
 * Проверяет, есть ли товары в категории перед удалением: запрашивает список
 * продуктов с `limit: 1` по `categoryId`. Нужен, чтобы UI мог заблокировать
 * удаление или показать предупреждение, пока в категории остались товары.
 */
export function useDeleteCategoryProductsGuard(categoryId: string) {
  const categoryIdFloat = useMemo(
    () => categoryIdToFloat(categoryId),
    [categoryId],
  );

  const invalidCategoryId = categoryIdFloat == null;

  const variables = useMemo(
    () =>
      ({
        limit: 1,
        offset: 0,
        categoryId: categoryIdFloat,
      }) as ProductsQueryVariables,
    [categoryIdFloat],
  );

  const { data, loading, error } = useQuery(ProductsDocument, {
    variables,
    skip: invalidCategoryId,
    fetchPolicy: 'no-cache',
  });

  const queryError = invalidCategoryId ? true : Boolean(error);

  const hasProducts =
    !invalidCategoryId &&
    !loading &&
    !error &&
    (data?.products?.length ?? 0) > 0;

  const guardReady = !invalidCategoryId && !loading && !error && data != null;

  return {
    loading: invalidCategoryId ? false : loading,
    error: queryError,
    hasProducts,
    /** Запрос завершился успешно, можно решать, показывать ли удаление */
    guardReady,
  };
}
