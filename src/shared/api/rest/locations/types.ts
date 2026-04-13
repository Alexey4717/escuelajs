export type EscuelaLocationDto = {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
};

export type GetEscuelaLocationsParams = {
  radius: number;
  size: number;
  origin: string; // 'lat,lon'
};
