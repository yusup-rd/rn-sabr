import { reverseGeocode } from "@/lib/location";
import { useLocationStore } from "@/store/locationStore";
import { useEffect } from "react";

export function useLocationName() {
  const latitude = useLocationStore((state) => state.latitude);
  const longitude = useLocationStore((state) => state.longitude);
  const locationName = useLocationStore((state) => state.locationName);
  const locationLoading = useLocationStore((state) => state.locationLoading);
  const locationError = useLocationStore((state) => state.locationError);
  const setLocationName = useLocationStore((state) => state.setLocationName);
  const setLocationNameStatus = useLocationStore(
    (state) => state.setLocationNameStatus,
  );

  useEffect(() => {
    if (latitude == null || longitude == null) {
      return;
    }

    if (locationName) {
      return;
    }

    let cancelled = false;

    const loadLocationName = async () => {
      setLocationNameStatus("loading");

      try {
        const address = await reverseGeocode(latitude, longitude);

        if (cancelled) {
          return;
        }

        const name =
          address.city && address.country
            ? `${address.city}, ${address.country}`
            : (address.country ?? address.city ?? null);

        setLocationName(name);
        setLocationNameStatus(name ? "resolved" : "failed");
      } catch {
        if (cancelled) {
          return;
        }

        setLocationName(null);
        setLocationNameStatus("failed");
      }
    };

    void loadLocationName();

    return () => {
      cancelled = true;
    };
  }, [
    latitude,
    longitude,
    locationName,
    setLocationName,
    setLocationNameStatus,
  ]);

  return {
    locationName: locationName ?? "Location unavailable",
    loading: locationLoading,
    error: locationError,
  };
}
