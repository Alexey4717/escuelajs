import type { CategoriesQuery } from '@/shared/api/generated/graphql';
import { cn } from '@/shared/lib/styles/cn';
import { Card } from '@/shared/ui/Card/Card';

type Category = CategoriesQuery['categories'][number];

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
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
            // URL из API с разных доменов — без next/image remotePatterns
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={category.image}
              alt=""
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
}
