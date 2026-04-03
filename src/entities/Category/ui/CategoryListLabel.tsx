'use client';

import { Badge } from '@/shared/ui/Badge/Badge';

type CategoryListLabelProps = {
  categoryName: string;
  className?: string;
};

export function CategoryListLabel({
  categoryName,
  className,
}: CategoryListLabelProps) {
  return (
    <Badge variant="secondary" className={className}>
      {categoryName}
    </Badge>
  );
}
