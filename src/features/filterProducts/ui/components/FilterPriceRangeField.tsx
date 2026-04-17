import { NetworkStatus } from '@apollo/client';

import { cn } from '@/shared/lib/styles/cn';
import { Slider } from '@/shared/ui/Slider/Slider';
import { Spinner } from '@/shared/ui/Spinner/Spinner';
import { textFieldLabelClassName } from '@/shared/ui/TextField/classNames';

import { useFilterPriceRangeField } from '../../lib/hooks/use-filter-price-range-field';
import { thumbLabelLeft } from '../../lib/utils/price-slider-thumb';
import {
  FILTER_PRICE_SLIDER_MAX,
  FILTER_PRICE_SLIDER_MIN,
  FILTER_PRICE_SLIDER_VALUE_CAP,
} from '../../model/constants';

interface FilterPriceRangeFieldProps {
  productsNetworkStatus: NetworkStatus;
  resetKey: number;
}

export function FilterPriceRangeField({
  productsNetworkStatus,
  resetKey,
}: FilterPriceRangeFieldProps) {
  const {
    priceRangeLocal,
    onPriceSliderChange,
    priceLoading,
    thumbMinFrac,
    thumbMaxFrac,
  } = useFilterPriceRangeField({ productsNetworkStatus, resetKey });

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label
        className={cn(textFieldLabelClassName, '!mb-0')}
        htmlFor="filter-price-slider"
      >
        Price
      </label>
      <div className="relative flex h-[38px] max-h-[38px] min-h-[38px] shrink-0 items-center">
        <Slider
          id="filter-price-slider"
          className="w-full"
          min={FILTER_PRICE_SLIDER_MIN}
          max={FILTER_PRICE_SLIDER_MAX}
          step={1}
          value={priceRangeLocal}
          onValueChange={onPriceSliderChange}
          aria-label="Price range"
        />
        {priceLoading ? (
          <div
            className={cn(
              'pointer-events-none absolute inset-0 flex items-center justify-center rounded-md bg-background/60',
            )}
            aria-hidden
          >
            <Spinner className="size-5 text-muted-foreground" />
          </div>
        ) : null}
      </div>
      <div className="relative -mt-1 min-h-5 w-full">
        <span
          className="absolute left-0 top-0 -translate-x-1/2 whitespace-nowrap text-xs tabular-nums text-muted-foreground"
          style={{ left: thumbLabelLeft(thumbMinFrac) }}
        >
          {priceRangeLocal[0]}
        </span>
        <span
          className="absolute left-0 top-0 -translate-x-1/2 whitespace-nowrap text-xs tabular-nums text-muted-foreground"
          style={{ left: thumbLabelLeft(thumbMaxFrac) }}
        >
          {priceRangeLocal[1] === FILTER_PRICE_SLIDER_MAX
            ? `> ${FILTER_PRICE_SLIDER_VALUE_CAP}`
            : priceRangeLocal[1]}
        </span>
      </div>
    </div>
  );
}
