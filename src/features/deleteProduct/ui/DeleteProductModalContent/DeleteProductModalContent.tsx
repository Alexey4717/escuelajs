'use client';

import type { ModalRegistryMap } from '@/shared/lib/store/slices/modal/types';
import { Typography } from '@/shared/ui/Typography/Typography';

type DeleteProductModalContentProps = ModalRegistryMap['productDelete'] & {
  closeModal: () => void;
};

export function DeleteProductModalContent({
  productTitle,
}: DeleteProductModalContentProps) {
  return (
    <Typography variant="body2" component="p" className="text-muted-foreground">
      Are you sure you want to delete product{' '}
      <strong className="text-foreground">{productTitle}</strong>? This action
      cannot be undone.
    </Typography>
  );
}
