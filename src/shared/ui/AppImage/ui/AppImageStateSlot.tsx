import type { ReactNode } from 'react';

interface AppImageStateSlotProps {
  className?: string;
  /** Показать состояние загрузки для вспомогательных технологий. */
  busy?: boolean;
  children: ReactNode;
}

export function AppImageStateSlot({
  className,
  busy,
  children,
}: AppImageStateSlotProps) {
  return (
    <div className={className} {...(busy ? { 'aria-busy': true } : {})}>
      {children}
    </div>
  );
}
