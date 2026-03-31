'use client';

import Link from 'next/link';

import { ShoppingCartIcon } from 'lucide-react';

import { cn } from '@/shared/lib/styles/cn';
import { Button } from '@/shared/ui/Button/Button';

import { ThemeToggle } from '@/widgets/StoreLayout/ui/ThemeToggle';

interface StoreTopbarProps {
  isLoggedIn: boolean;
}

export function StoreTopbar({ isLoggedIn }: StoreTopbarProps) {
  return (
    <header
      className={cn(
        'flex h-[52px] shrink-0 items-center gap-4 bg-primary px-5 text-primary-foreground',
        'z-10 dark:bg-card dark:text-card-foreground',
      )}
    >
      <Link
        href="/"
        className="cursor-pointer text-[17px] font-bold tracking-[-0.5px] text-inherit"
      >
        Escuela<em className="not-italic text-accent">.</em>io
      </Link>
      <div className="ml-auto flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          title="Корзина"
          aria-label="Корзина"
          className={cn(
            'relative rounded-md border border-white/12 text-[15px] text-inherit',
            'hover:bg-white/10 dark:hover:bg-white/10',
          )}
        >
          <ShoppingCartIcon />
        </Button>
        <ThemeToggle />
        {isLoggedIn ? (
          <Link
            href="/profile"
            className={cn(
              'flex cursor-pointer items-center gap-2 rounded-full border border-white/12 py-1 pr-2.5 pl-1',
              'text-inherit transition-colors',
              'hover:bg-white/10',
            )}
          >
            <span
              className="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-accent-foreground"
              aria-hidden
            >
              П
            </span>
            <span className="text-[12px] opacity-80">Профиль</span>
          </Link>
        ) : (
          <Link
            href="/login"
            className={cn(
              'rounded-md border border-white/20 bg-transparent px-3.5 py-1.5 text-[13px] text-inherit',
              'whitespace-nowrap transition-colors hover:bg-white/10',
            )}
          >
            Войти
          </Link>
        )}
      </div>
    </header>
  );
}
