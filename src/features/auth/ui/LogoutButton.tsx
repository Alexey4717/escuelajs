'use client';

import { useRouter } from 'next/navigation';

import { clearAuthSession } from '@/shared/api/auth/clear-auth-session';
import { cn } from '@/shared/lib/styles/cn';
import { pagesPath } from '@/shared/routes/$path';

import { clearCart } from '@/entities/Cart';

const logoutButtonClassName = cn(
  'inline-flex w-full min-w-0 shrink-0 items-center justify-center rounded-md border border-white/20 bg-transparent px-3.5 py-1.5 text-[13px] text-inherit',
  'transition-colors hover:bg-white/10',
);

interface LogoutButtonProps {
  className?: string;
}

export function LogoutButton({ className }: LogoutButtonProps) {
  const router = useRouter();

  async function logout() {
    await clearAuthSession();
    clearCart();
    router.push(pagesPath.$url().path);
    router.refresh();
  }

  return (
    <button
      type="button"
      className={cn(logoutButtonClassName, className)}
      onClick={logout}
    >
      Выйти
    </button>
  );
}
