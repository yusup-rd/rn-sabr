import { reverseGeocodeWithNominatim } from "@/api/nominatim-api";
import type { LocationAddress } from "@/types/location";
import * as Location from "expo-location";

const geocodeCache = new Map<string, LocationAddress>();

function getCacheKey(latitude: number, longitude: number, language: string) {
  return `${latitude.toFixed(2)},${longitude.toFixed(2)},${language}`;
}

async function reverseGeocodeWithExpo(
  latitude: number,
  longitude: number,
): Promise<LocationAddress> {
  const results = await Location.reverseGeocodeAsync({
    latitude,
    longitude,
  });

  const address = results[0];

  if (!address) {
    return {
      city: null,
      country: null,
    };
  }

  return {
    city:
      address.city ??
      address.district ??
      address.subregion ??
      address.region ??
      null,
    country: address.country ?? null,
  };
}

export async function reverseGeocode(
  latitude: number,
  longitude: number,
  language: string,
): Promise<LocationAddress> {
  const cacheKey = getCacheKey(latitude, longitude, language);
  const cached = geocodeCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  let result: LocationAddress;

  try {
    result = await reverseGeocodeWithNominatim(latitude, longitude, language);
  } catch (error) {
    console.warn(
      "Nominatim reverse geocode failed, falling back to expo-location:",
      error,
    );

    result = await reverseGeocodeWithExpo(latitude, longitude);
  }

  geocodeCache.set(cacheKey, result);

  return result;
}
