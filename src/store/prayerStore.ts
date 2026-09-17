import type {
  AsrMethod,
  CalculationMethodId,
  PrayerName,
} from "@/types/prayer";
import { create } from "zustand";

export type LocationPermissionStatus =
  "checking" | "granted" | "denied" | "blocked";

export interface PrayerNotificationSettings {
  enabled: boolean;
  minutesBefore: number;
}

interface PrayerStore {
  calculationMethod: CalculationMethodId;
  asrMethod: AsrMethod;

  latitude: number | null;
  longitude: number | null;
  locationLoading: boolean;
  locationError: string | null;
  locationPermissionStatus: LocationPermissionStatus;

  prayerNotifications: Record<PrayerName, PrayerNotificationSettings>;

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

  setPrayerNotification: (
    prayer: PrayerName,
    settings: PrayerNotificationSettings,
  ) => void;
}

export const usePrayerStore = create<PrayerStore>((set) => ({
  calculationMethod: "mwl",
  asrMethod: "standard",

  latitude: null,
  longitude: null,
  locationLoading: true,
  locationError: null,
  locationPermissionStatus: "checking",

  prayerNotifications: {
    Fajr: {
      enabled: false,
      minutesBefore: 10,
    },
    Dhuhr: {
      enabled: false,
      minutesBefore: 10,
    },
    Asr: {
      enabled: false,
      minutesBefore: 10,
    },
    Maghrib: {
      enabled: false,
      minutesBefore: 10,
    },
    Isha: {
      enabled: false,
      minutesBefore: 10,
    },
  },

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
      ...(error === null
        ? {}
        : {
            locationLoading: false,
            latitude: null,
            longitude: null,
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

  setPrayerNotification: (prayer, settings) =>
    set((state) => ({
      prayerNotifications: {
        ...state.prayerNotifications,
        [prayer]: settings,
      },
    })),
}));
