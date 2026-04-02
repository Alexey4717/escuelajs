'use client';

import { useSuspenseQuery } from '@apollo/client/react';

import { ProductDetailsDocument } from '../api/product-details.generated';
import { ProductDetailsBody } from './ProductDetailsBody';

type ProductDetailsViewProps = {
  productId: string;
};

export function ProductDetailsView({ productId }: ProductDetailsViewProps) {
  const { data } = useSuspenseQuery(ProductDetailsDocument, {
    variables: { id: productId },
  });

  /** В схеме `product: Product!` — отсутствие товара приходит как GraphQL error, не как `null`. */
  return <ProductDetailsBody product={data.product} />;
}
