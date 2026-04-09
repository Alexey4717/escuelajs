import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { beforeEach, describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/test/testing';

import { LoginRoute } from './LoginRoute';

describe('LoginRoute (integration)', () => {
  beforeEach(() => {
    mockRouter.push('/login?from=/profile');
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
