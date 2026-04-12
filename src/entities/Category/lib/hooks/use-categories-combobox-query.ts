'use client';

import { useCallback, useMemo } from 'react';

import { useLazyQuery } from '@apollo/client/react';

import { CategoriesDocument } from '@/shared/api/generated/graphql';
import type { ComboboxOption } from '@/shared/ui/Combobox/Combobox';

/**
 * Ленивая загрузка списка категорий при открытии комбобокса (общий запрос для фильтра и форм).
 */
export function useCategoriesComboboxQuery() {
  const [
    fetchCategories,
    { data: categoriesData, loading: categoriesLoading, called },
  ] = useLazyQuery(CategoriesDocument, {
    fetchPolicy: 'cache-first',
  });

  const onCategoriesOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        void fetchCategories();
      }
    },
    [fetchCategories],
  );

  const categoryOptions = useMemo(
    (): ComboboxOption<string>[] =>
      categoriesData?.categories.map((c) => ({
        value: c.id,
        label: c.name,
      })) ?? [],
    [categoriesData?.categories],
  );

  return {
    categoryOptions,
    categoriesLoading,
    categoriesQueryCalled: called,
    onCategoriesOpenChange,
    fetchCategories,
  };
}
