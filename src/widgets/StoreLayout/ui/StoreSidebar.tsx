'use client';

import { useEffect } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  FolderTree,
  Home,
  type LucideIcon,
  Package,
  Users,
} from 'lucide-react';

import { pagesPath } from '@/shared/routes/$path';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shared/ui/Sidebar/Sidebar';
import { Typography } from '@/shared/ui/Typography/Typography';

import { ProfileLink } from '@/features/profileLink';

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const catalog: NavItem[] = [
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

function StoreSidebarBrand({ onNavigate }: { onNavigate: () => void }) {
  return (
    <Link
      href={pagesPath.$url().path}
      className="flex h-full min-h-0 items-center gap-2 rounded-md px-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent/50"
      onClick={onNavigate}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-[12px] font-bold text-sidebar-primary-foreground">
        E
      </span>
      <Typography
        variant="large"
        className="text-[15px] font-semibold leading-tight"
      >
        Escuela<span className="text-sidebar-primary">.</span>io
      </Typography>
    </Link>
  );
}

interface StoreSidebarProps {
  isLoggedIn: boolean;
}

export function StoreSidebar({ isLoggedIn }: StoreSidebarProps) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  useEffect(() => {
    setOpenMobile(false);
  }, [pathname, setOpenMobile]);

  const closeMobileSheet = () => {
    setOpenMobile(false);
  };

  const isActive = (item: NavItem) => {
    return pathname === item.href;
  };

  return (
    <Sidebar collapsible="offcanvas" variant="sidebar">
      <SidebarHeader className="h-[52px] shrink-0 flex-row items-center gap-0 border-b border-border px-2 py-0">
        <StoreSidebarBrand onNavigate={closeMobileSheet} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-[10px] font-normal tracking-[0.8px]">
            Каталог
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {catalog.map((item) => {
                const ItemIcon = item.icon;
                const active = isActive(item);

                return (
                  <SidebarMenuItem key={item.href + item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.label}
                    >
                      <Link href={item.href} onClick={closeMobileSheet}>
                        <ItemIcon
                          className="size-4 shrink-0"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {isLoggedIn ? (
        <SidebarFooter className="border-t border-sidebar-border p-2">
          <div onClick={closeMobileSheet}>
            <ProfileLink />
          </div>
        </SidebarFooter>
      ) : null}
    </Sidebar>
  );
}
