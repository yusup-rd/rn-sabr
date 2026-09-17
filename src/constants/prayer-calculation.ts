import type { AsrMethod, CalculationMethodId } from "@/types/prayer";

interface CalculationMethodOption {
  id: CalculationMethodId;
  label: string;
  description: string;
}

export const calculationMethods: CalculationMethodOption[] = [
  {
    id: "mwl",
    label: "Muslim World League",
    description: "MWL",
  },
  {
    id: "isna",
    label: "Islamic Society of North America",
    description: "ISNA",
  },
  {
    id: "egyptian",
    label: "Egyptian General Authority",
    description: "Egyptian",
  },
  {
    id: "karachi",
    label: "University of Islamic Sciences, Karachi",
    description: "Karachi",
  },
  {
    id: "umm-al-qura",
    label: "Umm al-Qura University",
    description: "Umm al-Qura",
  },
];

export const asrMethods: {
  id: AsrMethod;
  label: string;
  description: string;
}[] = [
  {
    id: "standard",
    label: "Standard",
    description: "Shafi'i, Maliki & Hanbali",
  },
  {
    id: "hanafi",
    label: "Hanafi",
    description: "Hanafi",
  },
];
