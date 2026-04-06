import Link from 'next/link';

import { cn } from '@/shared/lib/styles/cn';

import { CategoryListLabel } from '@/entities/Category/@x/product';

interface ProductCardCoverLinkProps {
  href: string;
  imageUrl?: string;
  categoryName?: string;
}

export const ProductCardCoverLink = ({
  href,
  imageUrl,
  categoryName,
}: ProductCardCoverLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'group/cover relative block w-full',
        'aspect-[4/3] min-h-[140px] sm:min-h-0 sm:aspect-[16/10] lg:aspect-[4/3]',
      )}
    >
      {imageUrl ? (
        // URL из API с разных доменов — без next/image remotePatterns
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt="product image"
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
};
