import type { LocationPermissionStatus } from "@/store/locationStore";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";

interface UserLocation {
  latitude: number;
  longitude: number;
}

export function useUserLocation() {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [permissionStatus, setPermissionStatus] =
    useState<LocationPermissionStatus>("checking");
  const [error, setError] = useState<string | null>(null);

  const getLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let permission = await Location.getForegroundPermissionsAsync();

      if (!permission.granted) {
        if (!permission.canAskAgain) {
          setPermissionStatus("blocked");

          setError(
            "Location permission is disabled. Please enable it in Settings.",
          );

          return;
        }

        permission = await Location.requestForegroundPermissionsAsync();

        if (!permission.granted) {
          setPermissionStatus(permission.canAskAgain ? "denied" : "blocked");

          setError(
            permission.canAskAgain
              ? "Location permission was not granted."
              : "Location permission is disabled. Please enable it in Settings.",
          );

          return;
        }
      }

      setPermissionStatus("granted");

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    } catch (error) {
      console.error("Failed to get user location:", error);

      setPermissionStatus("granted");

      setError("Unable to get your current location.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void getLocation();
  }, [getLocation]);

  return {
    location,
    loading,
    permissionStatus,
    error,
    retry: getLocation,
  };
}
