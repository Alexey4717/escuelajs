'use client';

import { Check, ShoppingCartIcon } from 'lucide-react';

import { cn } from '@/shared/lib/styles/cn';
import { Button } from '@/shared/ui/Button/Button';

import {
  type CartLineItem,
  selectIsProductInCart,
  useCartStore,
} from '@/entities/Cart';

/** Акцент PDP — совпадает с ProductContent. */
const accentBg =
  'bg-[oklch(52%_0.14_42deg)] hover:bg-[oklch(47%_0.14_42deg)] dark:bg-[oklch(62%_0.12_45deg)] dark:hover:bg-[oklch(57%_0.12_45deg)]';

export type ToggleCartItemButtonProps = {
  variant: 'card' | 'detail';
} & CartLineItem;

export function ToggleCartItemButton({
  variant,
  id,
  title,
  price,
  image,
}: ToggleCartItemButtonProps) {
  const inCart = useCartStore(selectIsProductInCart(id));
  const toggleItem = useCartStore((s) => s.toggleItem);

  function handleClick() {
    toggleItem({ id, title, price, image });
  }

  if (variant === 'card') {
    return (
      <Button
        type="button"
        variant={inCart ? 'secondary' : 'outline'}
        size="lg"
        aria-pressed={inCart}
        aria-label={inCart ? 'Убрать из корзины' : 'Добавить в корзину'}
        title={inCart ? 'Убрать из корзины' : 'Добавить в корзину'}
        onClick={handleClick}
        data-testid="toggleCartItem__button__card"
      >
        {inCart ? (
          <>
            В корзине <Check className="size-4 shrink-0" strokeWidth={2.5} />
          </>
        ) : (
          <>
            Добавить в корзину <ShoppingCartIcon className="size-4 shrink-0" />
          </>
        )}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleClick}
      className={cn(
        'mt-2 h-11 w-full rounded-xl text-base font-medium shadow-sm',
        inCart
          ? 'border-2 border-[oklch(52%_0.14_42deg)] text-foreground dark:border-[oklch(62%_0.12_45deg)]'
          : cn('text-white', accentBg),
      )}
      type="button"
      size="lg"
      variant={inCart ? 'outline' : 'default'}
      aria-pressed={inCart}
      aria-label={inCart ? 'Убрать из корзины' : 'Добавить в корзину'}
      data-testid="toggleCartItem__button__detail"
    >
      {inCart ? 'Убрать из корзины' : 'В корзину'}
    </Button>
  );
}
