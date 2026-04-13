'use client';

import { type RefObject, useCallback, useEffect, useRef } from 'react';

import { useMap, useMapEvents } from 'react-leaflet';

import type { LatLngPoint, MapMoveEndPayload } from '../model/types';

const MOVEEND_THROTTLE_MS = 1_200;

interface MapMoveEndHandlerProps {
  onMapMoveEnd: (payload: MapMoveEndPayload) => void;
  isRequestInFlight: boolean;
  suppressMoveEndRef: RefObject<boolean>;
}

function deriveSizeByZoom(zoom: number): number {
  if (zoom >= 15) return 8;
  if (zoom >= 13) return 12;
  if (zoom >= 11) return 18;
  if (zoom >= 9) return 25;
  return 35;
}

function deriveRadiusKmFromViewport(
  map: ReturnType<typeof useMap>,
  center: LatLngPoint,
): number {
  const bounds = map.getBounds();
  const radiusMeters = Math.max(
    map.distance(center, bounds.getNorthEast()),
    map.distance(center, bounds.getSouthWest()),
  );

  return Math.max(1, Math.round(radiusMeters / 1000));
}

export function MapMoveEndHandler({
  onMapMoveEnd,
  isRequestInFlight,
  suppressMoveEndRef,
}: MapMoveEndHandlerProps) {
  const lastMoveEndRequestAtRef = useRef(0);
  const lastRequestedCenterRef = useRef<LatLngPoint | null>(null);
  const map = useMap();

  const emitViewportQuery = useCallback(() => {
    if (isRequestInFlight) {
      return;
    }
    const now = Date.now();
    if (now - lastMoveEndRequestAtRef.current < MOVEEND_THROTTLE_MS) {
      return;
    }

    const center = map.getCenter();
    const zoom = map.getZoom();
    const centerPoint = {
      lat: center.lat,
      lng: center.lng,
    };
    const prevCenter = lastRequestedCenterRef.current;
    if (prevCenter) {
      const centerDeltaMeters = map.distance(prevCenter, centerPoint);
      if (centerDeltaMeters < 1) {
        return;
      }
    }

    lastMoveEndRequestAtRef.current = now;
    lastRequestedCenterRef.current = centerPoint;
    onMapMoveEnd({
      center: centerPoint,
      radius: deriveRadiusKmFromViewport(map, centerPoint),
      size: deriveSizeByZoom(zoom),
    });
  }, [isRequestInFlight, map, onMapMoveEnd]);

  useMapEvents({
    moveend: () => {
      if (suppressMoveEndRef.current) {
        suppressMoveEndRef.current = false;
        return;
      }
      emitViewportQuery();
    },
  });

  useEffect(() => {
    emitViewportQuery();
  }, [emitViewportQuery]);

  return null;
}
