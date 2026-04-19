import type { ReactNode } from 'react';

import Link from 'next/link';

import type { ProductsQuery } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/config/routes/$path';
import { cn } from '@/shared/lib/styles/cn';
import { Card } from '@/shared/ui/Card/Card';

import { parsePrice } from '@/entities/Price/@x/product';

import { ProductCardCoverLink } from './components/ProductCardCoverLink';
import { ProductCardFooter } from './components/ProductCardFooter';

interface ProductCardProps {
  product: ProductsQuery['products'][number];
  cartAction?: ReactNode;
  titleDataOnboarding?: string;
}

export const ProductCard = ({
  product,
  cartAction,
  titleDataOnboarding,
}: ProductCardProps) => {
  const imageUrl = product.images[0];
  const href = pagesPath.products._id(product.id).$url().path;
  const priceLabel = parsePrice(product.price);

  return (
    <Card
      className={cn(
        'h-full gap-0 border border-border p-0 ring-0 shadow-sm transition',
        'hover:border-primary/40',
      )}
      cover={
        <ProductCardCoverLink
          href={href}
          imageUrl={imageUrl}
          categoryName={product.category.name}
          dataOnboarding={titleDataOnboarding}
        />
      }
      title={
        <Link
          prefetch={false}
          href={href}
          className="block min-w-0 w-full truncate text-base sm:text-lg py-2"
          title={product.title}
          data-onboarding={titleDataOnboarding}
        >
          {product.title}
        </Link>
      }
      footer={<ProductCardFooter priceLabel={priceLabel} action={cartAction} />}
    />
  );
};
