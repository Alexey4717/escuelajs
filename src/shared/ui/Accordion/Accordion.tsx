'use client';

import { AccordionContent } from './components/AccordionContent';
import { AccordionItem } from './components/AccordionItem';
import { AccordionRoot } from './components/AccordionRoot';
import { AccordionTrigger } from './components/AccordionTrigger';
import type { AccordionProps } from './types';

export const Accordion = ({
  className,
  items,
  children,
  ...rootProps
}: AccordionProps) => {
  return (
    <AccordionRoot className={className} {...rootProps}>
      {items !== undefined
        ? items.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              className={item.className}
            >
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))
        : children}
    </AccordionRoot>
  );
};
