interface PickupPointMapStatusProps {
  geolocationError: string | null;
  isLocationsError: boolean;
  isLocationsPending: boolean;
}

export const PickupPointMapStatus = ({
  geolocationError,
  isLocationsError,
  isLocationsPending,
}: PickupPointMapStatusProps) => (
  <>
    {geolocationError && (
      <div
        className="pointer-events-none absolute right-3 bottom-3 z-[1000] rounded-md bg-background/95 px-3 py-2 text-xs text-foreground shadow-md"
        role="alert"
        aria-live="assertive"
      >
        {geolocationError}
      </div>
    )}

    {isLocationsError && (
      <div
        className="pointer-events-none absolute left-3 bottom-3 z-[1000] rounded-md bg-background/95 px-3 py-2 text-xs text-destructive shadow-md"
        role="alert"
        aria-live="assertive"
      >
        Failed to load pickup points
      </div>
    )}

    {isLocationsPending && (
      <div
        className="pointer-events-none absolute left-3 bottom-3 z-[1000] rounded-md bg-background/95 px-3 py-2 text-xs text-foreground shadow-md"
        role="status"
        aria-live="polite"
      >
        Loading pickup points...
      </div>
    )}
  </>
);
