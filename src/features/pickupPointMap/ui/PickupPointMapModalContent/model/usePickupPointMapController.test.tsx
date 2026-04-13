import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { usePickupPointMapController } from './usePickupPointMapController';

vi.mock('leaflet', () => ({
  Icon: class MockIcon {
    constructor(public readonly options: unknown) {}
  },
}));

describe('usePickupPointMapController', () => {
  const originalGeolocation = navigator.geolocation;

  beforeEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: originalGeolocation,
    });
  });

  it('инициализирует карту по успешной геолокации', async () => {
    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: {
        getCurrentPosition: vi.fn((onSuccess: PositionCallback) => {
          onSuccess({
            coords: {
              latitude: 59.9386,
              longitude: 30.3141,
            },
          } as GeolocationPosition);
        }),
      },
    });

    const { result } = renderHook(() => usePickupPointMapController());

    await waitFor(() => {
      expect(result.current.mapCenterPoint).toEqual({
        lat: 59.9386,
        lng: 30.3141,
      });
    });

    expect(result.current.myLocationPoint).toEqual({
      lat: 59.9386,
      lng: 30.3141,
    });
    expect(result.current.geolocationError).toBeNull();
  });

  it('обновляет query params при moveend', async () => {
    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: {
        getCurrentPosition: vi.fn(
          (_onSuccess: PositionCallback, onError: PositionErrorCallback) => {
            onError({} as GeolocationPositionError);
          },
        ),
      },
    });

    const { result } = renderHook(() => usePickupPointMapController());

    await waitFor(() => {
      expect(result.current.mapCenterPoint).toEqual({
        lat: 55.7558,
        lng: 37.6176,
      });
    });

    act(() => {
      result.current.handleMapMoveEnd({
        center: { lat: 55.75, lng: 37.61 },
        radius: 12,
        size: 18,
      });
    });

    expect(result.current.queryParams).toEqual({
      radius: 12,
      size: 18,
      origin: '55.75,37.61',
    });
  });
});
