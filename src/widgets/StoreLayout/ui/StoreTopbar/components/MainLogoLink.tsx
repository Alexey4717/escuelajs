'use client';

import Link from 'next/link';

import { Typography } from '@/shared/ui/Typography/Typography';

export const MainLogoLink = () => {
  return (
    <Link
      href="/"
      className="cursor-pointer text-[17px] font-bold tracking-[-0.5px] text-inherit"
    >
      <Typography variant="large">
        Escuela<em className="not-italic text-accent">.</em>io
      </Typography>
    </Link>
  );
};
