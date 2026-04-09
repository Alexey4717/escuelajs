import {
  FolderTree,
  Home,
  type LucideIcon,
  Package,
  Settings,
  Users,
} from 'lucide-react';

import { type Role } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/routes/$path';

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const baseCatalog: NavItem[] = [
  { href: pagesPath.$url().path, label: 'Главная', icon: Home },
  {
    href: pagesPath.products.$url().path,
    label: 'Продукты',
    icon: Package,
  },
  {
    href: pagesPath.categories.$url().path,
    label: 'Категории',
    icon: FolderTree,
  },
  {
    href: pagesPath.users.$url().path,
    label: 'Пользователи',
    icon: Users,
  },
];

export function getCatalogNav(role: Role | null): NavItem[] {
  if (role !== 'admin') {
    return baseCatalog;
  }

  return [
    ...baseCatalog,
    {
      href: pagesPath.admin_panel.$url().path,
      label: 'Админка',
      icon: Settings,
    },
  ];
}
