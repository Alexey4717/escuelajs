'use client';

import Link from 'next/link';

export const MainLogoLink = () => {
  return (
    <Link
      href="/"
      className="cursor-pointer text-[17px] font-bold tracking-[-0.5px] text-inherit"
    >
      Escuela<em className="not-italic text-accent">.</em>io
    </Link>
  );
};
