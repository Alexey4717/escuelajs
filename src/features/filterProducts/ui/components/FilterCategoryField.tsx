import { memo } from 'react';

import { cn } from '@/shared/lib/styles/cn';
import { Combobox, type ComboboxOption } from '@/shared/ui/Combobox/Combobox';

import { useCategoriesCombobox } from '../../lib/hooks/use-categories-combobox';

function FilterCategoryFieldInner() {
  const {
    categoryOptions,
    selectedCategoryOption,
    categoriesLoading,
    onCategoriesOpenChange,
    setCategoryId,
  } = useCategoriesCombobox();

  return (
    <div className="min-w-0 [&_[data-slot=field-label]]:!mb-0">
      <Combobox<string>
        label="Category"
        placeholder="Select category…"
        options={categoryOptions}
        value={selectedCategoryOption}
        onValueChange={(item) => {
          const opt = item as ComboboxOption<string> | null;
          setCategoryId(opt?.value != null ? String(opt.value) : null);
        }}
        showClear
        emptyText="No categories found"
        listLoading={categoriesLoading && categoryOptions.length === 0}
        onOpenChange={onCategoriesOpenChange}
        triggerClassName={cn(
          'w-full min-w-0 !h-[38px] min-h-[38px] max-h-[38px] shrink-0 rounded-md border border-border bg-muted dark:bg-input/30',
        )}
      />
    </div>
  );
}

export const FilterCategoryField = memo(FilterCategoryFieldInner);
