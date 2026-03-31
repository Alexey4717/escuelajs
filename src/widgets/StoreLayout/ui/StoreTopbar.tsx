'use client';

import Link from 'next/link';

import { ThemeToggle } from '@/widgets/StoreLayout/ui/ThemeToggle';

interface StoreTopbarProps {
  isLoggedIn: boolean;
}

export function StoreTopbar({ isLoggedIn }: StoreTopbarProps) {
  return (
    <header>
      <Link href="/">
        Escuela<em>.</em>io
      </Link>
      <div>
        <button type="button" title="Корзина" aria-label="Корзина">
          🛒
        </button>
        <ThemeToggle />
        {isLoggedIn ? <Link href="/profile">Профиль</Link> : <Link href="/login">Войти</Link>}
      </div>
    </header>
  );
}
