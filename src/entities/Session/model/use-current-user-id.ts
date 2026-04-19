'use client';

import { useAppStore } from '@/shared/lib/store';

export const useCurrentUserId = (): string | null =>
  useAppStore((s) => s.currentUserId);
