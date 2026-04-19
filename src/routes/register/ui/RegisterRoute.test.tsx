import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/testing';

import { RegisterRoute } from './RegisterRoute';

describe('RegisterRoute (integration)', () => {
  beforeEach(() => {
    mockRouter.push('/register?from=/profile');
    vi.stubGlobal('location', {
      ancestorOrigins: {} as DOMStringList,
      href: 'http://localhost:3000/register?from=%2Fprofile',
      origin: 'http://localhost:3000',
      protocol: 'http:',
      host: 'localhost:3000',
      hostname: 'localhost',
      port: '3000',
      pathname: '/register',
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

  it('registers user and navigates to from path', async () => {
    const user = userEvent.setup();
    renderWithProviders(<RegisterRoute />);

    await user.type(screen.getByTestId('register__input__name'), 'Иван Иванов');
    await user.type(
      screen.getByTestId('register__input__email'),
      'new@example.com',
    );
    await user.type(
      screen.getByTestId('register__input__password'),
      'secret12',
    );
    await user.type(
      screen.getByTestId('register__input__confirm-password'),
      'secret12',
    );

    await user.click(screen.getByTestId('register__button__submit'));

    await waitFor(
      () => {
        expect(mockRouter.asPath).toBe('/profile');
      },
      { timeout: 10_000 },
    );
  });
});
