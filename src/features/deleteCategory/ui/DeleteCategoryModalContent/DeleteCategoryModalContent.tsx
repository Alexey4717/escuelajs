'use client';

import type { ModalRegistryMap } from '@/shared/lib/modal/types';
import { Typography } from '@/shared/ui/Typography/Typography';

type DeleteCategoryModalContentProps = ModalRegistryMap['categoryDelete'] & {
  closeModal: () => void;
};

export function DeleteCategoryModalContent({
  categoryName,
}: DeleteCategoryModalContentProps) {
  return (
    <Typography variant="body2" component="p" className="text-muted-foreground">
      Вы действительно хотите удалить категорию{' '}
      <strong className="text-foreground">{categoryName}</strong>? Это действие
      необратимо.
    </Typography>
  );
}
