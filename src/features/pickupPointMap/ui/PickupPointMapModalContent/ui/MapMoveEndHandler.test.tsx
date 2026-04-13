import type { MutableRefObject } from 'react';

import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MapMoveEndHandler } from './MapMoveEndHandler';

type LatLng = { lat: number; lng: number };

let currentCenter: LatLng = { lat: 55.75, lng: 37.61 };
let moveendHandler: (() => void) | null = null;

const mapMock = {
  getCenter: vi.fn(() => currentCenter),
  getZoom: vi.fn(() => 12),
  distance: vi.fn((a: LatLng, b: LatLng) => {
    if (a.lat === b.lat && a.lng === b.lng) {
      return 0;
    }
    return 120;
  }),
  getBounds: vi.fn(() => ({
    getNorthEast: () => ({
      lat: currentCenter.lat + 0.1,
      lng: currentCenter.lng + 0.1,
    }),
    getSouthWest: () => ({
      lat: currentCenter.lat - 0.1,
      lng: currentCenter.lng - 0.1,
    }),
  })),
};

vi.mock('react-leaflet', () => ({
  useMap: () => mapMock,
  useMapEvents: (handlers: { moveend?: () => void }) => {
    moveendHandler = handlers.moveend ?? null;
    return null;
  },
}));

describe('MapMoveEndHandler', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));
    currentCenter = { lat: 55.75, lng: 37.61 };
    moveendHandler = null;
    vi.clearAllMocks();
  });

  it('вызывает onMapMoveEnd на инициализации', () => {
    const onMapMoveEnd = vi.fn();

    render(
      <MapMoveEndHandler
        onMapMoveEnd={onMapMoveEnd}
        isRequestInFlight={false}
        suppressMoveEndRef={{ current: false } as MutableRefObject<boolean>}
      />,
    );

    expect(onMapMoveEnd).toHaveBeenCalledTimes(1);
    expect(onMapMoveEnd.mock.calls[0]?.[0]).toMatchObject({
      center: { lat: 55.75, lng: 37.61 },
    });
  });

  it('игнорирует moveend, если центр не изменился', () => {
    const onMapMoveEnd = vi.fn();
    const suppressRef = { current: false } as MutableRefObject<boolean>;

    render(
      <MapMoveEndHandler
        onMapMoveEnd={onMapMoveEnd}
        isRequestInFlight={false}
        suppressMoveEndRef={suppressRef}
      />,
    );

    expect(onMapMoveEnd).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1300);
    moveendHandler?.();

    expect(onMapMoveEnd).toHaveBeenCalledTimes(1);
  });

  it('делает новый вызов после смещения центра карты', () => {
    const onMapMoveEnd = vi.fn();
    const suppressRef = { current: false } as MutableRefObject<boolean>;

    render(
      <MapMoveEndHandler
        onMapMoveEnd={onMapMoveEnd}
        isRequestInFlight={false}
        suppressMoveEndRef={suppressRef}
      />,
    );
    expect(onMapMoveEnd).toHaveBeenCalledTimes(1);

    currentCenter = { lat: 55.8, lng: 37.7 };
    vi.advanceTimersByTime(1300);
    moveendHandler?.();

    expect(onMapMoveEnd).toHaveBeenCalledTimes(2);
  });
});
