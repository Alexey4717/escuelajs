'use client';

import type { ModalRegistryMap } from '@/shared/lib/store/slices/modal/types';
import { Spinner } from '@/shared/ui/Spinner/Spinner';
import { Typography } from '@/shared/ui/Typography/Typography';

import { useDeleteCategoryProductsGuard } from '../../api/use-delete-category-products-guard';

type DeleteCategoryModalContentProps = ModalRegistryMap['categoryDelete'] & {
  closeModal: () => void;
};
export const DeleteCategoryModalContent = ({
  categoryId,
  categoryName,
}: DeleteCategoryModalContentProps) => {
  const { loading, error, hasProducts, guardReady } =
    useDeleteCategoryProductsGuard(categoryId);

  if (loading) {
    return (
      <div className="flex min-h-[4.5rem] items-center justify-center py-2">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (error) {
    return (
      <Typography
        variant="body2"
        component="p"
        className="text-muted-foreground"
      >
        Failed to verify whether this category still contains products. Please
        try again later.
      </Typography>
    );
  }

  if (guardReady && hasProducts) {
    return (
      <Typography
        variant="body2"
        component="p"
        className="text-muted-foreground"
      >
        Category <strong className="text-foreground">{categoryName}</strong>{' '}
        cannot be deleted because it still contains products. Remove all
        products in this category first, then try again.
      </Typography>
    );
  }

  return (
    <Typography variant="body2" component="p" className="text-muted-foreground">
      Are you sure you want to delete category{' '}
      <strong className="text-foreground">{categoryName}</strong>? This action
      cannot be undone.
    </Typography>
  );
};
