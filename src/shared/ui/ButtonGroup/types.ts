import type { ReactNode } from 'react';

export type ButtonGroupItem =
  | {
      type: 'text';
      children: ReactNode;
      className?: string;
      asChild?: boolean;
    }
  | {
      type: 'separator';
      className?: string;
      orientation?: 'horizontal' | 'vertical';
    }
  | {
      type: 'custom';
      children: ReactNode;
    };
