'use client';

import { useCallback, useEffect, useMemo } from 'react';

import { useLazyQuery } from '@apollo/client/react';

import { CategoriesDocument } from '@/shared/api/generated/graphql';
import type { ComboboxOption } from '@/shared/ui/Combobox/Combobox';

export interface UseCategoriesComboboxQueryOptions {
  /**
   * Если задано, список категорий подгружается при монтировании (из кэша Apollo или сети),
   * чтобы после ре-монта родителя combobox не терял подпись выбранной опции.
   */
  selectedCategoryId?: string | null;
}

export const useCategoriesComboboxQuery = (
  options?: UseCategoriesComboboxQueryOptions,
) => {
  const selectedCategoryId = options?.selectedCategoryId;

  const [
    fetchCategories,
    { data: categoriesData, loading: categoriesLoading, called },
  ] = useLazyQuery(CategoriesDocument, {
    fetchPolicy: 'cache-first',
  });

  useEffect(() => {
    if (selectedCategoryId == null || selectedCategoryId === '') {
      return;
    }
    void fetchCategories();
  }, [selectedCategoryId, fetchCategories]);

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
};
