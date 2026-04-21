'use client';

import dynamic from 'next/dynamic';

import { useLocationsQuery } from '@/shared/api/rest/locations/use-locations-query';
import type { ModalComponentProps } from '@/shared/lib/store/slices/modal/types';
import { Button } from '@/shared/ui/Button/Button';
import { Dialog } from '@/shared/ui/Dialog/Dialog';

import { useOnboardingSessionStore } from '@/features/onboarding';

import {
  DEMO_PICKUP_POINT_PRIMARY_ID,
  DEMO_PICKUP_POINT_SECONDARY_ID,
} from './model/demo-pickup-point-ids';
import { usePickupPointMapController } from './model/usePickupPointMapController';
import { PickupPointMapStatus } from './ui/PickupPointMapStatus';
import { PickupPointMarkers } from './ui/PickupPointMarkers';

/** Отдельный чанк: `react-leaflet` не попадает в синхронный бандл модалки. */
const MapMoveEndHandler = dynamic(
  () =>
    import('./ui/MapMoveEndHandler').then((mod) => ({
      default: mod.MapMoveEndHandler,
    })),
  { ssr: false },
);

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

export const PickupPointMapModalContent = ({
  closeModal,
  onSelectPickupPoint,
}: ModalComponentProps<'pickupPointMap'>) => {
  const isOnboardingGuestMapStep = useOnboardingSessionStore(
    (s) =>
      s.isDemoActive && s.activeFlow === 'guest' && s.currentStepIndex >= 6,
  );
  const {
    mapCenterPoint,
    myLocationPoint,
    queryParams,
    geolocationError,
    mapIcons,
    suppressMoveEndRef,
    handleMapMoveEnd,
  } = usePickupPointMapController();

  const locationsQuery = useLocationsQuery(queryParams, {
    mockData: isOnboardingGuestMapStep
      ? [
          {
            id: DEMO_PICKUP_POINT_PRIMARY_ID,
            name: 'Demo pickup point (select me)',
            description: 'Onboarding: click this point to continue.',
            latitude: 55.751244,
            longitude: 37.618423,
          },
          {
            id: DEMO_PICKUP_POINT_SECONDARY_ID,
            name: 'Backup pickup point',
            description: 'Fallback location for demo mode.',
            latitude: 55.7578,
            longitude: 37.6056,
          },
        ]
      : null,
  });

  return (
    <div className="relative h-dvh w-full">
      <Dialog.Title className="sr-only">
        Choose a pickup point on the map
      </Dialog.Title>
      <Dialog.Description className="sr-only">
        Select one of the available pickup locations.
      </Dialog.Description>

      <Button
        type="button"
        variant="secondary"
        className="absolute top-3 right-3 z-[1000]"
        onClick={closeModal}
      >
        Close
      </Button>

      {!mapCenterPoint ? (
        <div className="flex h-full items-center justify-center">
          Detecting your location...
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
};
