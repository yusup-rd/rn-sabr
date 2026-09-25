import { fetchNearbyMosques } from "@/api/mosques-api";
import {
  getMosqueCache,
  isMosqueCacheFresh,
  setMosqueCache,
} from "@/lib/mosque-cache";
import { getDistanceMeters } from "@/lib/mosque-distance";
import { useLocationStore } from "@/store/locationStore";
import type { Mosque } from "@/types/mosque";
import { useEffect, useRef, useState } from "react";

export interface NearbyMosque extends Mosque {
  distanceMeters: number;
  walkingMinutes: number;
  isClosest: boolean;
}

export const MOSQUE_CACHE_REUSE_RADIUS_METERS = 10_000;

const isCacheRelevant = (
  latitude: number,
  longitude: number,
  cacheLatitude: number,
  cacheLongitude: number,
) => {
  return (
    getDistanceMeters(latitude, longitude, cacheLatitude, cacheLongitude) <=
    MOSQUE_CACHE_REUSE_RADIUS_METERS
  );
};

const createNearbyMosques = (
  mosques: Mosque[],
  latitude: number,
  longitude: number,
  radiusKm: number | null,
): NearbyMosque[] => {
  const nearbyMosques = mosques
    .map((mosque) => {
      const distanceMeters = getDistanceMeters(
        latitude,
        longitude,
        mosque.latitude,
        mosque.longitude,
      );

      return {
        ...mosque,
        distanceMeters,
        walkingMinutes: Math.max(1, Math.round(distanceMeters / 80)),
        isClosest: false,
      };
    })
    .filter((mosque) => {
      if (radiusKm == null) {
        return true;
      }

      return mosque.distanceMeters <= radiusKm * 1000;
    })
    .sort((first, second) => first.distanceMeters - second.distanceMeters);

  if (nearbyMosques.length > 0) {
    nearbyMosques[0].isClosest = true;
  }

  return nearbyMosques;
};

export const useNearbyMosques = (
  radiusKm: number | null = 3,
): NearbyMosque[] => {
  const latitude = useLocationStore((state) => state.latitude);
  const longitude = useLocationStore((state) => state.longitude);
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const lastRefreshAttemptRef = useRef<number | null>(null);

  useEffect(() => {
    if (latitude == null || longitude == null) {
      return;
    }

    let cancelled = false;

    const loadMosques = async () => {
      const cache = await getMosqueCache();

      if (cancelled) {
        return;
      }

      const canUseCache =
        cache != null &&
        isCacheRelevant(latitude, longitude, cache.latitude, cache.longitude);

      if (canUseCache && cache) {
        setMosques(cache.mosques);

        if (isMosqueCacheFresh(cache)) {
          return;
        }

        if (lastRefreshAttemptRef.current === cache.fetchedAt) {
          return;
        }

        lastRefreshAttemptRef.current = cache.fetchedAt;
      }

      try {
        const freshMosques = await fetchNearbyMosques(latitude, longitude);

        if (cancelled) {
          return;
        }

        setMosques(freshMosques);
        await setMosqueCache(latitude, longitude, freshMosques);
      } catch (error) {
        console.error("[Mosques] Failed to fetch mosques:", error);
      }
    };

    void loadMosques();

    return () => {
      cancelled = true;
    };
  }, [latitude, longitude]);

  if (latitude == null || longitude == null) {
    return [];
  }

  return createNearbyMosques(mosques, latitude, longitude, radiusKm);
};
