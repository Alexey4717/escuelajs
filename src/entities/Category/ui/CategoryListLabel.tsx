'use client';

import { useQuery } from '@apollo/client/react';

import { CategoryDetailsDocument } from '@/shared/api/generated/graphql';
import { Typography } from '@/shared/ui/Typography/Typography';

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

  return <Typography variant="muted">{data.category.name}</Typography>;
}
