import {
  FolderTree,
  Home,
  type LucideIcon,
  Package,
  Settings,
  Users,
} from 'lucide-react';

import { type Role } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/config/routes/$path';

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const baseCatalog: NavItem[] = [
  { href: pagesPath.$url().path, label: 'Home', icon: Home },
  {
    href: pagesPath.products.$url().path,
    label: 'Products',
    icon: Package,
  },
  {
    href: pagesPath.categories.$url().path,
    label: 'Categories',
    icon: FolderTree,
  },
  {
    href: pagesPath.users.$url().path,
    label: 'Users',
    icon: Users,
  },
];

export const getCatalogNav = (role: Role | null): NavItem[] => {
  if (role !== 'admin') {
    return baseCatalog;
  }

  return [
    ...baseCatalog,
    {
      href: pagesPath.admin_panel.$url().path,
      label: 'Admin panel',
      icon: Settings,
    },
  ];
};
