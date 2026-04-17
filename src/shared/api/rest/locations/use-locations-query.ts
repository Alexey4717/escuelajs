'use client';

import { useQuery } from '@tanstack/react-query';

import { escuelaRestQueryKeys } from '../query-keys';
import { getLocations } from './get-locations';
import type { EscuelaLocationDto, GetEscuelaLocationsParams } from './types';

interface UseLocationsQueryOptions {
  mockData?: EscuelaLocationDto[] | null;
}

export function useLocationsQuery(
  params: GetEscuelaLocationsParams | null,
  options?: UseLocationsQueryOptions,
) {
  return useQuery({
    queryKey: [
      ...escuelaRestQueryKeys.locations.list(),
      params?.origin ?? null,
      params?.radius ?? null,
      params?.size ?? null,
      options?.mockData ? 'mock' : 'real',
    ],
    queryFn: () => {
      if (options?.mockData) {
        return new Promise<EscuelaLocationDto[]>((resolve) => {
          window.setTimeout(() => resolve(options.mockData ?? []), 250);
        });
      }
      if (!params) {
        throw new Error('Locations query params are not provided');
      }
      return getLocations(params);
    },
    enabled: Boolean(params) || Boolean(options?.mockData),
  });
}
