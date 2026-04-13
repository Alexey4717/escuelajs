import type { CategoriesQuery } from '@/shared/api/generated/graphql';
import { cn } from '@/shared/lib/styles/cn';
import { AppImage } from '@/shared/ui/AppImage/AppImage';
import { Card } from '@/shared/ui/Card/Card';

export interface CategoryCardBodyProps {
  category: CategoriesQuery['categories'][number];
  className?: string;
}

export const CategoryCardBody = ({
  category,
  className,
}: CategoryCardBodyProps) => (
  <Card
    role="article"
    aria-label={category.name}
    className={cn(
      'h-full gap-0 border border-border p-0 ring-0 shadow-sm transition',
      'hover:border-primary/40',
      'cursor-default select-none',
      className,
    )}
    cover={
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {category.image ? (
          <AppImage
            src={category.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground"
            aria-hidden
          >
            —
          </div>
        )}
      </div>
    }
    title={
      <span className="font-heading text-base font-semibold leading-snug">
        {category.name}
      </span>
    }
  />
);
