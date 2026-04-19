import { cn } from '@/shared/lib/styles/cn';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Typography } from '@/shared/ui/Typography/Typography';

import { HomeTestimonial } from '../../lib/types';

interface TestimonialCardProps {
  item: HomeTestimonial;
}

export const TestimonialCard = ({ item }: TestimonialCardProps) => (
  <article
    className={cn(
      'flex w-full max-w-sm shrink-0 gap-4 border-l border-border pl-6 pr-2 sm:pl-8 sm:pr-4',
      'first:border-l-0 first:pl-0 sm:first:pl-0',
    )}
    aria-label={`Testimonial: ${item.name}`}
  >
    <Avatar
      className="size-11 shrink-0 rounded-full border border-border"
      src={item.avatarUrl ?? undefined}
      alt={item?.name ?? ''}
    />
    <div className="min-w-0 flex-1">
      <Typography
        component="p"
        variant="subtitle1"
        className="font-semibold text-foreground"
      >
        {item.name}
      </Typography>
      <Typography variant="caption" className="text-muted-foreground">
        {item.subtitle}
      </Typography>
      <Typography
        variant="body2"
        className="mt-3 text-pretty text-foreground/90"
      >
        {item.quote}
      </Typography>
    </div>
  </article>
);
