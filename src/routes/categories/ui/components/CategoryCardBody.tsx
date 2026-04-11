import type { CategoriesQuery } from '@/shared/api/generated/graphql';
import { cn } from '@/shared/lib/styles/cn';
import { AppImage } from '@/shared/ui/AppImage/AppImage';
import { Card } from '@/shared/ui/Card/Card';

export interface CategoryCardBodyProps {
  category: CategoriesQuery['categories'][number];
}

export const CategoryCardBody = ({ category }: CategoryCardBodyProps) => (
  <Card
    role="article"
    aria-label={category.name}
    className={cn(
      'h-full gap-0 border border-border p-0 ring-0 shadow-sm',
      'cursor-default select-none',
    )}
    cover={
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {category.image ? (
          <AppImage
            src={category.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
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
