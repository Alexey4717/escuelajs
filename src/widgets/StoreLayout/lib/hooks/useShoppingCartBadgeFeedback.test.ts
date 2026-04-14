import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CART_BADGE_FEEDBACK_DURATION_MS } from '@/shared/lib/animations/cart-badge';

import { useShoppingCartBadgeFeedback } from './useShoppingCartBadgeFeedback';

describe('useShoppingCartBadgeFeedback', () => {
  it('при уменьшении count устанавливает tone=down и затем сбрасывает в neutral', async () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ count }) => useShoppingCartBadgeFeedback(count),
      {
        initialProps: { count: 2 },
      },
    );

    rerender({ count: 1 });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1);
    });

    expect(result.current.tone).toBe('down');
    expect(result.current.pulse).toBe(true);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(CART_BADGE_FEEDBACK_DURATION_MS);
    });
    expect(result.current.tone).toBe('neutral');
    expect(result.current.pulse).toBe(false);

    vi.useRealTimers();
  });
});
