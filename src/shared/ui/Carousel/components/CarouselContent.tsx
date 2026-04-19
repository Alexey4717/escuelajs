'use client';

import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';
import { useCarousel } from './CarouselContext';

export const CarouselContent = ({
  className,
  ...props
}: ComponentProps<'div'>) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className,
        )}
        {...props}
      />
    </div>
  );
};
