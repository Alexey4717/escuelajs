'use client';

import { type ComponentProps } from 'react';

import { ChevronLeftIcon } from 'lucide-react';

import { cn } from '../../../lib/styles/cn';
import { Button } from '../../Button/Button';
import { useCarousel } from './CarouselContext';

export function CarouselPrevious({
  className,
  variant = 'outline',
  size = 'icon-sm',
  ...props
}: ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        'absolute touch-manipulation rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -left-12 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}
