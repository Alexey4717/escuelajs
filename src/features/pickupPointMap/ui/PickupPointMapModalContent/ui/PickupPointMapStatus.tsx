interface PickupPointMapStatusProps {
  geolocationError: string | null;
  isLocationsError: boolean;
  isLocationsPending: boolean;
}

export function PickupPointMapStatus({
  geolocationError,
  isLocationsError,
  isLocationsPending,
}: PickupPointMapStatusProps) {
  return (
    <>
      {geolocationError && (
        <div className="pointer-events-none absolute right-3 bottom-3 z-[1000] rounded-md bg-background/95 px-3 py-2 text-xs text-foreground shadow-md">
          {geolocationError}
        </div>
      )}

      {isLocationsError && (
        <div className="pointer-events-none absolute left-3 bottom-3 z-[1000] rounded-md bg-background/95 px-3 py-2 text-xs text-destructive shadow-md">
          Не удалось загрузить пункты выдачи
        </div>
      )}

      {isLocationsPending && (
        <div className="pointer-events-none absolute left-3 bottom-3 z-[1000] rounded-md bg-background/95 px-3 py-2 text-xs text-foreground shadow-md">
          Определение точек выдачи...
        </div>
      )}
    </>
  );
}
