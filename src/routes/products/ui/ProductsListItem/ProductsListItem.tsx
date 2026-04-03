import Link from 'next/link';

import type { ProductsQuery } from '@/shared/api/generated/graphql';
import { cn } from '@/shared/lib/styles/cn';
import { Card } from '@/shared/ui/Card/Card';

import { ProductCardCoverLink } from './components/ProductCardCoverLink';
import { ProductCardFooter } from './components/ProductCardFooter';

interface ProductsListItemProps {
  product: ProductsQuery['products'][number];
}

export function ProductsListItem({ product }: ProductsListItemProps) {
  const imageUrl = product.images[0];
  const href = `/products/${product.id}`;
  const priceLabel = product.price.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

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
        />
      }
      title={
        <Link
          href={href}
          className="block min-w-0 w-full truncate text-base sm:text-lg py-2"
          title={product.title}
        >
          {product.title}
        </Link>
      }
      footer={<ProductCardFooter priceLabel={priceLabel} />}
    />
  );
}
