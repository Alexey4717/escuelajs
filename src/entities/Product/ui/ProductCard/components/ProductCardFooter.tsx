import { ShoppingCartIcon } from 'lucide-react';

import { Button } from '@/shared/ui/Button/Button';
import { Typography } from '@/shared/ui/Typography/Typography';

interface ProductCardFooterProps {
  priceLabel: string;
}

export const ProductCardFooter = ({ priceLabel }: ProductCardFooterProps) => {
  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <Typography variant="small" className="tabular-nums text-base sm:text-lg">
        Price: {priceLabel}
      </Typography>
      <Button
        type="button"
        variant="outline"
        size="lg"
        aria-label="Добавить в корзину"
        title="Добавить в корзину"
      >
        Добавить в корзину <ShoppingCartIcon />
      </Button>
    </div>
  );
};
