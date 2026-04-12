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
      Вы действительно хотите удалить товар{' '}
      <strong className="text-foreground">{productTitle}</strong>? Это действие
      необратимо.
    </Typography>
  );
}
