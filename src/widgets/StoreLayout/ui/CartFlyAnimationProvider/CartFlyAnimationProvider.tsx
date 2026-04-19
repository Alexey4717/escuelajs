'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { createPortal } from 'react-dom';

import {
  CART_FLY_ARC_OFFSET_PX,
  CART_FLY_DURATION_MS,
  CartFlyContext,
  type CartFlyLineItem,
} from '@/shared/lib/animations/cart-fly';

import { useCartStore } from '@/entities/Cart';

type Particle = {
  id: number;
  sx: number;
  sy: number;
  tx: number;
  ty: number;
};

/** Только визуал; commit в стор делает `setTimeout` в провайдере (устойчиво к Strict Mode / отмене WAAPI). */
const CartFlyParticle = ({
  sx,
  sy,
  tx,
  ty,
}: {
  sx: number;
  sy: number;
  tx: number;
  ty: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const dx = tx - sx;
    const dy = ty - sy;
    const len = Math.hypot(dx, dy);
    /** Нормаль к хорде (единичная), поворот на 90° — лёгкая дуга вбок, без рывка к верхнему краю. */
    const nx = len < 1e-6 ? 0 : -dy / len;
    const ny = len < 1e-6 ? 0 : dx / len;
    const mx = (sx + tx) / 2 + nx * CART_FLY_ARC_OFFSET_PX;
    const my = (sy + ty) / 2 + ny * CART_FLY_ARC_OFFSET_PX;

    const margin = 8;
    const vw =
      typeof window !== 'undefined'
        ? window.innerWidth
        : Number.POSITIVE_INFINITY;
    const vh =
      typeof window !== 'undefined'
        ? window.innerHeight
        : Number.POSITIVE_INFINITY;
    const midX = Math.min(vw - margin, Math.max(margin, mx));
    const midY = Math.min(vh - margin, Math.max(margin, my));

    const anim = el.animate(
      [
        {
          transform: `translate(${sx}px, ${sy}px) translate(-50%, -50%) scale(1)`,
          opacity: 1,
        },
        {
          transform: `translate(${midX}px, ${midY}px) translate(-50%, -50%) scale(1.04)`,
          opacity: 1,
        },
        {
          transform: `translate(${tx}px, ${ty}px) translate(-50%, -50%) scale(0.92)`,
          opacity: 0.95,
        },
      ],
      {
        duration: CART_FLY_DURATION_MS,
        easing: 'cubic-bezier(0.33, 1, 0.68, 1)',
        fill: 'forwards',
      },
    );

    return () => {
      anim.cancel();
    };
  }, [sx, sy, tx, ty]);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-50 flex size-7 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground shadow-lg will-change-transform"
      aria-hidden
    >
      +1
    </div>
  );
};

export const CartFlyAnimationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const targetRef = useRef<HTMLElement | null>(null);
  const timeoutIdsRef = useRef<Map<number, number>>(new Map());
  const inFlightIdsRef = useRef<Set<string>>(new Set());
  const [particles, setParticles] = useState<Particle[]>([]);
  const [inFlightIds, setInFlightIds] = useState<Set<string>>(new Set());

  const registerCartFlyTarget = useCallback((element: HTMLElement | null) => {
    targetRef.current = element;
  }, []);

  const markProductFlight = useCallback(
    (productId: string, inFlight: boolean) => {
      if (inFlight) {
        inFlightIdsRef.current.add(productId);
      } else {
        inFlightIdsRef.current.delete(productId);
      }
      setInFlightIds(new Set(inFlightIdsRef.current));
    },
    [],
  );

  const scheduleAddWithFly = useCallback(
    (item: CartFlyLineItem, getSourceElement: () => HTMLElement | null) => {
      if (inFlightIdsRef.current.has(item.id)) {
        return;
      }

      const target = targetRef.current;
      const source = getSourceElement();

      if (!target || !source) {
        useCartStore.getState().addItem(item);
        return;
      }

      const sr = source.getBoundingClientRect();
      const tr = target.getBoundingClientRect();
      const sx = sr.left + sr.width / 2;
      const sy = sr.top + sr.height / 2;
      const tx = tr.left + tr.width / 2;
      const ty = tr.top + tr.height / 2;
      const flightId = Date.now() + Math.floor(Math.random() * 100000);

      markProductFlight(item.id, true);
      setParticles((prev) => [...prev, { id: flightId, sx, sy, tx, ty }]);

      const timeoutId = window.setTimeout(() => {
        timeoutIdsRef.current.delete(flightId);
        useCartStore.getState().addItem(item);
        setParticles((prev) =>
          prev.filter((particle) => particle.id !== flightId),
        );
        markProductFlight(item.id, false);
      }, CART_FLY_DURATION_MS);

      timeoutIdsRef.current.set(flightId, timeoutId);
    },
    [markProductFlight],
  );

  const isFlightInProgress = useCallback(
    (productId: string) => inFlightIds.has(productId),
    [inFlightIds],
  );

  useEffect(() => {
    const timeoutMap = timeoutIdsRef.current;
    const inFlightSet = inFlightIdsRef.current;

    return () => {
      for (const timeoutId of timeoutMap.values()) {
        window.clearTimeout(timeoutId);
      }
      timeoutMap.clear();
      inFlightSet.clear();
    };
  }, []);

  const value = useMemo(
    () => ({
      registerCartFlyTarget,
      scheduleAddWithFly,
      isFlightInProgress,
    }),
    [registerCartFlyTarget, scheduleAddWithFly, isFlightInProgress],
  );

  return (
    <CartFlyContext.Provider value={value}>
      {children}
      {typeof document !== 'undefined' &&
        particles.map((particle) =>
          createPortal(
            <CartFlyParticle
              key={particle.id}
              sx={particle.sx}
              sy={particle.sy}
              tx={particle.tx}
              ty={particle.ty}
            />,
            document.body,
          ),
        )}
    </CartFlyContext.Provider>
  );
};
