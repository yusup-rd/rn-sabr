import type { DeviceHeading, HeadingPermissionStatus } from "@/types/qibla";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";

interface UseDeviceHeadingOptions {
  onHeading?: (heading: number) => void;
}

const DISPLAY_UPDATE_INTERVAL = 100;

const useDeviceHeading = (options?: UseDeviceHeadingOptions): DeviceHeading => {
  const [heading, setHeading] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState(-1);
  const [hasSensor, setHasSensor] = useState(true);
  const [permissionStatus, setPermissionStatus] =
    useState<HeadingPermissionStatus>("checking");

  const onHeadingRef = useRef(options?.onHeading);
  onHeadingRef.current = options?.onHeading;

  const lastDisplayUpdate = useRef(0);

  useEffect(() => {
    let mounted = true;
    let subscription: Location.LocationSubscription | null = null;

    const startWatching = async () => {
      const permission = await Location.requestForegroundPermissionsAsync();

      if (!mounted) return;

      if (permission.status !== "granted") {
        setPermissionStatus("denied");
        return;
      }

      const available = await Location.hasServicesEnabledAsync();

      if (!mounted) return;

      if (!available) {
        setHasSensor(false);
        setPermissionStatus("granted");
        return;
      }

      setPermissionStatus("granted");

      try {
        subscription = await Location.watchHeadingAsync(
          (headingData) => {
            if (!mounted) return;

            const rawHeading = headingData.magHeading;
            onHeadingRef.current?.(rawHeading);
            const now = Date.now();

            if (now - lastDisplayUpdate.current >= DISPLAY_UPDATE_INTERVAL) {
              lastDisplayUpdate.current = now;

              setHeading(rawHeading);
              setAccuracy(headingData.accuracy);
            }

            setHasSensor(true);
          },
          () => {
            if (mounted) {
              setHasSensor(false);
            }
          },
        );
      } catch {
        if (mounted) {
          setHasSensor(false);
        }
      }
    };

    startWatching();

    return () => {
      mounted = false;
      subscription?.remove();
    };
  }, []);

  return {
    heading,
    accuracy,
    hasSensor,
    permissionStatus,
  };
};

export default useDeviceHeading;
