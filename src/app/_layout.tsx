import "@/global.css";
import { useUserLocation } from "@/hooks/useUserLocation";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { usePrayerStore } from "@/store/prayerStore";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "sans-regular": require("@/assets/fonts/PlusJakartaSans-Regular.ttf"),
    "sans-extralight": require("@/assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "sans-light": require("@/assets/fonts/PlusJakartaSans-Light.ttf"),
    "sans-medium": require("@/assets/fonts/PlusJakartaSans-Medium.ttf"),
    "sans-semibold": require("@/assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    "sans-bold": require("@/assets/fonts/PlusJakartaSans-Bold.ttf"),
    "sans-extrabold": require("@/assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "sans-italic": require("@/assets/fonts/PlusJakartaSans-Italic.ttf"),
    "sans-extralight-italic": require("@/assets/fonts/PlusJakartaSans-ExtraLightItalic.ttf"),
    "sans-light-italic": require("@/assets/fonts/PlusJakartaSans-LightItalic.ttf"),
    "sans-medium-italic": require("@/assets/fonts/PlusJakartaSans-MediumItalic.ttf"),
    "sans-semibold-italic": require("@/assets/fonts/PlusJakartaSans-SemiBoldItalic.ttf"),
    "sans-bold-italic": require("@/assets/fonts/PlusJakartaSans-BoldItalic.ttf"),
    "sans-extrabold-italic": require("@/assets/fonts/PlusJakartaSans-ExtraBoldItalic.ttf"),
  });

  if (fontError) {
    throw fontError;
  }

  if (!fontsLoaded) {
    return null;
  }

  function LocationInitializer() {
    const { location, loading, error, permissionStatus, retry } =
      useUserLocation();

    const setLocation = usePrayerStore((state) => state.setLocation);

    const setLocationLoading = usePrayerStore(
      (state) => state.setLocationLoading,
    );

    const setLocationError = usePrayerStore((state) => state.setLocationError);

    const setLocationPermissionStatus = usePrayerStore(
      (state) => state.setLocationPermissionStatus,
    );

    const setRetryLocation = usePrayerStore((state) => state.setRetryLocation);

    useEffect(() => {
      setRetryLocation(retry);
    }, [retry, setRetryLocation]);

    useEffect(() => {
      setLocationLoading(loading);
    }, [loading, setLocationLoading]);

    useEffect(() => {
      setLocationPermissionStatus(permissionStatus);
    }, [permissionStatus, setLocationPermissionStatus]);

    useEffect(() => {
      setLocationError(error);
    }, [error, setLocationError]);

    useEffect(() => {
      if (!location) return;

      setLocation(location.latitude, location.longitude);
    }, [location, setLocation]);

    return null;
  }

  return (
    <ThemeProvider>
      <LocationInitializer />

      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="prayer-times"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="zakat"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
