import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/testing';

import { DeleteCategoryModalFooter } from './DeleteCategoryModalFooter';

const useDeleteCategoryProductsGuardMock = vi.hoisted(() => vi.fn());
const useDeleteCategorySubmitHandlerMock = vi.hoisted(() =>
  vi.fn(() => ({
    submitDelete: vi.fn(),
    loading: false,
  })),
);

vi.mock('../../api/use-delete-category-products-guard', () => ({
  useDeleteCategoryProductsGuard: useDeleteCategoryProductsGuardMock,
}));

vi.mock('../../api/use-delete-category-submit-handler', () => ({
  useDeleteCategorySubmitHandler: useDeleteCategorySubmitHandlerMock,
}));

const defaultProps = {
  categoryId: '42',
  categoryName: 'Книги',
  closeModal: vi.fn(),
} as const;

describe('DeleteCategoryModalFooter', () => {
  beforeEach(() => {
    useDeleteCategoryProductsGuardMock.mockReset();
    useDeleteCategorySubmitHandlerMock.mockReset();
    useDeleteCategorySubmitHandlerMock.mockReturnValue({
      submitDelete: vi.fn(),
      loading: false,
    });
  });

  it('не показывает кнопку «Удалить», пока идёт проверка товаров', () => {
    useDeleteCategoryProductsGuardMock.mockReturnValue({
      loading: true,
      error: false,
      hasProducts: false,
      guardReady: false,
    });

    renderWithProviders(<DeleteCategoryModalFooter {...defaultProps} />);

    expect(
      screen.queryByTestId('deleteCategory__button__deleteCategory'),
    ).not.toBeInTheDocument();
    expect(
      screen.getByTestId('deleteCategory__button__closeModal'),
    ).toBeInTheDocument();
  });

  it('при ошибке проверки показывает только «Отмена»', () => {
    useDeleteCategoryProductsGuardMock.mockReturnValue({
      loading: false,
      error: true,
      hasProducts: false,
      guardReady: false,
    });

    renderWithProviders(<DeleteCategoryModalFooter {...defaultProps} />);

    expect(
      screen.queryByTestId('deleteCategory__button__deleteCategory'),
    ).not.toBeInTheDocument();
  });

  it('если в категории есть товары — блокирует кнопку удаления', () => {
    useDeleteCategoryProductsGuardMock.mockReturnValue({
      loading: false,
      error: false,
      hasProducts: true,
      guardReady: true,
    });

    renderWithProviders(<DeleteCategoryModalFooter {...defaultProps} />);

    expect(
      screen.queryByTestId('deleteCategory__button__deleteCategory'),
    ).not.toBeInTheDocument();
  });

  it('если товаров нет — показывает «Удалить» и «Отмена»', () => {
    useDeleteCategoryProductsGuardMock.mockReturnValue({
      loading: false,
      error: false,
      hasProducts: false,
      guardReady: true,
    });

    renderWithProviders(<DeleteCategoryModalFooter {...defaultProps} />);

    expect(
      screen.getByTestId('deleteCategory__button__deleteCategory'),
    ).toHaveAccessibleName('Удалить');
    expect(
      screen.getByTestId('deleteCategory__button__closeModal'),
    ).toHaveAccessibleName('Отмена');
  });
});
