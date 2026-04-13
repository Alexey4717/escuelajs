import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/test/testing';

import { CategoryCard } from './CategoryCard';

const category = {
  __typename: 'Category' as const,
  id: 'cat-1',
  name: 'Электроника',
  slug: 'electronics',
  image: 'https://example.com/img.jpg',
};

const CATEGORY_DETAILS_LINK_TEST_ID = 'categoryCard__link__categoryDetails';

describe('CategoryCard', () => {
  it('рендерит ссылку на страницу категории', () => {
    renderWithProviders(<CategoryCard category={category} />);

    const link = screen.getByTestId(CATEGORY_DETAILS_LINK_TEST_ID);
    expect(link).toHaveAttribute('href', '/categories/cat-1');
  });
});
