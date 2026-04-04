'use client';

import {
  type ComponentProps,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';

import useEmblaCarousel from 'embla-carousel-react';

import { cn } from '../../lib/styles/cn';
import { CarouselContext } from './components/CarouselContext';
import type { CarouselApi, CarouselRootProps } from './types';

export function Carousel({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: ComponentProps<'div'> & CarouselRootProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) return;
    queueMicrotask(() => {
      onSelect(api);
    });
    api.on('reInit', onSelect);
    api.on('select', onSelect);

    return () => {
      api.off('reInit', onSelect);
      api.off('select', onSelect);
    };
  }, [api, onSelect]);

  const resolvedOrientation =
    orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal');

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        opts,
        orientation: resolvedOrientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn('relative', className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export { CarouselContent } from './components/CarouselContent';
export { CarouselItem } from './components/CarouselItem';
export { CarouselPrevious } from './components/CarouselPrevious';
export { CarouselNext } from './components/CarouselNext';
export { useCarousel } from './components/CarouselContext';
export type {
  CarouselApi,
  CarouselOptions,
  CarouselPlugin,
  CarouselRootProps,
} from './types';
