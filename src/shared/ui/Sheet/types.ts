import type { ComponentProps, ReactNode } from 'react';

import { SheetContent } from './components/SheetContent';
import { SheetRoot } from './components/SheetRoot';
import { SheetTrigger } from './components/SheetTrigger';

type SheetRootProps = ComponentProps<typeof SheetRoot>;

export type SheetCompoundProps = SheetRootProps;

export type SheetSimpleProps = Omit<SheetRootProps, 'children'> & {
  trigger: ReactNode;
  content: ReactNode;
  contentProps?: Omit<ComponentProps<typeof SheetContent>, 'children'>;
  triggerProps?: Omit<ComponentProps<typeof SheetTrigger>, 'children'>;
};

export type SheetProps = SheetCompoundProps | SheetSimpleProps;
