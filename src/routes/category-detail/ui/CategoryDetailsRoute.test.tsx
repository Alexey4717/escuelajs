import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/testing';

import { CategoryDetailsRoute } from './CategoryDetailsRoute';

const { useSuspenseQueryMock } = vi.hoisted(() => ({
  useSuspenseQueryMock: vi.fn(),
}));

const useCurrentUserRoleMock = vi.fn();

vi.mock('@apollo/client/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@apollo/client/react')>();
  return {
    ...actual,
    useSuspenseQuery: useSuspenseQueryMock,
  };
});

vi.mock('@/entities/Session', () => ({
  useCurrentUserRole: () => useCurrentUserRoleMock(),
}));

vi.mock('@/features/deleteCategory', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@/features/deleteCategory')>();
  return {
    ...actual,
    useDeleteCategoryModal: () => ({
      open: vi.fn(),
      close: vi.fn(),
      isOpen: false,
    }),
  };
});

const categoryPayload = {
  __typename: 'Category' as const,
  id: 'cat-1',
  name: 'Электроника',
  slug: 'electronics',
  image: 'https://example.com/img.jpg',
  creationAt: '2020-01-01T00:00:00.000Z',
  updatedAt: '2020-06-01T00:00:00.000Z',
};

describe('CategoryDetailsRoute', () => {
  beforeEach(() => {
    useSuspenseQueryMock.mockReset();
    useSuspenseQueryMock.mockReturnValue({
      data: { category: categoryPayload },
    });
    useCurrentUserRoleMock.mockReset();
  });

  it('показывает кнопки управления категорией для администратора', () => {
    useCurrentUserRoleMock.mockReturnValue({ role: 'admin', loading: false });

    renderWithProviders(<CategoryDetailsRoute categoryId="cat-1" />);

    const edit = screen.getByTestId('categoryDetail__link__editCategory');
    expect(edit).toHaveAttribute('href', '/categories/cat-1/edit');
    expect(
      screen.getByTestId('categoryDetail__button__openDeleteCategoryModal'),
    ).toHaveAccessibleName('Удалить');
  });

  it('не показывает кнопки управления пока загружается роль', () => {
    useCurrentUserRoleMock.mockReturnValue({ role: null, loading: true });

    renderWithProviders(<CategoryDetailsRoute categoryId="cat-1" />);

    expect(
      screen.queryByTestId('categoryDetail__link__editCategory'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('categoryDetail__button__openDeleteCategoryModal'),
    ).not.toBeInTheDocument();
  });

  it('не показывает кнопки управления не-администратору', () => {
    useCurrentUserRoleMock.mockReturnValue({
      role: 'customer',
      loading: false,
    });

    renderWithProviders(<CategoryDetailsRoute categoryId="cat-1" />);

    expect(
      screen.queryByTestId('categoryDetail__link__editCategory'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('categoryDetail__button__openDeleteCategoryModal'),
    ).not.toBeInTheDocument();
  });

  it('показывает название категории на странице', () => {
    useCurrentUserRoleMock.mockReturnValue({
      role: 'customer',
      loading: false,
    });

    renderWithProviders(<CategoryDetailsRoute categoryId="cat-1" />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Электроника' }),
    ).toBeInTheDocument();
  });
});
