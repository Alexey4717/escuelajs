'use client';

import { SheetContent } from './components/SheetContent';
import { SheetRoot } from './components/SheetRoot';
import { SheetTrigger } from './components/SheetTrigger';
import {
  type SheetCompoundProps,
  type SheetProps,
  type SheetSimpleProps,
} from './types';

export const Sheet = (props: SheetProps) => {
  if ('trigger' in props && props.trigger !== undefined) {
    const { trigger, content, contentProps, triggerProps, ...rootProps } =
      props as SheetSimpleProps;

    return (
      <SheetRoot {...rootProps}>
        <SheetTrigger {...triggerProps}>{trigger}</SheetTrigger>
        <SheetContent {...contentProps}>{content}</SheetContent>
      </SheetRoot>
    );
  }

  return <SheetRoot {...(props as SheetCompoundProps)} />;
};
