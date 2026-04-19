import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/testing';

import { LoginRoute } from './LoginRoute';

describe('LoginRoute (integration)', () => {
  beforeEach(() => {
    mockRouter.push('/login?from=/profile');
    vi.stubGlobal('location', {
      ancestorOrigins: {} as DOMStringList,
      href: 'http://localhost:3000/login?from=%2Fprofile',
      origin: 'http://localhost:3000',
      protocol: 'http:',
      host: 'localhost:3000',
      hostname: 'localhost',
      port: '3000',
      pathname: '/login',
      search: '?from=%2Fprofile',
      hash: '',
      assign: (url: string | URL) => {
        mockRouter.replace(String(url));
      },
      replace: vi.fn(),
      reload: vi.fn(),
    } as unknown as Location);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('submits credentials and navigates to from path', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginRoute />);

    await user.type(
      screen.getByTestId('login__input__email'),
      'user@example.com',
    );
    await user.type(
      screen.getByTestId('login__input__password'),
      'password123',
    );

    await user.click(screen.getByTestId('login__button__submit'));

    await waitFor(() => {
      expect(mockRouter.asPath).toBe('/profile');
    });
  });
});
