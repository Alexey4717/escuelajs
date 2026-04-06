import Link from 'next/link';

import { HomeLandingQuery } from '@/shared/api/generated/graphql';
import { cn } from '@/shared/lib/styles/cn';
import { pagesPath } from '@/shared/routes/$path';
import { Button } from '@/shared/ui/Button/Button';
import { Typography } from '@/shared/ui/Typography/Typography';

import { ProductCard } from '@/entities/Product';

interface HomeProductsProps {
  products: HomeLandingQuery['products'];
}

export const HomeProducts = ({ products }: HomeProductsProps) => {
  return (
    <section aria-labelledby="home-featured-heading" className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <Typography id="home-featured-heading" variant="h2" gutterBottom>
          Самые популярные товары
        </Typography>
        <Button asChild variant="secondary">
          <Link href={pagesPath.products.$url().path}>Все товары</Link>
        </Button>
      </div>

      {products.length ? (
        <ul
          className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4')}
        >
          {products.map((product) => (
            <li key={product.id} className="min-w-0">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <Typography variant="muted">
          Товары пока недоступны — загляните позже или откройте{' '}
          <Link
            href={pagesPath.categories.$url().path}
            className="text-foreground underline-offset-4 hover:underline"
          >
            категории
          </Link>
          .
        </Typography>
      )}
    </section>
  );
};
