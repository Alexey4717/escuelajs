'use client';

import { useEffect, useRef, useState } from 'react';

import { CART_BADGE_FEEDBACK_DURATION_MS } from '@/shared/lib/animations/cart-badge';

export type CartBadgeFeedbackTone = 'neutral' | 'up' | 'down';

export const useShoppingCartBadgeFeedback = (
  count: number,
): {
  tone: CartBadgeFeedbackTone;
  pulse: boolean;
  feedbackDurationMs: number;
  /** Пока true — Badge остаётся видимым при переходе count → 0 (плавное исчезновение). */
  showBadge: boolean;
  /** Число на Badge (при выходе — последнее ненулевое до обнуления). */
  badgeCount: number;
} => {
  const prev = useRef<number | null>(null);
  const [tone, setTone] = useState<CartBadgeFeedbackTone>('neutral');
  const [pulse, setPulse] = useState(false);
  const [badgeExitValue, setBadgeExitValue] = useState<number | null>(null);

  useEffect(() => {
    if (prev.current === null) {
      prev.current = count;
      return;
    }
    if (prev.current === count) {
      return;
    }

    const from = prev.current;
    prev.current = count;

    const direction: CartBadgeFeedbackTone = count > from ? 'up' : 'down';

    if (count === 0 && from > 0) {
      setBadgeExitValue(from);
    } else if (count > 0) {
      setBadgeExitValue(null);
    }

    let resetTid: number | undefined;
    const startTid = window.setTimeout(() => {
      setTone(direction);
      setPulse(true);
      resetTid = window.setTimeout(() => {
        setTone('neutral');
        setPulse(false);
      }, CART_BADGE_FEEDBACK_DURATION_MS);
    }, 0);

    let exitClearTid: number | undefined;
    if (count === 0 && from > 0) {
      exitClearTid = window.setTimeout(() => {
        setBadgeExitValue(null);
      }, CART_BADGE_FEEDBACK_DURATION_MS);
    }

    return () => {
      window.clearTimeout(startTid);
      if (resetTid !== undefined) {
        window.clearTimeout(resetTid);
      }
      if (exitClearTid !== undefined) {
        window.clearTimeout(exitClearTid);
      }
    };
  }, [count]);

  const showBadge = count > 0 || badgeExitValue !== null;
  const badgeCount = count > 0 ? count : (badgeExitValue ?? 0);

  return {
    tone,
    pulse,
    feedbackDurationMs: CART_BADGE_FEEDBACK_DURATION_MS,
    showBadge,
    badgeCount,
  };
};
