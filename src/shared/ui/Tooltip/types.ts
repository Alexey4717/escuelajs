import type { ComponentProps, ReactNode } from 'react';

import { TooltipContent } from './components/TooltipContent';
import { TooltipRoot } from './components/TooltipRoot';
import { TooltipTrigger } from './components/TooltipTrigger';

type TooltipRootProps = ComponentProps<typeof TooltipRoot>;

export type TooltipCompoundProps = TooltipRootProps;

export type TooltipSimpleProps = Omit<TooltipRootProps, 'children'> & {
  trigger: ReactNode;
  content: ReactNode;
  contentProps?: Omit<ComponentProps<typeof TooltipContent>, 'children'>;
  triggerProps?: Omit<ComponentProps<typeof TooltipTrigger>, 'children'>;
};

export type TooltipProps = TooltipCompoundProps | TooltipSimpleProps;
