export type LatLngPoint = {
  lat: number;
  lng: number;
};

export type LocationsQueryParams = {
  radius: number;
  size: number;
  origin: string;
};

export type MapMoveEndPayload = {
  center: LatLngPoint;
  radius: number;
  size: number;
};

export interface MapIconsState {
  myLocation: import('leaflet').Icon | null;
  pickupPoint: import('leaflet').Icon | null;
}
