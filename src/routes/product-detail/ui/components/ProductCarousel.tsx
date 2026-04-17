'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/shared/lib/styles/cn';
import { AppImage } from '@/shared/ui/AppImage/AppImage';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui/Carousel/Carousel';

/** Рамка внутри border-box — не режется `overflow-x-auto` у ряда (в отличие от `ring` + `ring-offset`). */
const thumbSelected =
  'border-[oklch(52%_0.14_42deg)] dark:border-[oklch(68%_0.12_45deg)]';

interface ProductCarouselProps {
  hasMultiple: boolean;
  images: string[];
  productTitle: string;
}

export const ProductCarousel = ({
  hasMultiple,
  images,
  productTitle,
}: ProductCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <>
      <Carousel
        className="w-full"
        opts={{ loop: hasMultiple, align: 'start' }}
        setApi={setApi}
      >
        <div className="relative">
          <CarouselContent className="-ml-0">
            {images.map((src, index) => (
              <CarouselItem key={`${src}-${index}`} className="basis-full pl-0">
                <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border/60 bg-muted">
                  <AppImage
                    src={src}
                    alt={`${productTitle} — image ${index + 1}`}
                    className="absolute inset-0 size-full object-cover"
                    draggable={false}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {hasMultiple ? (
            <>
              <CarouselPrevious
                variant="outline"
                size="icon-sm"
                className="top-1/2 left-3 z-10 -translate-y-1/2 border-border/80 bg-background/90 shadow-sm backdrop-blur-sm dark:bg-card/90"
              />
              <CarouselNext
                variant="outline"
                size="icon-sm"
                className="top-1/2 right-3 z-10 -translate-y-1/2 border-border/80 bg-background/90 shadow-sm backdrop-blur-sm dark:bg-card/90"
              />
            </>
          ) : null}
        </div>
      </Carousel>

      {hasMultiple ? (
        <div
          className="mt-4 flex justify-center gap-2 overflow-x-auto p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Image thumbnails"
        >
          {images.map((src, index) => (
            <button
              key={`${src}-thumb-${index}`}
              type="button"
              role="tab"
              aria-selected={selectedIndex === index}
              className={cn(
                'relative size-16 shrink-0 overflow-hidden rounded-xl border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                selectedIndex === index && thumbSelected,
              )}
              onClick={() => api?.scrollTo(index)}
            >
              <AppImage
                src={src}
                alt=""
                className="size-full object-cover"
                draggable={false}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      ) : null}
    </>
  );
};
