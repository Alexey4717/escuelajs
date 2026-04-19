'use client';

import { type RefObject, useEffect } from 'react';

interface UseInfinityScrollOptions {
  callback?: () => void;
  triggerRef?: RefObject<HTMLElement>;
  wrapperRef?: RefObject<HTMLElement>;
}

export const useInfinityScroll = ({
  callback,
  triggerRef,
  wrapperRef,
}: UseInfinityScrollOptions) => {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const wrapperElement = wrapperRef?.current || null;
    const triggerElement = triggerRef?.current;

    if (callback && triggerElement) {
      const options = {
        root: wrapperElement,
        rootMargin: '0px',
        threshold: 1.0,
      };

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      observer.observe(triggerElement);
    }

    return () => {
      if (observer && triggerElement) {
        observer.unobserve(triggerElement);
      }
    };
  }, [callback, triggerRef, wrapperRef]);
};
