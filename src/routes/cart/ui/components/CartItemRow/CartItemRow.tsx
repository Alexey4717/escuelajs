import Link from 'next/link';

import { X } from 'lucide-react';

import { pagesPath } from '@/shared/config/routes/$path';
import { cn } from '@/shared/lib/styles/cn';
import { AppImage } from '@/shared/ui/AppImage/AppImage';
import { Button } from '@/shared/ui/Button/Button';
import { Typography } from '@/shared/ui/Typography/Typography';

import type { CartLineItem } from '@/entities/Cart';
import { parsePrice } from '@/entities/Price';

export interface CartItemRowProps {
  item: CartLineItem;
  onRemove: (productId: string) => void;
  isExiting?: boolean;
  removeDisabled?: boolean;
}

export function CartItemRow({
  item,
  onRemove,
  isExiting = false,
  removeDisabled = false,
}: CartItemRowProps) {
  return (
    <li
      className={cn(
        'relative flex gap-4 rounded-lg border border-border p-3 pr-11 pt-3 shadow-sm',
        !isExiting && 'animate-cart-item-enter',
        isExiting && 'animate-cart-item-exit',
      )}
    >
      <Link
        data-testid="cartRoute__link__productImage"
        href={pagesPath.products._id(item.id).$url().path}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted"
        tabIndex={isExiting ? -1 : undefined}
      >
        {item.image ? (
          <AppImage
            src={item.image}
            alt=""
            className="size-full object-cover"
          />
        ) : null}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 pr-1">
        <Link
          data-testid="cartRoute__link__productTitle"
          href={pagesPath.products._id(item.id).$url().path}
          className="font-medium text-foreground hover:underline"
          tabIndex={isExiting ? -1 : undefined}
        >
          {item.title}
        </Link>
        <Typography variant="small" className="tabular-nums text-base">
          {parsePrice(item.price)}
        </Typography>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        data-testid={`cartRoute__button__removeItem_${item.id}`}
        className="absolute right-1 top-1 size-9 shrink-0 text-muted-foreground hover:bg-destructive/15 hover:text-destructive"
        aria-label={`Remove “${item.title}” from cart`}
        title="Remove from cart"
        disabled={removeDisabled || isExiting}
        onClick={() => onRemove(item.id)}
      >
        <X className="size-4" strokeWidth={2} />
      </Button>
    </li>
  );
}
