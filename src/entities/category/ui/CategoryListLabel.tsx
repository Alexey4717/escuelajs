'use client';

import { useFragment } from '@apollo/client/react';

import {
  type Category_ListItemFragment,
  Category_ListItemFragmentDoc,
} from '../api/category-list-item.fragment.generated';
import { categoryCacheRef } from '../lib/category-cache-ref';

type CategoryListLabelProps = {
  categoryId: string;
};

export function CategoryListLabel({ categoryId }: CategoryListLabelProps) {
  const { data, complete } = useFragment<Category_ListItemFragment>({
    fragment: Category_ListItemFragmentDoc,
    fragmentName: 'Category_ListItem',
    from: categoryCacheRef(categoryId),
  });

  if (!complete) {
    return null;
  }

  return <p className="text-sm text-muted-foreground">{data.name}</p>;
}
