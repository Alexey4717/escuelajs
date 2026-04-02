'use client';

import Link from 'next/link';

import type { ProductDetailsQuery } from '@/shared/api/generated/graphql';

import { CategoryListLabel } from '@/entities/Category';

type ProductDetailsBodyProps = {
  product: NonNullable<ProductDetailsQuery['product']>;
};

export function ProductDetailsBody({ product }: ProductDetailsBodyProps) {
  const imageUrl = product.images[0];

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <nav className="text-sm text-muted-foreground">
        <Link
          href="/products"
          className="underline-offset-4 hover:text-foreground hover:underline"
        >
          Каталог
        </Link>
        <span className="mx-2 text-border">/</span>
        <span className="text-foreground">{product.title}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-start">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-border bg-muted">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt=""
              className="absolute inset-0 size-full object-cover"
            />
          ) : null}
        </div>

        <div className="space-y-4">
          <CategoryListLabel categoryId={product.category.id} />
          <h1 className="text-3xl font-semibold tracking-tight">
            {product.title}
          </h1>
          <p className="text-2xl font-semibold tabular-nums">
            {product.price.toLocaleString('ru-RU', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            })}
          </p>
          <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </article>
  );
}
