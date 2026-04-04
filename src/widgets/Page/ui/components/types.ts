import type { ReactNode, RefObject } from 'react';

export interface ScrollPositionSetterProps {
  className?: string;
  children: ReactNode;
  'data-testid'?: string;
  mainRef?: RefObject<HTMLElement | null>;
  onScrollEnd?: () => void;
}
