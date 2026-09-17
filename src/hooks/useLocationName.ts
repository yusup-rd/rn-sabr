import { reverseGeocode } from "@/lib/location";
import { usePrayerStore } from "@/store/prayerStore";
import { useEffect, useState } from "react";

export function useLocationName() {
  const latitude = usePrayerStore((state) => state.latitude);
  const longitude = usePrayerStore((state) => state.longitude);

  const [city, setCity] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (latitude == null || longitude == null) {
      setCity(null);
      setCountry(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadLocationName = async () => {
      try {
        setLoading(true);
        setError(null);

        const address = await reverseGeocode(latitude, longitude);

        if (cancelled) return;

        setCity(address.city);
        setCountry(address.country);
      } catch {
        if (cancelled) return;

        setCity(null);
        setCountry(null);
        setError("Unable to determine your location.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadLocationName();

    return () => {
      cancelled = true;
    };
  }, [latitude, longitude]);

  const locationName =
    city && country
      ? `${city}, ${country}`
      : (country ?? city ?? "Location unavailable");

  return {
    city,
    country,
    locationName,
    loading,
    error,
  };
}
