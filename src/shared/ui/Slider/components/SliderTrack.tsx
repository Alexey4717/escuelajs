'use client';

import { Slider as SliderPrimitive } from 'radix-ui';

import { cn } from '../../../lib/styles/cn';
import { sliderRangeClassName, sliderTrackClassName } from '../constants';

interface SliderTrackProps {
  trackClassName?: string;
  rangeClassName?: string;
}

export const SliderTrack = ({
  trackClassName,
  rangeClassName,
}: SliderTrackProps) => (
  <SliderPrimitive.Track
    data-slot="slider-track"
    className={cn(sliderTrackClassName, trackClassName)}
  >
    <SliderPrimitive.Range
      data-slot="slider-range"
      className={cn(sliderRangeClassName, rangeClassName)}
    />
  </SliderPrimitive.Track>
);
