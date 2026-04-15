'use client';

import { type CSSProperties, useCallback } from 'react';

import Link from 'next/link';

import { ShoppingCartIcon } from 'lucide-react';

import { pagesPath } from '@/shared/config/routes/$path';
import { useCartFlyOptional } from '@/shared/lib/animations/cart-fly';
import { ONBOARDING_TARGET_IDS } from '@/shared/lib/onboarding';
import { cn } from '@/shared/lib/styles/cn';
import { Badge } from '@/shared/ui/Badge/Badge';
import { Button } from '@/shared/ui/Button/Button';

import { selectCartItemCount, useCartStore } from '@/entities/Cart';

import { useShoppingCartBadgeFeedback } from '../../../../lib/hooks/useShoppingCartBadgeFeedback';

export function ShoppingCartButton() {
  const count = useCartStore(selectCartItemCount);
  const cartFly = useCartFlyOptional();
  const { tone, pulse, feedbackDurationMs, showBadge, badgeCount } =
    useShoppingCartBadgeFeedback(count);

  /** Якорь той же геометрии, что и Badge — центр полёта «+1», а не центр всей кнопки. */
  const setCartBadgeFlyTargetRef = useCallback(
    (node: HTMLSpanElement | null) => {
      cartFly?.registerCartFlyTarget(node);
    },
    [cartFly],
  );

  const label = showBadge ? `Корзина, товаров: ${badgeCount}` : 'Корзина';

  const durationStyle = {
    '--cart-badge-feedback-duration': `${feedbackDurationMs}ms`,
  } as CSSProperties;

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
        data-onboarding={ONBOARDING_TARGET_IDS.topbarCart}
        href={pagesPath.cart.$url().path}
        className="relative inline-flex size-9 items-center justify-center"
        style={durationStyle}
      >
        <span
          className={cn('inline-flex', pulse && 'animate-cart-icon-pulse')}
          style={durationStyle}
        >
          <ShoppingCartIcon />
        </span>
        <span
          ref={setCartBadgeFlyTargetRef}
          className="pointer-events-none absolute -right-1 -top-1 z-0 h-5 min-w-5 shrink-0"
          aria-hidden
        />
        {showBadge ? (
          <Badge
            className={cn(
              'absolute -right-1 -top-1 z-10 flex h-5 min-w-5 items-center justify-center px-1 text-[11px] font-semibold tabular-nums',
              tone === 'up' &&
                'border-transparent !bg-emerald-600 text-white dark:!bg-emerald-500',
              tone === 'down' &&
                'border-transparent !bg-red-600 text-white dark:!bg-red-500',
              count === 0 && 'animate-cart-badge-exit',
            )}
            variant="default"
          >
            {badgeCount > 99 ? '99+' : badgeCount}
          </Badge>
        ) : null}
      </Link>
    </Button>
  );
}
