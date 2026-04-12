import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { graphql, HttpResponse } from 'msw';
import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  mswServer,
  renderWithProviders,
  TEST_GRAPHQL_HTTP_URL,
  TEST_USER_ID,
} from '@/test/testing';

import { useAppStore } from '@/shared/lib/store';

import { ChangeCurrentPasswordCard } from './ChangeCurrentPasswordCard';

const gql = graphql.link(TEST_GRAPHQL_HTTP_URL);

describe('ChangeCurrentPasswordCard (integration)', () => {
  beforeEach(() => {
    useAppStore.setState({ currentUserId: TEST_USER_ID });
    vi.mocked(toast.success).mockClear();
    vi.mocked(toast.error).mockClear();
  });

  async function waitForFormReady() {
    await waitFor(() => {
      expect(
        screen.getByTestId('changeCurrentPassword__input__currentPassword'),
      ).not.toBeDisabled();
    });
    return screen.getByTestId('changeCurrentPassword__input__currentPassword');
  }

  /** Раньше в конце файла после сценария успешной смены пароля давал ложное «неверный текущий»; держим до успешного submit. */
  it('показывает toast об ошибке при неудачной мутации UpdateUser', async () => {
    const user = userEvent.setup();
    mswServer.use(
      gql.mutation('UpdateUser', () =>
        HttpResponse.json({
          data: null,
          errors: [{ message: 'Update failed' }],
        }),
      ),
    );

    renderWithProviders(<ChangeCurrentPasswordCard />);

    const current = await waitForFormReady();
    await user.type(current, 'password123');
    await user.type(
      screen.getByTestId('changeCurrentPassword__input__password'),
      'newpass88',
    );
    await user.click(
      screen.getByTestId('changeCurrentPassword__button__submit'),
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Не удалось изменить пароль');
    });
    expect(toast.success).not.toHaveBeenCalled();
  });

  it('показывает ошибку при неверном текущем пароле', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ChangeCurrentPasswordCard />);

    const current = await waitForFormReady();
    await user.type(current, 'wrongpass1');
    await user.type(
      screen.getByTestId('changeCurrentPassword__input__password'),
      'newpass99',
    );
    await user.click(
      screen.getByTestId('changeCurrentPassword__button__submit'),
    );

    expect(
      await screen.findByText('Неверный текущий пароль'),
    ).toBeInTheDocument();
  });

  it('показывает ошибку если новый пароль совпадает с текущим', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ChangeCurrentPasswordCard />);

    const current = await waitForFormReady();
    await user.type(current, 'password123');
    await user.type(
      screen.getByTestId('changeCurrentPassword__input__password'),
      'password123',
    );
    await user.click(
      screen.getByTestId('changeCurrentPassword__button__submit'),
    );

    expect(
      await screen.findByText('Новый пароль должен отличаться от текущего'),
    ).toBeInTheDocument();
  });

  it('показывает ошибку Zod при не-ASCII в новом пароле', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ChangeCurrentPasswordCard />);

    const current = await waitForFormReady();
    await user.type(current, 'password123');
    await user.type(
      screen.getByTestId('changeCurrentPassword__input__password'),
      'пароль12',
    );
    await user.click(
      screen.getByTestId('changeCurrentPassword__button__submit'),
    );

    expect(
      await screen.findByText('Допускается латиница, цифры и символы'),
    ).toBeInTheDocument();
  });

  it('успешно меняет пароль и показывает toast', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ChangeCurrentPasswordCard />);

    const current = await waitForFormReady();
    await user.type(current, 'password123');
    await user.type(
      screen.getByTestId('changeCurrentPassword__input__password'),
      'newpass99',
    );
    await user.click(
      screen.getByTestId('changeCurrentPassword__button__submit'),
    );

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Пароль успешно изменен');
    });
    expect(toast.error).not.toHaveBeenCalled();
  });
});
