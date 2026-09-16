import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";

interface UserLocation {
  latitude: number;
  longitude: number;
}

export type LocationPermissionStatus =
  "checking" | "granted" | "denied" | "blocked";

export function useUserLocation() {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [permissionStatus, setPermissionStatus] =
    useState<LocationPermissionStatus>("checking");
  const [error, setError] = useState<string | null>(null);

  const getLocation = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const permission = await Location.getForegroundPermissionsAsync();

      if (!permission.granted) {
        if (!permission.canAskAgain) {
          setPermissionStatus("blocked");
          setError(
            "Location permission is disabled. Please enable it in Settings.",
          );
          return;
        }

        const requestedPermission =
          await Location.requestForegroundPermissionsAsync();

        if (!requestedPermission.granted) {
          setPermissionStatus(
            requestedPermission.canAskAgain ? "denied" : "blocked",
          );

          setError(
            requestedPermission.canAskAgain
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
    } catch {
      setError("Unable to get your current location.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return {
    location,
    loading,
    permissionStatus,
    error,
    retry: getLocation,
  };
}
