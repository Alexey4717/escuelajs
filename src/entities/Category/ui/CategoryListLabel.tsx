'use client';

import { Badge } from '@/shared/ui/Badge/Badge';

type CategoryListLabelProps = {
  className?: string;
  categoryName: string;
  categoryImg?: string;
};

export function CategoryListLabel({
  className,
  categoryName,
  categoryImg,
}: CategoryListLabelProps) {
  return (
    <Badge variant="secondary" className={className}>
      {categoryImg && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={categoryImg}
          alt={categoryName}
          className="size-3 rounded-full"
        />
      )}
      {categoryName}
    </Badge>
  );
}
