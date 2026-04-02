'use client';

import { useAppStore } from '@/shared/lib/store';

export function useCurrentUserId(): string | null {
  return useAppStore((s) => s.currentUserId);
}
