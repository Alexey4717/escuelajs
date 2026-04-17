import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders classic skeleton block without children', () => {
    const { container } = render(<Skeleton className="h-4 w-20" />);

    const skeleton = container.querySelector('[data-slot="skeleton"]');
    expect(skeleton).not.toBeNull();
    expect(skeleton).toHaveClass('animate-pulse');
  });

  it('wraps children and shows overlay while loading', () => {
    const { container } = render(
      <Skeleton loading className="rounded-xl">
        <div>Profile content</div>
      </Skeleton>,
    );

    const wrapper = container.querySelector('[data-slot="skeleton-container"]');
    const overlay = container.querySelector('[data-slot="skeleton"]');
    const child = screen.getByText('Profile content');

    expect(wrapper).toHaveAttribute('aria-busy', 'true');
    expect(overlay).not.toBeNull();
    expect(child.parentElement).toHaveClass('invisible');
    expect(child.parentElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders children without overlay when loading is false', () => {
    const { container } = render(
      <Skeleton loading={false}>
        <div>Loaded content</div>
      </Skeleton>,
    );

    const wrapper = container.querySelector('[data-slot="skeleton-container"]');
    const overlay = container.querySelector('[data-slot="skeleton"]');
    const child = screen.getByText('Loaded content');

    expect(wrapper).not.toHaveAttribute('aria-busy');
    expect(overlay).toBeNull();
    expect(child).toBeVisible();
  });
});
