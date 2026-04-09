import { screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/testing';

import { RouteGuard } from './RouteGuard';

const useCurrentUserRoleMock = vi.fn();
const useCurrentUserIdMock = vi.fn();

vi.mock('@/entities/Session', () => ({
  useCurrentUserId: () => useCurrentUserIdMock(),
  useCurrentUserRole: () => useCurrentUserRoleMock(),
}));

describe('RouteGuard', () => {
  beforeEach(() => {
    useCurrentUserRoleMock.mockReset();
    useCurrentUserIdMock.mockReset();
    useCurrentUserIdMock.mockReturnValue('test-user-id');
    mockRouter.push('/admin-panel');
  });

  it('renders children for admin role', () => {
    useCurrentUserRoleMock.mockReturnValue({ role: 'admin', loading: false });

    renderWithProviders(
      <RouteGuard requiredRole="admin">
        <div>AdminContent</div>
      </RouteGuard>,
    );

    expect(screen.getByText('AdminContent')).toBeInTheDocument();
    expect(mockRouter.asPath).toBe('/admin-panel');
  });

  it('redirects to forbidden page for non-admin role', async () => {
    useCurrentUserRoleMock.mockReturnValue({
      role: 'customer',
      loading: false,
    });

    renderWithProviders(
      <RouteGuard requiredRole="admin">
        <div>AdminContent</div>
      </RouteGuard>,
    );

    await waitFor(() => {
      expect(mockRouter.asPath).toBe('/forbidden');
    });
    expect(screen.queryByText('AdminContent')).not.toBeInTheDocument();
  });

  it('does not redirect while role is loading', async () => {
    useCurrentUserRoleMock.mockReturnValue({ role: null, loading: true });

    renderWithProviders(
      <RouteGuard requiredRole="admin">
        <div>AdminContent</div>
      </RouteGuard>,
    );

    await waitFor(() => {
      expect(mockRouter.asPath).toBe('/admin-panel');
    });
    expect(screen.queryByText('AdminContent')).not.toBeInTheDocument();
  });

  it('does not redirect when user id is not hydrated yet', async () => {
    useCurrentUserIdMock.mockReturnValue(null);
    useCurrentUserRoleMock.mockReturnValue({ role: null, loading: false });

    renderWithProviders(
      <RouteGuard requiredRole="admin">
        <div>AdminContent</div>
      </RouteGuard>,
    );

    await waitFor(() => {
      expect(mockRouter.asPath).toBe('/admin-panel');
    });
    expect(screen.queryByText('AdminContent')).not.toBeInTheDocument();
  });
});
