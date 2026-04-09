import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { beforeEach, describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/test/testing';

import { RegisterRoute } from './RegisterRoute';

describe('RegisterRoute (integration)', () => {
  beforeEach(() => {
    mockRouter.push('/register?from=/profile');
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
