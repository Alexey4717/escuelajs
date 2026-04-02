'use client';

import { TooltipContent } from './components/TooltipContent';
import { TooltipRoot } from './components/TooltipRoot';
import { TooltipTrigger } from './components/TooltipTrigger';
import {
  TooltipCompoundProps,
  TooltipProps,
  TooltipSimpleProps,
} from './types';

export function Tooltip(props: TooltipProps) {
  if ('trigger' in props && props.trigger !== undefined) {
    const { trigger, content, contentProps, triggerProps, ...rootProps } =
      props as TooltipSimpleProps;

    return (
      <TooltipRoot {...rootProps}>
        <TooltipTrigger {...triggerProps}>{trigger}</TooltipTrigger>
        <TooltipContent {...contentProps}>{content}</TooltipContent>
      </TooltipRoot>
    );
  }

  return <TooltipRoot {...(props as TooltipCompoundProps)} />;
}
