import type { LocationAddress } from "@/types/location";
import * as Location from "expo-location";

const NOMINATIM_ENDPOINT = "https://nominatim.openstreetmap.org/reverse";

const geocodeCache = new Map<string, LocationAddress>();

function getCacheKey(latitude: number, longitude: number, language: string) {
  return `${latitude.toFixed(2)},${longitude.toFixed(2)},${language}`;
}

interface NominatimAddress {
  city?: string;
  town?: string;
  village?: string;
  county?: string;
  state?: string;
  country?: string;
}

interface NominatimResponse {
  address?: NominatimAddress;
}

async function reverseGeocodeWithNominatim(
  latitude: number,
  longitude: number,
  language: string,
): Promise<LocationAddress> {
  const url = new URL(NOMINATIM_ENDPOINT);
  url.searchParams.set("lat", latitude.toString());
  url.searchParams.set("lon", longitude.toString());
  url.searchParams.set("format", "json");
  url.searchParams.set("zoom", "10");
  url.searchParams.set("accept-language", language);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url.toString(), {
      headers: {
        // Required by Nominatim's usage policy to identify the app.
        "User-Agent": "Sabr/1.0 (prayer times app)",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Nominatim request failed: ${response.status}`);
    }

    const data: NominatimResponse = await response.json();
    const address = data.address;

    if (!address) {
      return { city: null, country: null };
    }

    return {
      city:
        address.city ??
        address.town ??
        address.village ??
        address.county ??
        address.state ??
        null,
      country: address.country ?? null,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

async function reverseGeocodeWithExpo(
  latitude: number,
  longitude: number,
): Promise<LocationAddress> {
  const results = await Location.reverseGeocodeAsync({ latitude, longitude });
  const address = results[0];

  if (!address) {
    return { city: null, country: null };
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
