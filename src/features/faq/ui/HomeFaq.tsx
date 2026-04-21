import { Accordion } from '@/shared/ui/Accordion/Accordion';
import { PageSection } from '@/shared/ui/PageSection/PageSection';
import { PageSectionBody } from '@/shared/ui/PageSection/PageSectionBody';
import { PageSectionHeader } from '@/shared/ui/PageSection/PageSectionHeader';
import { Typography } from '@/shared/ui/Typography/Typography';

import { FAQ_ITEMS } from '../lib/constants';
import { FaqColumn } from './FaqColumn';

const FAQ_COLUMN_LEFT = FAQ_ITEMS.slice(0, 4);
const FAQ_COLUMN_RIGHT = FAQ_ITEMS.slice(4);

export const HomeFaq = () => (
  <PageSection aria-labelledby="home-faq-heading">
    <PageSectionHeader
      eyebrow={
        <Typography
          variant="caption"
          component="p"
          className="inline-block rounded-full border border-border px-3 py-1 font-semibold uppercase tracking-wider text-muted-foreground"
        >
          FAQ
        </Typography>
      }
      titleId="home-faq-heading"
      title="Still have questions?"
      description="Sign-in, shared catalog, demo cart and checkout, roles — including switching your role from Profile — and support: answers newcomers ask most."
    />

    <PageSectionBody>
      <div className="flex justify-center">
        <Accordion
          type="single"
          collapsible
          className="grid w-full max-w-4xl grid-cols-1 items-start gap-x-10 md:grid-cols-2"
        >
          <FaqColumn items={FAQ_COLUMN_LEFT} />
          <FaqColumn items={FAQ_COLUMN_RIGHT} />
        </Accordion>
      </div>
    </PageSectionBody>
  </PageSection>
);
