'use client';

import { Slider as SliderPrimitive } from 'radix-ui';

import { cn } from '../../../lib/styles/cn';
import { sliderThumbClassName } from '../constants';

interface SliderThumbsProps {
  count: number;
  thumbClassName?: string;
}

export const SliderThumbs = ({ count, thumbClassName }: SliderThumbsProps) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <SliderPrimitive.Thumb
        key={index}
        data-slot="slider-thumb"
        className={cn(sliderThumbClassName, thumbClassName)}
      />
    ))}
  </>
);
