import { createElement, type ReactNode } from 'react';

import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

import { getBrowserApolloClient } from '@/shared/api/apollo-client/auth/browser-apollo-client';

import { mswServer } from '../msw/server';
import { resetAppStore } from '../reset-app-store';

vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/navigation')>();
  const mockNav = await import('next-router-mock/navigation');
  return {
    ...actual,
    useRouter: mockNav.useRouter,
    usePathname: mockNav.usePathname,
    useSearchParams: mockNav.useSearchParams,
    useParams: mockNav.useParams,
    useSelectedLayoutSegment: mockNav.useSelectedLayoutSegment,
    useSelectedLayoutSegments: mockNav.useSelectedLayoutSegments,
  };
});

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) =>
    createElement('img', {
      ...props,
      alt: (props.alt as string) ?? '',
    }),
}));

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...rest
  }: {
    children?: ReactNode;
    href: string;
    [key: string]: unknown;
  }) => createElement('a', { href, ...rest }, children),
}));

vi.mock('@/shared/api/auth/clear-auth-session', () => ({
  clearAuthSession: vi.fn().mockResolvedValue(undefined),
}));

/** Без cookie refresh в тестах не сработает; иначе Error Link дернёт `RefreshToken` без handler в MSW. */
vi.mock('@/shared/api/apollo-client/auth/refresh-token', () => ({
  refreshTokensOnce: vi.fn(() => Promise.resolve(false)),
}));

vi.mock('sonner', async (importOriginal) => {
  const actual = await importOriginal<typeof import('sonner')>();
  return {
    ...actual,
    toast: {
      ...actual.toast,
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

beforeAll(() => {
  /** jsdom: `@radix-ui/react-scroll-area` вызывает ResizeObserver в layout effect. */
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = class ResizeObserver {
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
    } as typeof ResizeObserver;
  }

  if (typeof window !== 'undefined' && !window.matchMedia) {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  }
  mswServer.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  getBrowserApolloClient()?.resetStore();
  cleanup();
  mswServer.resetHandlers();
  resetAppStore();
});

afterAll(() => {
  mswServer.close();
});
