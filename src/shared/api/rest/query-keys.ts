/**
 * Фабрика ключей для REST Escuela — стабильные префиксы для invalidation.
 * @see https://tanstack.com/query/v5/docs/framework/react/guides/query-keys
 */
export const escuelaRestQueryKeys = {
  root: ['escuela-rest'] as const,
  files: {
    all: () => [...escuelaRestQueryKeys.root, 'files'] as const,
    byFilename: (filename: string) =>
      [...escuelaRestQueryKeys.files.all(), filename] as const,
  },
  locations: {
    all: () => [...escuelaRestQueryKeys.root, 'locations'] as const,
    list: () => [...escuelaRestQueryKeys.locations.all(), 'list'] as const,
  },
} as const;
