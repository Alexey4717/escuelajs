'use client';

import { AppImage } from '@/shared/ui/AppImage/AppImage';
import { Badge } from '@/shared/ui/Badge/Badge';

interface CategoryListLabelProps {
  className?: string;
  categoryName: string;
  categoryImg?: string;
}

export function CategoryListLabel({
  className,
  categoryName,
  categoryImg,
}: CategoryListLabelProps) {
  return (
    <Badge variant="secondary" className={className}>
      {categoryImg ? (
        <AppImage
          src={categoryImg}
          alt={categoryName}
          className="size-3 shrink-0 rounded-full align-middle"
        />
      ) : null}
      {categoryName}
    </Badge>
  );
}
