import { type ReactNode } from 'react';

import { Typography } from '@/shared/ui/Typography/Typography';

interface CartCheckoutSectionHeaderProps {
  children: ReactNode;
  className?: string;
}

export const CartCheckoutSectionHeader = ({
  children,
  className,
}: CartCheckoutSectionHeaderProps) => {
  const rootClassName = ['flex items-center justify-between gap-3', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClassName}>
      <Typography
        variant="h2"
        component="h2"
        className="text-xl font-semibold leading-tight"
      >
        Checkout
      </Typography>
      {children}
    </div>
  );
};
