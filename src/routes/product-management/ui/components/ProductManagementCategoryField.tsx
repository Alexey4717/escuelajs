'use client';

import { memo } from 'react';

import { cn } from '@/shared/lib/styles/cn';

import { useCategoriesComboboxQuery } from '@/entities/Category';

import { ProductCategoryIdField } from '../../lib/form/fields';

function ProductManagementCategoryFieldInner() {
  const { categoryOptions, categoriesLoading, onCategoriesOpenChange } =
    useCategoriesComboboxQuery();

  return (
    <div className="min-w-0 [&_[data-slot=field-label]]:!mb-0">
      <ProductCategoryIdField
        options={categoryOptions}
        onOpenChange={onCategoriesOpenChange}
        showClear
        emptyText="No categories found"
        listLoading={categoriesLoading && categoryOptions.length === 0}
        triggerClassName={cn(
          'w-full min-w-0 !h-[38px] min-h-[38px] max-h-[38px] shrink-0 rounded-md border border-border bg-muted dark:bg-input/30',
        )}
      />
    </div>
  );
}

export const ProductManagementCategoryField = memo(
  ProductManagementCategoryFieldInner,
);

ProductManagementCategoryField.displayName = 'ProductManagementCategoryField';
