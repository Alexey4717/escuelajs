import { useCallback, useMemo } from 'react';

import { useLazyQuery } from '@apollo/client/react';

import { CategoriesDocument } from '@/shared/api/generated/graphql';
import { type ComboboxOption } from '@/shared/ui/Combobox/Combobox';

import { useFilterProductsStore } from '../../model/filter-products-store';

export function useCategoriesCombobox() {
  const categoryId = useFilterProductsStore((s) => s.categoryId);
  const setCategoryId = useFilterProductsStore((s) => s.setCategoryId);

  const [
    fetchCategories,
    { data: categoriesData, loading: categoriesLoading },
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
    () =>
      categoriesData?.categories.map((c) => ({
        value: c.id,
        label: c.name,
      })) ?? [],
    [categoriesData?.categories],
  );

  /** Base UI Combobox: `value` — это объект опции из `items`, не строка id. */
  const selectedCategoryOption = useMemo((): ComboboxOption<string> | null => {
    if (categoryId == null || categoryId === '') {
      return null;
    }
    return categoryOptions.find((o) => o.value === categoryId) ?? null;
  }, [categoryId, categoryOptions]);

  return {
    categoryOptions,
    selectedCategoryOption,
    categoriesLoading,
    onCategoriesOpenChange,
    setCategoryId,
  };
}
