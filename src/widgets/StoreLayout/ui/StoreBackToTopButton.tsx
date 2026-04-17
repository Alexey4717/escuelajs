'use client';

import { type RefObject } from 'react';

import { ChevronUpIcon } from 'lucide-react';

import { Button } from '@/shared/ui/Button/Button';
import { Tooltip } from '@/shared/ui/Tooltip/Tooltip';

import { useScrollPastThreshold } from '../lib/hooks/useScrollPastThreshold';

const BACK_TO_TOP_SCROLL_THRESHOLD_PX = 500;

interface StoreBackToTopButtonProps {
  scrollRef: RefObject<HTMLDivElement | null>;
}

export function StoreBackToTopButton({ scrollRef }: StoreBackToTopButtonProps) {
  const visible = useScrollPastThreshold(
    scrollRef,
    BACK_TO_TOP_SCROLL_THRESHOLD_PX,
  );

  if (!visible) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex justify-end px-5">
      <Tooltip
        trigger={
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="pointer-events-auto shadow-md"
            aria-label="Наверх"
            onClick={() =>
              scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
            }
          >
            <ChevronUpIcon />
          </Button>
        }
        triggerProps={{ asChild: true }}
        content="Наверх"
      />
    </div>
  );
}
