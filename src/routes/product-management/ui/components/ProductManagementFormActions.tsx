'use client';

import Link from 'next/link';

import { pagesPath } from '@/shared/routes/$path';
import { Button } from '@/shared/ui/Button/Button';

interface ProductManagementFormActionsProps {
  submitLabel: string;
  submitLoading: boolean;
}

export const ProductManagementFormActions = ({
  submitLabel,
  submitLoading,
}: ProductManagementFormActionsProps) => (
  <div className="flex align-center justify-between gap-2 pt-2">
    <Button
      type="button"
      variant="outline"
      asChild
      className="w-full sm:w-auto"
    >
      <Link href={pagesPath.products.$url().path}>К списку товаров</Link>
    </Button>
    <Button
      type="submit"
      className="w-full sm:w-auto"
      loading={submitLoading}
      data-testid="productForm__button__submit"
    >
      {submitLabel}
    </Button>
  </div>
);
