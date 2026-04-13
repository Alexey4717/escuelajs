import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/testing';

import { CategoryDetailAdminActions } from './CategoryDetailAdminActions';

const useCurrentUserRoleMock = vi.fn();
const { openDeleteCategoryModalMock } = vi.hoisted(() => ({
  openDeleteCategoryModalMock: vi.fn(),
}));

vi.mock('@/entities/Session', () => ({
  useCurrentUserRole: () => useCurrentUserRoleMock(),
}));

vi.mock('@/features/deleteCategory', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@/features/deleteCategory')>();
  return {
    ...actual,
    useDeleteCategoryModal: () => ({
      open: openDeleteCategoryModalMock,
      close: vi.fn(),
      isOpen: false,
    }),
  };
});

describe('CategoryDetailAdminActions', () => {
  beforeEach(() => {
    useCurrentUserRoleMock.mockReset();
    openDeleteCategoryModalMock.mockReset();
  });

  it('не рендерит кнопки пока идёт загрузка роли', () => {
    useCurrentUserRoleMock.mockReturnValue({ role: null, loading: true });

    renderWithProviders(
      <CategoryDetailAdminActions categoryId="c1" categoryName="Категория" />,
    );

    expect(
      screen.queryByTestId('categoryDetail__link__editCategory'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('categoryDetail__button__openDeleteCategoryModal'),
    ).not.toBeInTheDocument();
  });

  it('не рендерит кнопки для пользователя без роли admin', () => {
    useCurrentUserRoleMock.mockReturnValue({
      role: 'customer',
      loading: false,
    });

    renderWithProviders(
      <CategoryDetailAdminActions categoryId="c1" categoryName="Категория" />,
    );

    expect(
      screen.queryByTestId('categoryDetail__link__editCategory'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('categoryDetail__button__openDeleteCategoryModal'),
    ).not.toBeInTheDocument();
  });

  it('показывает ссылки редактирования и удаления для администратора', () => {
    useCurrentUserRoleMock.mockReturnValue({ role: 'admin', loading: false });

    renderWithProviders(
      <CategoryDetailAdminActions categoryId="cat-42" categoryName="Имя" />,
    );

    const edit = screen.getByTestId('categoryDetail__link__editCategory');
    expect(edit).toHaveAttribute('href', '/categories/cat-42/edit');
    expect(
      screen.getByRole('link', { name: 'Редактировать' }),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('categoryDetail__button__openDeleteCategoryModal'),
    ).toHaveAccessibleName('Удалить');
  });
});
