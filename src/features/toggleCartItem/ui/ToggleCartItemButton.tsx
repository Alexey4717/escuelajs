'use client';

import { useRef } from 'react';

import { Check, ShoppingCartIcon } from 'lucide-react';

import { useCartFlyOptional } from '@/shared/lib/animations/cart-fly';
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inCart = useCartStore(selectIsProductInCart(id));
  const toggleItem = useCartStore((s) => s.toggleItem);
  const addItem = useCartStore((s) => s.addItem);
  const cartFly = useCartFlyOptional();

  const lineItem: CartLineItem = { id, title, price, image };

  function handleClick() {
    if (inCart) {
      toggleItem(lineItem);
      return;
    }

    if (cartFly) {
      cartFly.scheduleAddWithFly(lineItem, () => buttonRef.current);
      return;
    }

    addItem(lineItem);
  }

  const flyBusy = !inCart && !!cartFly?.isFlightInProgress(id);

  if (variant === 'card') {
    return (
      <Button
        ref={buttonRef}
        type="button"
        variant={inCart ? 'secondary' : 'outline'}
        size="lg"
        aria-pressed={inCart}
        aria-label={inCart ? 'Убрать из корзины' : 'Добавить в корзину'}
        title={inCart ? 'Убрать из корзины' : 'Добавить в корзину'}
        onClick={handleClick}
        disabled={flyBusy}
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
      ref={buttonRef}
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
      disabled={flyBusy}
      data-testid="toggleCartItem__button__detail"
    >
      {inCart ? 'Убрать из корзины' : 'В корзину'}
    </Button>
  );
}
