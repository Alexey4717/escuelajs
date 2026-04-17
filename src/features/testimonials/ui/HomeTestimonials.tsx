'use client';

import { useMemo } from 'react';

import { HomeLandingQuery } from '@/shared/api/generated/graphql';
import { cn } from '@/shared/lib/styles/cn';
import { Badge } from '@/shared/ui/Badge/Badge';
import { Typography } from '@/shared/ui/Typography/Typography';

import { VISIBLE_COUNT } from '../lib/constants';
import { buildHomeTestimonials } from '../lib/utils/buildHomeTestimonials';
import { TestimonialCard } from './components/TestimonialCard';

interface HomeTestimonialsProps {
  data: HomeLandingQuery;
}

export function HomeTestimonials({ data }: HomeTestimonialsProps) {
  const buildedTestimonials = useMemo(
    () => buildHomeTestimonials(data.users, data.products),
    [data.users, data.products],
  );

  const visible = buildedTestimonials.slice(0, VISIBLE_COUNT);

  if (!visible.length) {
    return null;
  }

  return (
    <section
      aria-label="Customer reviews"
      className={cn(
        'relative min-w-0 space-y-8 py-10',
        '-mx-[var(--spacing-layout)] w-[calc(100%+2*var(--spacing-layout))] max-w-none',
        'border-y border-border bg-muted/30 dark:bg-muted/20',
      )}
    >
      <div className="px-[var(--spacing-layout)] text-center">
        <Badge
          variant="outline"
          className="mb-3 h-auto rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Reviews
        </Badge>
        <Typography variant="h2" className="text-balance">
          Customers and teams trust us
        </Typography>
        <Typography variant="muted" className="mx-auto mt-2 max-w-xl">
          Demo reviews: names and avatars come from the user catalog; copy is
          illustrative.
        </Typography>
      </div>

      <div className="flex flex-wrap justify-center gap-x-10 gap-y-8 px-[var(--spacing-layout)]">
        {visible.map((item) => (
          <TestimonialCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
