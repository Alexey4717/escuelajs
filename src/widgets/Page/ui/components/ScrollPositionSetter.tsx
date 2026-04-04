'use client';

import { type RefObject, useEffect, useLayoutEffect, useRef } from 'react';

import { usePathname } from 'next/navigation';

import { useInfinityScroll } from '@/shared/lib/hooks/use-infinity-scroll';
import { useThrottle } from '@/shared/lib/hooks/use-throttle';
import { useAppStore } from '@/shared/lib/store';

import { findScrollContainer } from '../../lib/utils/findScrollContainer';
import { ScrollPositionSetterProps } from './types';

/**
 * Оболочка контента: находит viewport ScrollArea, восстанавливает и по throttled
 * `scroll` сохраняет `scrollTop` в `scrollByPath[pathname]`. Так работает
 * сохранение скролла для **любой** страницы без виртуализации — достаточно обернуть
 * разметку в `Page`.
 *
 * Если на странице Virtuoso с `customScrollParent`, дополнительно подключите
 * `useVirtuosoScrollPersistence(pathname)` и передайте `restoreStateFrom` /
 * `onGridStateChanged` в Virtuoso (снимок измерений сетки).
 */
export const ScrollPositionSetter = (props: ScrollPositionSetterProps) => {
  const { className, children, onScrollEnd, mainRef: mainRefProp } = props;
  const mainRefFallback = useRef<HTMLElement | null>(null);
  const mainRef = mainRefProp ?? mainRefFallback;
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLDivElement>(
    undefined,
  ) as RefObject<HTMLDivElement>;
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  const setScrollPosition = useAppStore((s) => s.setScrollPosition);

  useLayoutEffect(() => {
    const main = mainRef.current;
    const el = findScrollContainer(main);
    scrollContainerRef.current = el;
    if (!el) return;
    const y = useAppStore.getState().scrollByPath[pathname] ?? 0;
    el.scrollTop = y;
  }, [pathname, mainRef]);

  useInfinityScroll({
    triggerRef,
    wrapperRef: scrollContainerRef as RefObject<HTMLElement>,
    callback: onScrollEnd,
  });

  const onScrollThrottled = useThrottle(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setScrollPosition(pathnameRef.current, el.scrollTop);
  }, 500);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', onScrollThrottled, { passive: true });
    return () => el.removeEventListener('scroll', onScrollThrottled);
    // pathname: после смены маршрута переподписываемся на тот же viewport
    // eslint-disable-next-line react-hooks/exhaustive-deps -- throttled handler стабилен по смыслу
  }, [pathname]);

  return (
    <main
      ref={mainRef}
      className={className}
      data-testid={props['data-testid'] ?? 'Page'}
    >
      {children}
      {onScrollEnd ? <div className="h-20 m-10" ref={triggerRef} /> : null}
    </main>
  );
};
