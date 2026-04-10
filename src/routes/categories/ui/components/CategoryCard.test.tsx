import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/testing';

import { CategoryCard } from './CategoryCard';

const { openDeleteCategoryModalMock } = vi.hoisted(() => ({
  openDeleteCategoryModalMock: vi.fn(),
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

const EDIT_CATEGORY_TEST_ID = 'categoryCard__link__editCategory';
const OPEN_DELETE_MODAL_TEST_ID =
  'categoryCard__button__openDeleteCategoryModal';

const category = {
  __typename: 'Category' as const,
  id: 'cat-1',
  name: 'Электроника',
  slug: 'electronics',
  image: 'https://example.com/img.jpg',
};

describe('CategoryCard', () => {
  beforeEach(() => {
    openDeleteCategoryModalMock.mockReset();
  });

  it('не показывает кнопки редактирования и удаления без canManageCategories', () => {
    renderWithProviders(
      <CategoryCard category={category} canManageCategories={false} />,
    );

    expect(screen.queryByTestId(EDIT_CATEGORY_TEST_ID)).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(OPEN_DELETE_MODAL_TEST_ID),
    ).not.toBeInTheDocument();
  });

  it('по умолчанию не показывает кнопки управления (canManageCategories опущен)', () => {
    renderWithProviders(<CategoryCard category={category} />);

    expect(screen.queryByTestId(EDIT_CATEGORY_TEST_ID)).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(OPEN_DELETE_MODAL_TEST_ID),
    ).not.toBeInTheDocument();
  });

  it('показывает ссылку на редактирование и удаление для админа (canManageCategories)', () => {
    renderWithProviders(
      <CategoryCard category={category} canManageCategories />,
    );

    const edit = screen.getByTestId(EDIT_CATEGORY_TEST_ID);
    expect(edit).toHaveAttribute('href', '/categories/cat-1/edit');

    expect(screen.getByTestId(OPEN_DELETE_MODAL_TEST_ID)).toBeInTheDocument();
  });

  it('по клику на удаление открывает модалку с id и именем категории', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <CategoryCard category={category} canManageCategories />,
    );

    await user.click(screen.getByTestId(OPEN_DELETE_MODAL_TEST_ID));

    expect(openDeleteCategoryModalMock).toHaveBeenCalledTimes(1);
    expect(openDeleteCategoryModalMock).toHaveBeenCalledWith({
      categoryId: 'cat-1',
      categoryName: category.name,
    });
  });
});
