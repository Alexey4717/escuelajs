import { fetchEscuelaRest } from '../fetch-escuela-rest';
import type { EscuelaLocationDto, GetEscuelaLocationsParams } from './types';

export async function getLocations({
  radius,
  size,
  origin,
}: GetEscuelaLocationsParams): Promise<EscuelaLocationDto[]> {
  const searchParams = new URLSearchParams({
    radius: String(radius),
    size: String(size),
    origin,
  });

  return fetchEscuelaRest<EscuelaLocationDto[]>(
    `/locations?${searchParams.toString()}`,
  );
}
