'use client';

import { cn } from '@/shared/lib/styles/cn';

import { LoginLink } from '@/features/auth';
import { ProfileLink } from '@/features/profileLink';
import { ShoppingCartButton } from '@/features/shoppingCart';

import { MainLogoLink } from './components/MainLogoLink';
import { ThemeToggleButton } from './components/ThemeToggle';
import { topbarAuthSlotClassName } from './topbarAuthSlot';

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
      <MainLogoLink />
      <div className="ml-auto flex items-center gap-2">
        <ShoppingCartButton />
        <ThemeToggleButton />
        <div className={topbarAuthSlotClassName}>
          {isLoggedIn ? <ProfileLink /> : <LoginLink />}
        </div>
      </div>
    </header>
  );
}
