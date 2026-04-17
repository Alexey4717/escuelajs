import { Accordion } from '@/shared/ui/Accordion/Accordion';
import { Typography } from '@/shared/ui/Typography/Typography';

import { FAQ_ITEMS } from '../lib/constants';

export const HomeFaq = () => {
  return (
    <section aria-labelledby="home-faq-heading" className="space-y-8">
      <div>
        <Typography
          variant="caption"
          component="p"
          className="mb-3 inline-block rounded-full border border-border px-3 py-1 font-semibold uppercase tracking-wider text-muted-foreground"
        >
          FAQ
        </Typography>
        <Typography id="home-faq-heading" variant="h2">
          Still have questions?
        </Typography>
        <Typography variant="muted" className="mt-2 max-w-xl">
          A quick primer on sign-in, the catalog, and roles — what new users ask
          most often.
        </Typography>
      </div>

      <Accordion
        type="single"
        collapsible
        className="block w-full columns-1 gap-x-10 gap-y-0 md:columns-2"
        items={FAQ_ITEMS.map((item) => ({
          value: item.id,
          className: 'mb-6 break-inside-avoid pb-2',
          trigger: (
            <span className="min-w-0 flex-1 text-base font-semibold">
              {item.q}
            </span>
          ),
          content: (
            <Typography
              variant="body2"
              className="text-pretty text-muted-foreground"
            >
              {item.a}
            </Typography>
          ),
        }))}
      />
    </section>
  );
};
