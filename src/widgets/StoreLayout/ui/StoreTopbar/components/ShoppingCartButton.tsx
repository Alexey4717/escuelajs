'use client';

import Link from 'next/link';

import { ShoppingCartIcon } from 'lucide-react';

import { cn } from '@/shared/lib/styles/cn';
import { pagesPath } from '@/shared/routes/$path';
import { Badge } from '@/shared/ui/Badge/Badge';
import { Button } from '@/shared/ui/Button/Button';

import { selectCartItemCount, useCartStore } from '@/entities/Cart';

export function ShoppingCartButton() {
  const count = useCartStore(selectCartItemCount);

  const showBadge = count > 0;
  const label = showBadge ? `Корзина, товаров: ${count}` : 'Корзина';

  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      title={label}
      aria-label={label}
      className={cn(
        'relative rounded-md border border-white/12 text-[15px] text-inherit',
        'hover:bg-white/10 dark:hover:bg-white/10',
      )}
    >
      <Link
        data-testid="storeTopbar__link__cart"
        href={pagesPath.cart.$url().path}
        className="relative inline-flex size-9 items-center justify-center"
      >
        <ShoppingCartIcon />
        {showBadge ? (
          <Badge
            className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center px-1 text-[11px] font-semibold tabular-nums"
            variant="default"
          >
            {count > 99 ? '99+' : count}
          </Badge>
        ) : null}
      </Link>
    </Button>
  );
}
