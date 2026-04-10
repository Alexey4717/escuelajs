'use client';

import Link from 'next/link';

import { PencilIcon, Trash2Icon } from 'lucide-react';

import type { CategoriesQuery } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/routes/$path';
import { Button } from '@/shared/ui/Button/Button';

import { useDeleteCategoryModal } from '@/features/deleteCategory';

import { CategoryCardBody } from './CategoryCardBody';

type Category = CategoriesQuery['categories'][number];

interface CategoryCardProps {
  category: Category;
  /** Управление категориями (админ); задаётся родителем, один запрос роли на страницу */
  canManageCategories?: boolean;
}

export function CategoryCard({
  category,
  canManageCategories = false,
}: CategoryCardProps) {
  const { open: openDeleteCategoryModal } = useDeleteCategoryModal();
  const categoryId = String(category.id);
  const editHref = pagesPath.categories._id(category.id).edit.$url().path;

  if (!canManageCategories) {
    return <CategoryCardBody category={category} />;
  }

  return (
    <div className="relative h-full">
      <CategoryCardBody category={category} />
      <div className="absolute right-2 top-2 z-10 flex gap-1">
        <Button
          asChild
          variant="secondary"
          size="icon-sm"
          className="border border-border/60 bg-background/90 shadow-sm backdrop-blur-sm"
          title="Редактировать"
          aria-label={`Редактировать категорию «${category.name}»`}
          data-testid="categoryCard__link__editCategory"
        >
          <Link href={editHref}>
            <PencilIcon />
          </Link>
        </Button>
        <Button
          type="button"
          variant="destructive"
          size="icon-sm"
          className="border border-destructive/20 bg-background/90 text-destructive shadow-sm backdrop-blur-sm hover:bg-destructive/15"
          title="Удалить"
          aria-label={`Удалить категорию «${category.name}»`}
          onClick={() =>
            openDeleteCategoryModal({
              categoryId,
              categoryName: category.name,
            })
          }
          data-testid="categoryCard__button__openDeleteCategoryModal"
        >
          <Trash2Icon />
        </Button>
      </div>
    </div>
  );
}
