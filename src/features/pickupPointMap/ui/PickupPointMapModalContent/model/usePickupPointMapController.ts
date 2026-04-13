'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import type { LatLngPoint, MapIconsState, MapMoveEndPayload } from './types';

const MOSCOW_POINT: LatLngPoint = {
  lat: 55.7558,
  lng: 37.6176,
};

export function usePickupPointMapController() {
  const [mapCenterPoint, setMapCenterPoint] = useState<LatLngPoint | null>(
    null,
  );
  const [myLocationPoint, setMyLocationPoint] = useState<LatLngPoint | null>(
    null,
  );
  const [queryParams, setQueryParams] = useState<{
    radius: number;
    size: number;
    origin: string;
  } | null>(null);
  const [geolocationError, setGeolocationError] = useState<string | null>(null);
  const [mapIcons, setMapIcons] = useState<MapIconsState>({
    myLocation: null,
    pickupPoint: null,
  });
  const suppressMoveEndRef = useRef(false);

  const handleMapMoveEnd = useCallback(
    ({ center, radius, size }: MapMoveEndPayload) => {
      setMapCenterPoint(center);
      setQueryParams({
        radius,
        size,
        origin: `${center.lat},${center.lng}`,
      });
    },
    [],
  );

  const setFallbackLocation = useCallback((message: string) => {
    setMapCenterPoint(MOSCOW_POINT);
    setMyLocationPoint(null);
    setQueryParams(null);
    setGeolocationError(message);
  }, []);

  useEffect(() => {
    let mounted = true;
    void import('leaflet').then(({ Icon }) => {
      if (!mounted) {
        return;
      }
      setMapIcons({
        myLocation: new Icon({
          iconUrl: '/marker_my_location.svg',
          iconSize: [50, 55],
          iconAnchor: [25, 55],
          popupAnchor: [0, -16],
        }),
        pickupPoint: new Icon({
          iconUrl: '/marker_pickup.svg',
          iconSize: [50, 55],
          iconAnchor: [25, 55],
          popupAnchor: [0, -16],
          tooltipAnchor: [0, -14],
        }),
      });
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      const fallbackTimeoutId = window.setTimeout(() => {
        setFallbackLocation('Геолокация недоступна в этом браузере');
      }, 0);

      return () => window.clearTimeout(fallbackTimeoutId);
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextPoint = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setMapCenterPoint(nextPoint);
        setMyLocationPoint(nextPoint);
        setQueryParams(null);
      },
      () => {
        setFallbackLocation(
          'Не удалось получить геопозицию, использована точка по умолчанию',
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10_000,
        maximumAge: 60_000,
      },
    );
  }, [setFallbackLocation]);

  return {
    mapCenterPoint,
    myLocationPoint,
    queryParams,
    geolocationError,
    mapIcons,
    suppressMoveEndRef,
    handleMapMoveEnd,
  };
}
