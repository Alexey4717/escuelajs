import Link from 'next/link';

import type { CategoriesQuery } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/config/routes/$path';
import { cn } from '@/shared/lib/styles/cn';

import { CategoryCardBody } from './CategoryCardBody';

type Category = CategoriesQuery['categories'][number];

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const href = pagesPath.categories._id(category.id).$url().path;

  return (
    <Link
      href={href}
      className={cn(
        'group block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      )}
      data-testid="categoryCard__link__categoryDetails"
    >
      <CategoryCardBody category={category} className="cursor-pointer" />
    </Link>
  );
};
