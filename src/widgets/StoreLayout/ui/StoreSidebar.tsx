'use client';

import { useEffect } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { pagesPath } from '@/shared/config/routes/$path';
import { ONBOARDING_TARGET_IDS } from '@/shared/lib/onboarding';
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

import { useCurrentUserRole } from '@/entities/Session';

import { ProfileLink } from '@/features/profileLink';

import { getCatalogNav, type NavItem } from '../model/catalog-nav';

const StoreSidebarBrand = ({ onNavigate }: { onNavigate: () => void }) => (
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
const onboardingForNavItem = (href: NavItem['href']) => {
  if (href === pagesPath.products.$url().path) {
    return ONBOARDING_TARGET_IDS.sidebarNavProducts;
  }
  if (href === pagesPath.users.$url().path) {
    return ONBOARDING_TARGET_IDS.sidebarNavUsers;
  }
  if (href === pagesPath.admin_panel.$url().path) {
    return ONBOARDING_TARGET_IDS.sidebarNavAdmin;
  }
  return undefined;
};

interface StoreSidebarProps {
  isLoggedIn: boolean;
}

export const StoreSidebar = ({ isLoggedIn }: StoreSidebarProps) => {
  const pathname = usePathname();
  const { role } = useCurrentUserRole();
  const { setOpenMobile } = useSidebar();

  useEffect(() => {
    setOpenMobile(false);
  }, [pathname, setOpenMobile]);

  const closeMobileSheet = () => {
    setOpenMobile(false);
  };

  const isActive = (item: NavItem) => pathname === item.href;
  const catalog = getCatalogNav(role);

  return (
    <Sidebar collapsible="offcanvas" variant="sidebar">
      <SidebarHeader className="h-[52px] shrink-0 flex-row items-center gap-0 border-b border-border px-2 py-0">
        <StoreSidebarBrand onNavigate={closeMobileSheet} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-[10px] font-normal tracking-[0.8px]">
            Catalog
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
                      <Link
                        href={item.href}
                        onClick={closeMobileSheet}
                        data-onboarding={onboardingForNavItem(item.href)}
                      >
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
};
