import type { ReactNode } from 'react';

interface AppImageStateSlotProps {
  className?: string;
  /** Показать состояние загрузки для вспомогательных технологий. */
  busy?: boolean;
  children: ReactNode;
}

export const AppImageStateSlot = ({
  className,
  busy,
  children,
}: AppImageStateSlotProps) => (
  <div className={className} {...(busy ? { 'aria-busy': true } : {})}>
    {children}
  </div>
);
