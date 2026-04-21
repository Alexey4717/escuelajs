import { useCallback } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { pagesPath } from '@/shared/config/routes/$path';
import { Typography } from '@/shared/ui/Typography/Typography';

interface StoreSidebarBrandProps {
  onNavigate: () => void;
}

export const StoreSidebarBrand = ({ onNavigate }: StoreSidebarBrandProps) => {
  const router = useRouter();
  const homeHref = pagesPath.$url().path;

  const prefetchHome = useCallback(() => {
    void router.prefetch(homeHref);
  }, [homeHref, router]);

  return (
    <Link
      href={homeHref}
      prefetch={false}
      className="flex h-full min-h-0 items-center gap-2 rounded-md px-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent/50"
      onMouseEnter={prefetchHome}
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
};
