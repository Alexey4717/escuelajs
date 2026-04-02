'use client';

import { useQuery } from '@apollo/client/react';

import { CategoryDetailsDocument } from '@/shared/api/generated/graphql';

type CategoryListLabelProps = {
  categoryId: string;
};

export function CategoryListLabel({ categoryId }: CategoryListLabelProps) {
  // TODO заменить на кеш
  const { data } = useQuery(CategoryDetailsDocument, {
    variables: { id: categoryId },
  });

  if (!data) {
    return null;
  }

  return <p className="text-sm text-muted-foreground">{data.category.name}</p>;
}
