import { useEffect } from 'react';

import { useSidebar } from '@/shared/ui/Sidebar/Sidebar';

import { onboardingEventBus } from '@/features/onboarding';

export function useOnboardingMobileSidebarBridge(): void {
  const { isMobile, setOpenMobile } = useSidebar();

  useEffect(() => {
    const unsubscribe = onboardingEventBus.on('openMobileSidebar', () => {
      if (isMobile) {
        setOpenMobile(true);
      }
    });

    return unsubscribe;
  }, [isMobile, setOpenMobile]);
}
