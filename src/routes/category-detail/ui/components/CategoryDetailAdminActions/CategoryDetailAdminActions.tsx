'use client';

import Link from 'next/link';

import { pagesPath } from '@/shared/routes/$path';
import { Button } from '@/shared/ui/Button/Button';

import { useCurrentUserRole } from '@/entities/Session';

import { useDeleteCategoryModal } from '@/features/deleteCategory';

interface CategoryDetailAdminActionsProps {
  categoryId: string;
  categoryName: string;
}

export function CategoryDetailAdminActions({
  categoryId,
  categoryName,
}: CategoryDetailAdminActionsProps) {
  const { role, loading } = useCurrentUserRole();
  const { open } = useDeleteCategoryModal();

  const handleOpenDeleteCategoryModal = () => {
    open({ categoryId, categoryName });
  };

  if (loading || role !== 'admin') {
    return null;
  }

  return (
    <>
      <Button
        asChild
        variant="outline"
        size="sm"
        data-testid="categoryDetail__link__editCategory"
      >
        <Link href={pagesPath.categories._id(categoryId).edit.$url().path}>
          Редактировать
        </Link>
      </Button>
      <Button
        type="button"
        variant="destructive"
        size="sm"
        onClick={handleOpenDeleteCategoryModal}
        data-testid="categoryDetail__button__openDeleteCategoryModal"
      >
        Удалить
      </Button>
    </>
  );
}
