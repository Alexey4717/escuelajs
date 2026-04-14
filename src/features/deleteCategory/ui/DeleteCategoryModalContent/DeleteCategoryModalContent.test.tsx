import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/testing';

import { DeleteCategoryModalContent } from './DeleteCategoryModalContent';

const useDeleteCategoryProductsGuardMock = vi.hoisted(() => vi.fn());

vi.mock('../../api/use-delete-category-products-guard', () => ({
  useDeleteCategoryProductsGuard: useDeleteCategoryProductsGuardMock,
}));

const defaultProps = {
  categoryId: '42',
  categoryName: 'Книги',
  closeModal: vi.fn(),
} as const;

describe('DeleteCategoryModalContent', () => {
  beforeEach(() => {
    useDeleteCategoryProductsGuardMock.mockReset();
  });

  it('показывает спиннер, пока идёт проверка товаров', () => {
    useDeleteCategoryProductsGuardMock.mockReturnValue({
      loading: true,
      error: false,
      hasProducts: false,
      guardReady: false,
    });

    renderWithProviders(<DeleteCategoryModalContent {...defaultProps} />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(
      screen.queryByText(/Вы действительно хотите удалить категорию/i),
    ).not.toBeInTheDocument();
  });

  it('при ошибке проверки показывает сообщение о сбое', () => {
    useDeleteCategoryProductsGuardMock.mockReturnValue({
      loading: false,
      error: true,
      hasProducts: false,
      guardReady: false,
    });

    renderWithProviders(<DeleteCategoryModalContent {...defaultProps} />);

    expect(
      screen.getByText(/Не удалось проверить наличие товаров в категории/i),
    ).toBeInTheDocument();
  });

  it('если в категории есть товары — блокирует удаление и объясняет причину', () => {
    useDeleteCategoryProductsGuardMock.mockReturnValue({
      loading: false,
      error: false,
      hasProducts: true,
      guardReady: true,
    });

    renderWithProviders(<DeleteCategoryModalContent {...defaultProps} />);

    expect(
      screen.getByText(/нельзя удалить: в ней есть товары/i),
    ).toBeInTheDocument();
    expect(screen.getByText('Книги')).toBeInTheDocument();
    expect(
      screen.queryByText(/Вы действительно хотите удалить категорию/i),
    ).not.toBeInTheDocument();
  });

  it('пока охрана не готова — не блокирует по одному лишь hasProducts', () => {
    useDeleteCategoryProductsGuardMock.mockReturnValue({
      loading: false,
      error: false,
      hasProducts: true,
      guardReady: false,
    });

    renderWithProviders(<DeleteCategoryModalContent {...defaultProps} />);

    expect(
      screen.getByText(/Вы действительно хотите удалить категорию/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/нельзя удалить: в ней есть товары/i),
    ).not.toBeInTheDocument();
  });

  it('если товаров нет — показывает стандартное подтверждение удаления', () => {
    useDeleteCategoryProductsGuardMock.mockReturnValue({
      loading: false,
      error: false,
      hasProducts: false,
      guardReady: true,
    });

    renderWithProviders(<DeleteCategoryModalContent {...defaultProps} />);

    expect(
      screen.getByText(/Вы действительно хотите удалить категорию/i),
    ).toBeInTheDocument();
    expect(screen.getByText('Книги')).toBeInTheDocument();
    expect(
      screen.queryByText(/нельзя удалить: в ней есть товары/i),
    ).not.toBeInTheDocument();
  });
});
