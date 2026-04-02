'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/shared/lib/styles/cn';
import { pagesPath } from '@/shared/routes/$path';

type NavItem = {
  href: string;
  label: string;
  icon: string;
  disabled?: boolean;
};

const catalog: NavItem[] = [
  { href: pagesPath.$url().path, label: 'Главная', icon: '⊞' },
  {
    href: pagesPath.products.$url().path,
    label: 'Продукты',
    icon: '◫',
    disabled: false,
  },
  { href: '#', label: 'Категории', icon: '◈', disabled: true },
  { href: '#', label: 'Пользователи', icon: '⊟', disabled: true },
];

export function StoreSidebar() {
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    if (item.disabled || item.href === '#') {
      return false;
    }
    return pathname === item.href;
  };

  const renderItem = (item: NavItem) => {
    const active = isActive(item);
    const className = cn(
      'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-normal transition-colors',
      item.disabled
        ? 'cursor-not-allowed text-muted-foreground opacity-60'
        : 'cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground',
      active &&
        'bg-accent font-medium text-accent-foreground hover:bg-accent hover:text-accent-foreground',
    );

    const inner = (
      <>
        <span
          className="flex size-4 shrink-0 items-center justify-center text-[14px]"
          aria-hidden
        >
          {item.icon}
        </span>
        {item.label}
      </>
    );

    if (item.disabled) {
      return (
        <div key={item.label} className={className} aria-disabled="true">
          {inner}
        </div>
      );
    }

    return (
      <Link key={item.href + item.label} href={item.href} className={className}>
        {inner}
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        'flex w-[var(--sidebar-width)] shrink-0 flex-col overflow-y-auto border-r border-border bg-card',
        'px-2.5 py-4',
      )}
    >
      <div className="mb-5">
        <div className="mb-1.5 px-2 text-[10px] font-normal uppercase tracking-[0.8px] text-muted-foreground">
          Каталог
        </div>
        <nav className="flex flex-col gap-0.5">{catalog.map(renderItem)}</nav>
      </div>
      <div className="mt-auto border-t border-border pt-3">
        <div
          className={cn(
            'flex cursor-default items-center gap-2.5 rounded-lg px-2.5 py-2',
            'text-muted-foreground',
          )}
        >
          <span
            className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-accent text-[12px] font-semibold text-accent-foreground"
            aria-hidden
          >
            E
          </span>
          <div className="min-w-0">
            <div className="text-[13px] font-medium text-foreground">
              Escuela Store
            </div>
            <div className="text-[11px] text-muted-foreground">
              GraphQL · JWT
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
