import { useMemo } from 'react';

import { type ComboboxOption } from '@/shared/ui/Combobox/Combobox';

import { useCategoriesComboboxQuery } from '@/entities/Category';

import { useFilterProductsStore } from '../../model/filter-products-store';

export function useCategoriesCombobox() {
  const categoryId = useFilterProductsStore((s) => s.categoryId);
  const setCategoryId = useFilterProductsStore((s) => s.setCategoryId);

  const { categoryOptions, categoriesLoading, onCategoriesOpenChange } =
    useCategoriesComboboxQuery();

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
