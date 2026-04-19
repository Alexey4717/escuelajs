'use client';

import Link from 'next/link';

import { pagesPath } from '@/shared/config/routes/$path';
import { ONBOARDING_TARGET_IDS } from '@/shared/lib/onboarding';
import { Button } from '@/shared/ui/Button/Button';

interface CategoryManagementFormActionsProps {
  submitLabel: string;
  submitLoading: boolean;
  imagesUploadLoading: boolean;
  submitDisabled?: boolean;
}

export const CategoryManagementFormActions = ({
  submitLabel,
  submitLoading,
  imagesUploadLoading,
  submitDisabled = false,
}: CategoryManagementFormActionsProps) => {
  const busy = imagesUploadLoading || submitLoading;

  return (
    <div className="flex align-center justify-between gap-2 pt-2">
      <Button
        type="button"
        variant="outline"
        asChild
        className="w-full sm:w-auto"
      >
        <Link href={pagesPath.categories.$url().path}>Back to categories</Link>
      </Button>
      <Button
        type="submit"
        className="w-full sm:w-auto"
        loading={busy}
        disabled={submitDisabled}
        data-testid="categoryForm__button__submit"
        data-onboarding={ONBOARDING_TARGET_IDS.categoryCreateSubmitButton}
      >
        {imagesUploadLoading
          ? 'Uploading images…'
          : submitLoading
            ? `${submitLabel}…`
            : submitLabel}
      </Button>
    </div>
  );
};
