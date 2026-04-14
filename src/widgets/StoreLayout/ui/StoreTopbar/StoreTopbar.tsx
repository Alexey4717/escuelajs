'use client';

import { cn } from '@/shared/lib/styles/cn';

import { LoginLink, LogoutButton } from '@/features/auth';

import { ShoppingCartButton } from './components/ShoppingCartButton/ShoppingCartButton';
import { ThemeToggleButton } from './components/ThemeToggle';
import { topbarAuthSlotClassName } from './topbarAuthSlot';

interface StoreTopbarProps {
  isLoggedIn: boolean;
  className?: string;
}

export function StoreTopbar({ isLoggedIn, className }: StoreTopbarProps) {
  return (
    <div
      className={cn(
        'flex h-full min-w-0 items-center justify-end gap-4 text-primary-foreground',
        'dark:text-card-foreground',
        className,
      )}
    >
      <div className="ml-auto flex items-center gap-2">
        <ShoppingCartButton />
        <ThemeToggleButton />
        <div className={topbarAuthSlotClassName}>
          {isLoggedIn ? <LogoutButton /> : <LoginLink />}
        </div>
      </div>
    </div>
  );
}
