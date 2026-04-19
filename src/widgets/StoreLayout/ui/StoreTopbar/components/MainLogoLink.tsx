'use client';

import Link from 'next/link';

import { pagesPath } from '@/shared/config/routes/$path';
import { Typography } from '@/shared/ui/Typography/Typography';

export const MainLogoLink = () => (
  <Link
    href={pagesPath.$url().path}
    className="cursor-pointer text-[17px] font-bold tracking-[-0.5px] text-inherit"
  >
    <Typography variant="large">
      Escuela<em className="not-italic text-accent">.</em>io
    </Typography>
  </Link>
);
