import type { ComponentProps } from 'react';

import { Slider as SliderPrimitive } from 'radix-ui';

export type SliderRootProps = ComponentProps<typeof SliderPrimitive.Root>;

export type SliderProps = SliderRootProps & {
  /** Дополнительные классы для трека. */
  trackClassName?: string;
  /** Дополнительные классы для заполненного диапазона. */
  rangeClassName?: string;
  /** Дополнительные классы для каждой ручки. */
  thumbClassName?: string;
};
