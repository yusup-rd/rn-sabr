import type { LocationAddress } from "@/types/location";
import * as Location from "expo-location";

export async function reverseGeocode(
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
