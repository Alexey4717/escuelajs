import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/testing';

import { ProductDetailAdminActions } from './ProductDetailAdminActions';

const useCurrentUserRoleMock = vi.fn();
const { openDeleteModalMock } = vi.hoisted(() => ({
  openDeleteModalMock: vi.fn(),
}));

vi.mock('@/entities/Session', () => ({
  useCurrentUserRole: () => useCurrentUserRoleMock(),
}));

vi.mock('@/features/deleteProduct', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@/features/deleteProduct')>();
  return {
    ...actual,
    useDeleteProductModal: () => ({
      open: openDeleteModalMock,
      close: vi.fn(),
      isOpen: false,
    }),
  };
});

describe('ProductDetailAdminActions', () => {
  beforeEach(() => {
    useCurrentUserRoleMock.mockReset();
    openDeleteModalMock.mockReset();
  });

  it('не рендерит кнопки пока идёт загрузка роли', () => {
    useCurrentUserRoleMock.mockReturnValue({ role: null, loading: true });

    renderWithProviders(
      <ProductDetailAdminActions productId="p1" productTitle="Товар" />,
    );

    expect(
      screen.queryByTestId('productDetail__link__editProduct'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('productDetail__button__openDeleteProductModal'),
    ).not.toBeInTheDocument();
  });

  it('не рендерит кнопки для пользователя без роли admin', () => {
    useCurrentUserRoleMock.mockReturnValue({
      role: 'customer',
      loading: false,
    });

    renderWithProviders(
      <ProductDetailAdminActions productId="p1" productTitle="Товар" />,
    );

    expect(
      screen.queryByTestId('productDetail__link__editProduct'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('productDetail__button__openDeleteProductModal'),
    ).not.toBeInTheDocument();
  });

  it('показывает ссылки редактирования и удаления для администратора', () => {
    useCurrentUserRoleMock.mockReturnValue({ role: 'admin', loading: false });

    renderWithProviders(
      <ProductDetailAdminActions productId="prod-42" productTitle="Товар" />,
    );

    const edit = screen.getByTestId('productDetail__link__editProduct');
    expect(edit).toHaveAttribute('href', '/products/prod-42/edit');
    expect(
      screen.getByRole('link', { name: 'Редактировать' }),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('productDetail__button__openDeleteProductModal'),
    ).toHaveAccessibleName('Удалить');
  });
});
