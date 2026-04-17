import Link from 'next/link';

import { HomeLandingQuery } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/config/routes/$path';
import { cn } from '@/shared/lib/styles/cn';
import { Button } from '@/shared/ui/Button/Button';
import { Typography } from '@/shared/ui/Typography/Typography';

import { ProductCard } from '@/entities/Product';

import { ToggleCartItemButton } from '@/features/toggleCartItem';

interface HomeProductsProps {
  products: HomeLandingQuery['products'];
}

export const HomeProducts = ({ products }: HomeProductsProps) => {
  return (
    <section aria-labelledby="home-featured-heading" className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <Typography id="home-featured-heading" variant="h2" gutterBottom>
          Most popular products
        </Typography>
        <Button asChild variant="secondary">
          <Link href={pagesPath.products.$url().path}>All products</Link>
        </Button>
      </div>

      {products.length ? (
        <ul
          className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4')}
        >
          {products.map((product) => (
            <li key={product.id} className="min-w-0">
              <ProductCard
                product={product}
                cartAction={
                  <ToggleCartItemButton
                    variant="card"
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.images[0] ?? ''}
                  />
                }
              />
            </li>
          ))}
        </ul>
      ) : (
        <Typography variant="muted">
          Products are not available right now. Please check back later or open{' '}
          <Link
            href={pagesPath.categories.$url().path}
            className="text-foreground underline-offset-4 hover:underline"
          >
            categories
          </Link>
          .
        </Typography>
      )}
    </section>
  );
};
