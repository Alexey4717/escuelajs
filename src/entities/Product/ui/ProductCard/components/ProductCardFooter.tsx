import type { ReactNode } from 'react';

import { Typography } from '@/shared/ui/Typography/Typography';

interface ProductCardFooterProps {
  priceLabel: string;
  /** Кнопка корзины из слоя routes/features (entity не импортирует features). */
  action?: ReactNode;
}

export const ProductCardFooter = ({
  priceLabel,
  action,
}: ProductCardFooterProps) => (
  <div className="flex items-center justify-between gap-2 w-full">
    <Typography variant="small" className="tabular-nums text-base sm:text-lg">
      Price: {priceLabel}
    </Typography>
    {action}
  </div>
);
