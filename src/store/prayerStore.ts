import type { AsrMethod, CalculationMethodId } from "@/types/prayer";
import { create } from "zustand";

interface PrayerStore {
  calculationMethod: CalculationMethodId;
  asrMethod: AsrMethod;

  latitude: number | null;
  longitude: number | null;

  setCalculationMethod: (method: CalculationMethodId) => void;
  setAsrMethod: (method: AsrMethod) => void;

  setCalculationSettings: (
    method: CalculationMethodId,
    asrMethod: AsrMethod,
  ) => void;

  setLocation: (latitude: number, longitude: number) => void;
}

export const usePrayerStore = create<PrayerStore>((set) => ({
  calculationMethod: "mwl",
  asrMethod: "standard",

  // TODO: Replace with GPS-derived coordinates later.
  latitude: 37.91609248656695,
  longitude: 58.35721334830225,

  setCalculationMethod: (method) => set({ calculationMethod: method }),

  setAsrMethod: (method) => set({ asrMethod: method }),

  setCalculationSettings: (method, asrMethod) =>
    set({
      calculationMethod: method,
      asrMethod,
    }),

  setLocation: (latitude, longitude) =>
    set({
      latitude,
      longitude,
    }),
}));
