import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/testing';

import { ClearCartButton } from './ClearCartButton';

describe('ClearCartButton', () => {
  it('вызывает onClear по клику', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();

    renderWithProviders(<ClearCartButton onClear={onClear} />);

    await user.click(screen.getByTestId('cartRoute__button__clearCart'));

    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
