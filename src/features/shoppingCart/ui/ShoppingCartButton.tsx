import { ShoppingCartIcon } from 'lucide-react';

import { cn } from '@/shared/lib/styles/cn';
import { Button } from '@/shared/ui/Button/Button';

export const ShoppingCartButton = () => {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      title="Корзина"
      aria-label="Корзина"
      className={cn(
        'relative rounded-md border border-white/12 text-[15px] text-inherit',
        'hover:bg-white/10 dark:hover:bg-white/10',
      )}
    >
      <ShoppingCartIcon />
    </Button>
  );
};
