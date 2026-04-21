'use client';

import { useMemo } from 'react';

import { HomeLandingQuery } from '@/shared/api/generated/graphql';
import { cn } from '@/shared/lib/styles/cn';
import { Badge } from '@/shared/ui/Badge/Badge';
import { PageSection } from '@/shared/ui/PageSection/PageSection';
import { PageSectionBody } from '@/shared/ui/PageSection/PageSectionBody';
import { PageSectionHeader } from '@/shared/ui/PageSection/PageSectionHeader';
import { Typography } from '@/shared/ui/Typography/Typography';

import { VISIBLE_COUNT } from '../lib/constants';
import { buildHomeTestimonials } from '../lib/utils/buildHomeTestimonials';
import { TestimonialCard } from './components/TestimonialCard';

interface HomeTestimonialsProps {
  data: HomeLandingQuery;
}

export const HomeTestimonials = ({ data }: HomeTestimonialsProps) => {
  const buildedTestimonials = useMemo(
    () => buildHomeTestimonials(data.users, data.products),
    [data.users, data.products],
  );

  const visible = buildedTestimonials.slice(0, VISIBLE_COUNT);

  if (!visible.length) {
    return null;
  }

  return (
    <PageSection
      aria-label="Customer reviews"
      className={cn(
        'relative min-w-0 -mx-[var(--spacing-layout)] w-[calc(100%+2*var(--spacing-layout))] max-w-none',
        'bg-muted/30 dark:bg-muted/20',
      )}
    >
      <PageSectionHeader
        className="px-[var(--spacing-layout)]"
        eyebrow={
          <Badge
            variant="outline"
            className="h-auto rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Reviews
          </Badge>
        }
        title={
          <Typography variant="h2" className="text-balance">
            Customers and teams trust us
          </Typography>
        }
        description="Demo reviews: names and avatars come from the user catalog; copy is illustrative."
      />

      <PageSectionBody className="flex flex-wrap justify-center gap-x-10 gap-y-8 px-[var(--spacing-layout)]">
        {visible.map((item) => (
          <TestimonialCard key={item.id} item={item} />
        ))}
      </PageSectionBody>
    </PageSection>
  );
};
