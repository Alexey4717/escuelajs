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
import { type AppPathname } from '@/shared/config/routes/types';

export type NavItem = {
  href: AppPathname;
  label: string;
  icon: LucideIcon;
};

const baseCatalog: NavItem[] = [
  { href: pagesPath.$url().pathname, label: 'Home', icon: Home },
  {
    href: pagesPath.products.$url().pathname,
    label: 'Products',
    icon: Package,
  },
  {
    href: pagesPath.categories.$url().pathname,
    label: 'Categories',
    icon: FolderTree,
  },
  {
    href: pagesPath.users.$url().pathname,
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
      href: pagesPath.admin_panel.$url().pathname,
      label: 'Admin panel',
      icon: Settings,
    },
  ];
};
