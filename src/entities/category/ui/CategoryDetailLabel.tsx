'use client';

import { useQuery } from '@apollo/client/react';

import { CategoryDetailsDocument } from '@/shared/api/generated/graphql';

type CategoryDetailLabelProps = {
  categoryId: string;
};

export function CategoryDetailLabel({ categoryId }: CategoryDetailLabelProps) {
  // TODO заменить на кеш
  const { data } = useQuery(CategoryDetailsDocument, {
    variables: { id: categoryId },
  });

  if (!data) {
    return null;
  }

  const category = data?.category;

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">{category.name}</p>
      {category.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={category.image}
          alt=""
          className="size-10 rounded-md border border-border object-cover"
        />
      ) : null}
    </div>
  );
}
