import { create } from "zustand";

export type LocationPermissionStatus =
  "checking" | "granted" | "denied" | "blocked";

interface LocationStore {
  latitude: number | null;
  longitude: number | null;

  locationName: string | null;
  locationLoading: boolean;
  locationError: string | null;
  locationPermissionStatus: LocationPermissionStatus;

  retryLocation: () => Promise<void>;
  setLocation: (latitude: number, longitude: number) => void;
  setLocationName: (name: string | null) => void;
  setLocationLoading: (loading: boolean) => void;
  setLocationError: (error: string | null) => void;
  setLocationPermissionStatus: (status: LocationPermissionStatus) => void;
  setRetryLocation: (retry: () => Promise<void>) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  latitude: null,
  longitude: null,

  locationName: null,
  locationLoading: true,
  locationError: null,
  locationPermissionStatus: "checking",

  retryLocation: async () => {},

  setLocation: (latitude, longitude) =>
    set((state) => {
      const coordinatesChanged =
        state.latitude !== latitude || state.longitude !== longitude;

      return {
        latitude,
        longitude,
        locationLoading: false,
        locationError: null,
        locationPermissionStatus: "granted",

        ...(coordinatesChanged
          ? {
              locationName: null,
            }
          : {}),
      };
    }),

  setLocationName: (name) =>
    set({
      locationName: name,
    }),

  setLocationLoading: (loading) =>
    set({
      locationLoading: loading,
    }),

  setLocationError: (error) =>
    set({
      locationError: error,
      ...(error === null
        ? {}
        : {
            locationLoading: false,
            locationName: null,
          }),
    }),

  setLocationPermissionStatus: (status) =>
    set({
      locationPermissionStatus: status,
    }),

  setRetryLocation: (retry) =>
    set({
      retryLocation: retry,
    }),
}));
