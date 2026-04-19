'use client';

import dynamic from 'next/dynamic';

import type { ModalComponentProps } from '@/shared/lib/store/slices/modal/types';

import { DEMO_PICKUP_POINT_PRIMARY_ID } from '../model/demo-pickup-point-ids';
import type { LatLngPoint, MapIconsState } from '../model/types';

const Marker = dynamic(() => import('react-leaflet').then((m) => m.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import('react-leaflet').then((m) => m.Popup), {
  ssr: false,
});
const Tooltip = dynamic(() => import('react-leaflet').then((m) => m.Tooltip), {
  ssr: false,
});

interface PickupPointMarkersProps {
  icons: MapIconsState;
  myLocationPoint: LatLngPoint | null;
  locations: Array<{
    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
  }>;
  closeModal: () => void;
  onSelectPickupPoint: ModalComponentProps<'pickupPointMap'>['onSelectPickupPoint'];
}

export const PickupPointMarkers = ({
  icons,
  myLocationPoint,
  locations,
  closeModal,
  onSelectPickupPoint,
}: PickupPointMarkersProps) => (
  <>
    {icons.myLocation && myLocationPoint && (
      <Marker
        position={[myLocationPoint.lat, myLocationPoint.lng]}
        icon={icons.myLocation!}
        bubblingMouseEvents={false}
      >
        <Popup>You are here</Popup>
      </Marker>
    )}

    {icons.pickupPoint &&
      locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.latitude, location.longitude]}
          icon={
            location.id === DEMO_PICKUP_POINT_PRIMARY_ID &&
            icons.pickupPointDemo
              ? icons.pickupPointDemo
              : icons.pickupPoint!
          }
          bubblingMouseEvents={false}
          eventHandlers={{
            click: () => {
              onSelectPickupPoint({
                name: location.name,
                latitude: location.latitude,
                longitude: location.longitude,
              });
              closeModal();
            },
          }}
        >
          <Tooltip
            className="pickup-point-tooltip"
            direction="top"
            offset={[0, -8]}
            opacity={0.96}
          >
            <div className="pickup-point-tooltip__content">
              <div className="font-semibold">{location.name}</div>
              <div>{location.description}</div>
            </div>
          </Tooltip>
          <Popup>
            <strong>{location.name}</strong>
            <br />
            {location.description}
          </Popup>
        </Marker>
      ))}
  </>
);
