import Link from 'next/link';

import { pagesPath } from '@/shared/config/routes/$path';
import { Typography } from '@/shared/ui/Typography/Typography';

export function CartEmptyState() {
  return (
    <Typography variant="muted">
      Корзина пуста.{' '}
      <Link
        href={pagesPath.products.$url().path}
        className="text-foreground underline-offset-4 hover:underline"
        data-testid="cartRoute__link__catalog"
      >
        Перейти в каталог
      </Link>
    </Typography>
  );
}
