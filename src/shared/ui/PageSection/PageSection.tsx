import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/shared/lib/styles/cn';

import { PAGE_SECTION_CLASSNAME } from './constants';

export const PageSection = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'section'>) => (
  <section className={cn(PAGE_SECTION_CLASSNAME, className)} {...props}>
    {children}
  </section>
);
