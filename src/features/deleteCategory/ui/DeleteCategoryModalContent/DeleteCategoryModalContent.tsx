'use client';

import type { ModalRegistryMap } from '@/shared/lib/store/slices/modal/types';
import { Spinner } from '@/shared/ui/Spinner/Spinner';
import { Typography } from '@/shared/ui/Typography/Typography';

import { useDeleteCategoryProductsGuard } from '../../api/use-delete-category-products-guard';

type DeleteCategoryModalContentProps = ModalRegistryMap['categoryDelete'] & {
  closeModal: () => void;
};

export function DeleteCategoryModalContent({
  categoryId,
  categoryName,
}: DeleteCategoryModalContentProps) {
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
        Не удалось проверить наличие товаров в категории. Попробуйте снова
        позже.
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
        Категорию <strong className="text-foreground">{categoryName}</strong>{' '}
        нельзя удалить: в ней есть товары. Сначала удалите все товары этой
        категории, затем повторите удаление.
      </Typography>
    );
  }

  return (
    <Typography variant="body2" component="p" className="text-muted-foreground">
      Вы действительно хотите удалить категорию{' '}
      <strong className="text-foreground">{categoryName}</strong>? Это действие
      необратимо.
    </Typography>
  );
}
