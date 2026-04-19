import { type RefObject, useEffect, useState } from 'react';

/**
 * Возвращает true, если у элемента scrollTop больше порога.
 */
export const useScrollPastThreshold = (
  scrollRef: RefObject<HTMLElement | null>,
  thresholdPx: number,
): boolean => {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      setPast(el.scrollTop > thresholdPx);
    };
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [scrollRef, thresholdPx]);

  return past;
};
