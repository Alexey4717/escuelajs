'use client';

import Link from 'next/link';

import { pagesPath } from '@/shared/routes/$path';
import { Button } from '@/shared/ui/Button/Button';

interface CategoryManagementFormActionsProps {
  submitLabel: string;
  submitLoading: boolean;
}

export const CategoryManagementFormActions = ({
  submitLabel,
  submitLoading,
}: CategoryManagementFormActionsProps) => (
  <div className="flex align-center justify-between gap-2 pt-2">
    <Button
      type="button"
      variant="outline"
      asChild
      className="w-full sm:w-auto"
    >
      <Link href={pagesPath.categories.$url().path}>К списку категорий</Link>
    </Button>
    <Button
      type="submit"
      className="w-full sm:w-auto"
      loading={submitLoading}
      data-testid="categoryForm__button__submit"
    >
      {submitLabel}
    </Button>
  </div>
);
