import type { ComponentProps, ReactNode } from 'react';

import { Accordion as AccordionPrimitive } from 'radix-ui';

export type AccordionRootProps = ComponentProps<typeof AccordionPrimitive.Root>;

export type AccordionItemProps = ComponentProps<typeof AccordionPrimitive.Item>;

export type AccordionTriggerProps = ComponentProps<
  typeof AccordionPrimitive.Trigger
>;

export type AccordionContentProps = ComponentProps<
  typeof AccordionPrimitive.Content
>;

export type AccordionItemData = {
  value: string;
  trigger: ReactNode;
  content: ReactNode;
  disabled?: boolean;
  className?: string;
};

export type AccordionProps = AccordionRootProps & {
  /** Готовые пункты; если задано, рендерятся вместо `children` */
  items?: AccordionItemData[];
};
