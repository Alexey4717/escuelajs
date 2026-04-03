'use client';

import Link from 'next/link';

import type { ProductDetailsQuery } from '@/shared/api/generated/graphql';
import { Typography } from '@/shared/ui/Typography/Typography';

import { CategoryListLabel } from '@/entities/Category';

type ProductDetailsBodyProps = {
  product: NonNullable<ProductDetailsQuery['product']>;
};

export function ProductDetailsBody({ product }: ProductDetailsBodyProps) {
  const imageUrl = product.images[0];

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <Typography component="nav" variant="muted" className="text-sm">
        <Link
          href="/products"
          className="underline-offset-4 hover:text-foreground hover:underline"
        >
          Каталог
        </Link>
        <span className="mx-2 text-border">/</span>
        <Typography
          component="span"
          variant="inherit"
          className="text-foreground"
        >
          {product.title}
        </Typography>
      </Typography>

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
          <CategoryListLabel categoryName={product.category.name} />
          <Typography variant="h2" component="h1" className="border-0 pb-0">
            {product.title}
          </Typography>
          <Typography variant="h3" className="tabular-nums">
            {product.price.toLocaleString('ru-RU', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            })}
          </Typography>
          <Typography
            variant="inherit"
            component="p"
            className="whitespace-pre-wrap text-muted-foreground leading-relaxed"
          >
            {product.description}
          </Typography>
        </div>
      </div>
    </article>
  );
}
