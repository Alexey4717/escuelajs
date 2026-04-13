'use client';

import { useQuery } from '@tanstack/react-query';

import { escuelaRestQueryKeys } from '../query-keys';
import { getLocations } from './get-locations';
import type { GetEscuelaLocationsParams } from './types';

export function useLocationsQuery(params: GetEscuelaLocationsParams | null) {
  return useQuery({
    queryKey: [
      ...escuelaRestQueryKeys.locations.list(),
      params?.origin ?? null,
      params?.radius ?? null,
      params?.size ?? null,
    ],
    queryFn: () => {
      if (!params) {
        throw new Error('Параметры locations-запроса не заданы');
      }
      return getLocations(params);
    },
    enabled: Boolean(params),
  });
}
