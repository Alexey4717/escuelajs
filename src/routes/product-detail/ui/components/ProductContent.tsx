import type { ReactNode } from 'react';

import { type ProductDetailsQuery } from '@/shared/api/generated/graphql';
import { cn } from '@/shared/lib/styles/cn';
import { Button } from '@/shared/ui/Button/Button';
import { Typography } from '@/shared/ui/Typography/Typography';

import { CategoryListLabel } from '@/entities/Category';
import { parsePrice } from '@/entities/Price';

/** Акцент витрины (терракота): совпадает с референсом карточки товара. */
const accentText =
  'text-[oklch(52%_0.14_42deg)] dark:text-[oklch(68%_0.12_45deg)]';
const accentBg =
  'bg-[oklch(52%_0.14_42deg)] hover:bg-[oklch(47%_0.14_42deg)] dark:bg-[oklch(62%_0.12_45deg)] dark:hover:bg-[oklch(57%_0.12_45deg)]';

interface ProductContentProps {
  product: ProductDetailsQuery['product'];
  /** Блок под заголовком (например, действия администратора). */
  titleAddon?: ReactNode;
}

export const ProductContent = ({
  product,
  titleAddon,
}: ProductContentProps) => {
  const priceFormatted = parsePrice(product.price, 'USD');

  return (
    <div className="flex min-w-0 flex-col gap-5">
      <CategoryListLabel
        className="flex gap-2 items-center w-fit rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide"
        categoryName={product.category.name}
        categoryImg={product.category.image}
      />
      <Typography
        variant="h2"
        component="h1"
        align="left"
        className="border-0 pb-0 text-3xl font-bold tracking-tight text-balance text-foreground md:text-4xl"
      >
        {product.title}
      </Typography>
      {titleAddon ? (
        <div className="flex flex-wrap gap-2">{titleAddon}</div>
      ) : null}
      <Typography
        variant="inherit"
        component="p"
        className={cn(
          'text-3xl font-bold tabular-nums md:text-4xl',
          accentText,
        )}
      >
        {priceFormatted}
      </Typography>
      <Typography
        variant="inherit"
        component="p"
        className="text-base leading-relaxed whitespace-pre-wrap text-muted-foreground"
      >
        {product.description}
      </Typography>
      <Button
        type="button"
        size="lg"
        className={cn(
          'mt-2 h-11 w-full rounded-xl text-base font-medium text-white shadow-sm',
          accentBg,
        )}
      >
        В корзину
      </Button>
    </div>
  );
};
