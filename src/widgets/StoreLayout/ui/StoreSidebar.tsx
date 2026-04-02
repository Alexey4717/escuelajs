'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  FolderTree,
  Home,
  type LucideIcon,
  Package,
  Users,
} from 'lucide-react';

import { cn } from '@/shared/lib/styles/cn';
import { pagesPath } from '@/shared/routes/$path';

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  disabled?: boolean;
};

const catalog: NavItem[] = [
  { href: pagesPath.$url().path, label: 'Главная', icon: Home },
  {
    href: pagesPath.products.$url().path,
    label: 'Продукты',
    icon: Package,
    disabled: false,
  },
  { href: '#', label: 'Категории', icon: FolderTree, disabled: true },
  { href: '#', label: 'Пользователи', icon: Users, disabled: true },
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

    const ItemIcon = item.icon;
    const inner = (
      <>
        <ItemIcon
          className="size-4 shrink-0 text-current"
          aria-hidden
          strokeWidth={1.75}
        />
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
    </aside>
  );
}
