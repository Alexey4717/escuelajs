import Link from 'next/link';

import { HomeLandingQuery } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/config/routes/$path';
import { cn } from '@/shared/lib/styles/cn';
import { Button } from '@/shared/ui/Button/Button';
import { PageSection } from '@/shared/ui/PageSection/PageSection';
import { PageSectionBody } from '@/shared/ui/PageSection/PageSectionBody';
import { PageSectionHeader } from '@/shared/ui/PageSection/PageSectionHeader';
import { Typography } from '@/shared/ui/Typography/Typography';

import { ProductCard } from '@/entities/Product';

import { ToggleCartItemButton } from '@/features/toggleCartItem';

interface HomeProductsProps {
  products: HomeLandingQuery['products'];
}

export const HomeProducts = ({ products }: HomeProductsProps) => (
  <PageSection aria-labelledby="home-featured-heading">
    <PageSectionHeader
      title={
        <Typography
          id="home-featured-heading"
          variant="h2"
          className="text-balance"
        >
          Most popular products
        </Typography>
      }
      trailing={
        <Button asChild variant="secondary">
          <Link href={pagesPath.products.$url().path}>All products</Link>
        </Button>
      }
    />

    <PageSectionBody className="space-y-5">
      {products.length ? (
        <ul
          className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4')}
        >
          {products.map((product, index) => (
            <li key={product.id} className="min-w-0">
              <ProductCard
                product={product}
                prioritizeCoverImage={index === 0}
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
    </PageSectionBody>
  </PageSection>
);
