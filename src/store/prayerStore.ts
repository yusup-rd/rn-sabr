import type { AsrMethod, CalculationMethodId } from "@/types/prayer";
import { create } from "zustand";

export type LocationPermissionStatus =
  "checking" | "granted" | "denied" | "blocked";

interface PrayerStore {
  calculationMethod: CalculationMethodId;
  asrMethod: AsrMethod;

  latitude: number | null;
  longitude: number | null;

  locationLoading: boolean;
  locationError: string | null;
  locationPermissionStatus: LocationPermissionStatus;

  retryLocation: () => Promise<void>;

  setCalculationMethod: (method: CalculationMethodId) => void;

  setAsrMethod: (method: AsrMethod) => void;

  setCalculationSettings: (
    method: CalculationMethodId,
    asrMethod: AsrMethod,
  ) => void;

  setLocation: (latitude: number, longitude: number) => void;

  setLocationLoading: (loading: boolean) => void;

  setLocationError: (error: string | null) => void;

  setLocationPermissionStatus: (status: LocationPermissionStatus) => void;

  setRetryLocation: (retry: () => Promise<void>) => void;
}

export const usePrayerStore = create<PrayerStore>((set) => ({
  calculationMethod: "mwl",
  asrMethod: "standard",

  latitude: null,
  longitude: null,

  locationLoading: true,
  locationError: null,
  locationPermissionStatus: "checking",

  retryLocation: async () => {},

  setCalculationMethod: (method) =>
    set({
      calculationMethod: method,
    }),

  setAsrMethod: (method) =>
    set({
      asrMethod: method,
    }),

  setCalculationSettings: (method, asrMethod) =>
    set({
      calculationMethod: method,
      asrMethod,
    }),

  setLocation: (latitude, longitude) =>
    set({
      latitude,
      longitude,
      locationLoading: false,
      locationError: null,
      locationPermissionStatus: "granted",
    }),

  setLocationLoading: (loading) =>
    set({
      locationLoading: loading,
    }),

  setLocationError: (error) =>
    set({
      locationError: error,
      locationLoading: false,
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
