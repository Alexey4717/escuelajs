'use client';

import Link from 'next/link';

import { cn } from '@/shared/lib/styles/cn';
import { pagesPath } from '@/shared/routes/$path';

export const LoginLink = () => {
  return (
    <Link
      href={pagesPath.login.$url().path}
      className={cn(
        'flex w-full items-center justify-center rounded-md border border-white/20 bg-transparent px-3.5 py-1.5 text-[13px] text-inherit',
        'transition-colors hover:bg-white/10',
      )}
    >
      Войти
    </Link>
  );
};
