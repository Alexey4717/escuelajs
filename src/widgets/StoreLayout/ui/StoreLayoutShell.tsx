'use client';

import { type ReactNode } from 'react';

import { ScrollArea } from '@/shared/ui/ScrollArea/ScrollArea';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/ui/Sidebar/Sidebar';
import { TooltipProvider } from '@/shared/ui/Tooltip/components/TooltipProvider';

import {
  OnboardingBottomBar,
  OnboardingTourProvider,
} from '@/features/onboarding';

import { useOnboardingMobileSidebarBridge } from '../lib/hooks/useOnboardingMobileSidebarBridge';
import { CartFlyAnimationProvider } from './CartFlyAnimationProvider/CartFlyAnimationProvider';
import { StoreSidebar } from './StoreSidebar';
import { StoreTopbar } from './StoreTopbar/StoreTopbar';

interface StoreLayoutShellProps {
  isLoggedIn: boolean;
  children: ReactNode;
}

function OnboardingMobileSidebarBridge() {
  useOnboardingMobileSidebarBridge();
  return null;
}

export function StoreLayoutShell({
  isLoggedIn,
  children,
}: StoreLayoutShellProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <OnboardingTourProvider>
        <CartFlyAnimationProvider>
          <SidebarProvider className="h-dvh max-h-dvh min-h-0 overflow-hidden">
            <OnboardingMobileSidebarBridge />
            <StoreSidebar isLoggedIn={isLoggedIn} />
            <SidebarInset className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
              <header className="sticky top-0 z-20 flex h-[52px] shrink-0 items-center gap-3 border-b border-border bg-primary px-5 text-primary-foreground dark:bg-card dark:text-card-foreground">
                <SidebarTrigger className="md:hidden" />
                <StoreTopbar
                  isLoggedIn={isLoggedIn}
                  className="min-w-0 flex-1"
                />
              </header>
              <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
                <ScrollArea className="min-h-0 flex-1">
                  <div className="p-layout">{children}</div>
                </ScrollArea>
              </div>
            </SidebarInset>
            <OnboardingBottomBar isLoggedIn={isLoggedIn} />
          </SidebarProvider>
        </CartFlyAnimationProvider>
      </OnboardingTourProvider>
    </TooltipProvider>
  );
}
