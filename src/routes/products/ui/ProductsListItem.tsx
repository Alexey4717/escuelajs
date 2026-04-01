'use client';

import Link from 'next/link';

import { CategoryListLabel } from '@/entities/category';

import type { ProductsQuery } from '../api/products.generated';

type ProductsListItemProps = {
  product: ProductsQuery['products'][number];
};

/** Карточка товара: поля продукта из `ProductListItem`, категория — через `CategoryListLabel` + `Category_ListItem`. */
export function ProductsListItem({ product }: ProductsListItemProps) {
  const imageUrl = product.images[0];
  const href = `/products/${product.id}`;

  return (
    <li className="overflow-hidden rounded-lg border border-border bg-card shadow-sm transition hover:border-primary/40">
      <Link
        href={href}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          {imageUrl ? (
            // URL из API с разных доменов — без next/image remotePatterns
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt=""
              className="absolute inset-0 size-full object-cover"
            />
          ) : null}
        </div>
        <div className="space-y-1 p-4">
          <p className="line-clamp-2 font-medium leading-snug">
            {product.title}
          </p>
          <CategoryListLabel categoryId={product.category.id} />
          <p className="text-lg font-semibold tabular-nums">
            {product.price.toLocaleString('ru-RU', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
      </Link>
    </li>
  );
}
