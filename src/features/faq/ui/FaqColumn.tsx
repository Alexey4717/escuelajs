import { AccordionContent } from '@/shared/ui/Accordion/components/AccordionContent';
import { AccordionItem } from '@/shared/ui/Accordion/components/AccordionItem';
import { AccordionTrigger } from '@/shared/ui/Accordion/components/AccordionTrigger';
import { Typography } from '@/shared/ui/Typography/Typography';

import { FaqItem } from '../lib/types';

interface FaqColumnProps {
  items: readonly FaqItem[];
}

export const FaqColumn = ({ items }: FaqColumnProps) => (
  <div className="flex min-w-0 flex-col">
    {items.map((item) => (
      <AccordionItem
        key={item.id}
        value={item.id}
        className="mb-6 pb-2 not-last:border-b"
      >
        <AccordionTrigger>
          <span className="min-w-0 flex-1 text-base font-semibold">
            {item.q}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <Typography
            variant="body2"
            className="text-pretty text-muted-foreground"
          >
            {item.a}
          </Typography>
        </AccordionContent>
      </AccordionItem>
    ))}
  </div>
);
