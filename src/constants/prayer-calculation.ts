import type { AsrMethod, CalculationMethodId } from "@/types/prayer";

interface CalculationMethodOption {
  id: CalculationMethodId;
  key: string;
}

interface AsrMethodOption {
  id: AsrMethod;
  key: string;
}

export const calculationMethods: CalculationMethodOption[] = [
  {
    id: "mwl",
    key: "mwl",
  },
  {
    id: "isna",
    key: "isna",
  },
  {
    id: "egyptian",
    key: "egyptian",
  },
  {
    id: "karachi",
    key: "karachi",
  },
  {
    id: "umm-al-qura",
    key: "ummAlQura",
  },
];

export const asrMethods: AsrMethodOption[] = [
  {
    id: "standard",
    key: "standard",
  },
  {
    id: "hanafi",
    key: "hanafi",
  },
];
