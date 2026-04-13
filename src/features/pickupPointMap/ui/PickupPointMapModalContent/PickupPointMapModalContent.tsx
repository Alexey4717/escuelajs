'use client';

import dynamic from 'next/dynamic';

import { useLocationsQuery } from '@/shared/api/rest/locations/use-locations-query';
import type { ModalComponentProps } from '@/shared/lib/store/slices/modal/types';
import { Button } from '@/shared/ui/Button/Button';

import { usePickupPointMapController } from './model/usePickupPointMapController';
import { MapMoveEndHandler } from './ui/MapMoveEndHandler';
import { PickupPointMapStatus } from './ui/PickupPointMapStatus';
import { PickupPointMarkers } from './ui/PickupPointMarkers';

const MapContainer = dynamic(
  () => import('react-leaflet').then((m) => m.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((m) => m.TileLayer),
  {
    ssr: false,
  },
);

export function PickupPointMapModalContent({
  closeModal,
  onSelectPickupPoint,
}: ModalComponentProps<'pickupPointMap'>) {
  const {
    mapCenterPoint,
    myLocationPoint,
    queryParams,
    geolocationError,
    mapIcons,
    suppressMoveEndRef,
    handleMapMoveEnd,
  } = usePickupPointMapController();

  const locationsQuery = useLocationsQuery(queryParams);

  return (
    <div className="relative h-dvh w-full">
      <Button
        type="button"
        variant="secondary"
        className="absolute top-3 right-3 z-[1000]"
        onClick={closeModal}
      >
        Закрыть
      </Button>

      {!mapCenterPoint ? (
        <div className="flex h-full items-center justify-center">
          Определяем вашу геопозицию...
        </div>
      ) : (
        <MapContainer
          center={[mapCenterPoint.lat, mapCenterPoint.lng]}
          zoom={12}
          className="h-full w-full"
          zoomControl
        >
          <MapMoveEndHandler
            onMapMoveEnd={handleMapMoveEnd}
            isRequestInFlight={locationsQuery.isFetching}
            suppressMoveEndRef={suppressMoveEndRef}
          />

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <PickupPointMarkers
            icons={mapIcons}
            myLocationPoint={myLocationPoint}
            locations={locationsQuery.data ?? []}
            closeModal={closeModal}
            onSelectPickupPoint={onSelectPickupPoint}
          />
        </MapContainer>
      )}

      <PickupPointMapStatus
        geolocationError={geolocationError}
        isLocationsError={locationsQuery.isError}
        isLocationsPending={locationsQuery.isPending}
      />
    </div>
  );
}
