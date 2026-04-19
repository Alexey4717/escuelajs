import Link from 'next/link';

import { type AppPath } from '@/shared/config/routes/types';
import { cn } from '@/shared/lib/styles/cn';
import { AppImage } from '@/shared/ui/AppImage/AppImage';

import { CategoryListLabel } from '@/entities/Category/@x/product';

interface ProductCardCoverLinkProps {
  href: AppPath;
  imageUrl?: string;
  categoryName?: string;
  dataOnboarding?: string;
}

export const ProductCardCoverLink = ({
  href,
  imageUrl,
  categoryName,
  dataOnboarding,
}: ProductCardCoverLinkProps) => (
  <Link
    prefetch={false}
    href={href}
    className={cn(
      'group/cover relative block w-full',
      'aspect-[4/3] min-h-[140px] sm:min-h-0 sm:aspect-[16/10] lg:aspect-[4/3]',
    )}
    data-onboarding={dataOnboarding}
  >
    {imageUrl ? (
      <AppImage
        key={`${href}:${imageUrl}`}
        src={imageUrl}
        alt="product image"
        disablePreload
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover/cover:scale-[1.02]"
      />
    ) : null}
    {categoryName ? (
      <CategoryListLabel
        categoryName={categoryName}
        className="absolute top-2 left-2"
      />
    ) : null}
  </Link>
);
