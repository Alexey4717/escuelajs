'use client';

import { Slider as SliderPrimitive } from 'radix-ui';

import { cn } from '../../lib/styles/cn';
import { SliderThumbs } from './components/SliderThumbs';
import { SliderTrack } from './components/SliderTrack';
import {
  DEFAULT_SLIDER_MAX,
  DEFAULT_SLIDER_MIN,
  sliderRootClassName,
} from './constants';
import { useSliderThumbCount } from './hooks/useSliderThumbCount';
import type { SliderProps } from './types';

export const Slider = ({
  className,
  defaultValue,
  value,
  min = DEFAULT_SLIDER_MIN,
  max = DEFAULT_SLIDER_MAX,
  trackClassName,
  rangeClassName,
  thumbClassName,
  ...props
}: SliderProps) => {
  const thumbCount = useSliderThumbCount(value, defaultValue, min, max);

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(sliderRootClassName, className)}
      {...props}
    >
      <SliderTrack
        rangeClassName={rangeClassName}
        trackClassName={trackClassName}
      />
      <SliderThumbs count={thumbCount} thumbClassName={thumbClassName} />
    </SliderPrimitive.Root>
  );
};
