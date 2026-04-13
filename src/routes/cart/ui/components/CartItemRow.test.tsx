import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/testing';

import { CartItemRow } from './CartItemRow';

describe('CartItemRow', () => {
  it('вызывает onRemove с id товара по клику на удаление', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();

    renderWithProviders(
      <CartItemRow
        item={{
          id: 'prod-42',
          title: 'Classic Red Pullover Hoodie',
          price: 10,
          image: '',
        }}
        onRemove={onRemove}
      />,
    );

    await user.click(
      screen.getByTestId('cartRoute__button__removeItem_prod-42'),
    );

    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove).toHaveBeenCalledWith('prod-42');
  });
});
