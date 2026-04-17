import Link from 'next/link';

import { pagesPath } from '@/shared/config/routes/$path';
import { Typography } from '@/shared/ui/Typography/Typography';

export function CartEmptyState() {
  return (
    <Typography variant="muted">
      Your cart is empty.{' '}
      <Link
        href={pagesPath.products.$url().path}
        className="text-foreground underline-offset-4 hover:underline"
        data-testid="cartRoute__link__catalog"
      >
        Browse products
      </Link>
    </Typography>
  );
}
