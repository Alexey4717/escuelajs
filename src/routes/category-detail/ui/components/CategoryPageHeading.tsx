import Link from 'next/link';

import { ArrowLeftIcon } from 'lucide-react';

import { pagesPath } from '@/shared/config/routes/$path';
import { Typography } from '@/shared/ui/Typography/Typography';

export const CategoryPageHeading = () => (
  <Typography component="nav" variant="muted" className="mb-6 text-sm">
    <Link
      href={pagesPath.categories.$url().path}
      className="inline-flex items-center gap-1.5 text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
    >
      <ArrowLeftIcon className="size-4 shrink-0" aria-hidden />
      Back to categories
    </Link>
  </Typography>
);
