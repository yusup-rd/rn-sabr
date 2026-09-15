export type PrayerStatus = "completed" | "soon" | "upcoming";

export type Prayer =
  | {
      name: string;
      time: string;
      description: string;
      icon:
        | "partly-sunny-outline"
        | "sunny-outline"
        | "cloudy-outline"
        | "moon-outline";
      iconFamily: "ionicons";
      status: PrayerStatus;
    }
  | {
      name: string;
      time: string;
      description: string;
      icon: "sunset";
      iconFamily: "feather";
      status: PrayerStatus;
    };

export type CalculationMethodId =
  "mwl" | "isna" | "egyptian" | "karachi" | "umm-al-qura";

export type AsrMethod = "standard" | "hanafi";

export interface PrayerCalculationSettings {
  method: CalculationMethodId;
  asrMethod: AsrMethod;
}
