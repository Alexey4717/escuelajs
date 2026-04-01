'use client';

import { useFragment } from '@apollo/client/react';

import {
  type Category_DetailFieldsFragment,
  Category_DetailFieldsFragmentDoc,
} from '../api/category-detail-fields.fragment.generated';
import { categoryCacheRef } from '../lib/category-cache-ref';

type CategoryDetailLabelProps = {
  categoryId: string;
};

export function CategoryDetailLabel({ categoryId }: CategoryDetailLabelProps) {
  const { data, complete } = useFragment<Category_DetailFieldsFragment>({
    fragment: Category_DetailFieldsFragmentDoc,
    fragmentName: 'Category_DetailFields',
    from: categoryCacheRef(categoryId),
  });

  if (!complete) {
    return null;
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">{data.name}</p>
      {data.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={data.image}
          alt=""
          className="size-10 rounded-md border border-border object-cover"
        />
      ) : null}
    </div>
  );
}
