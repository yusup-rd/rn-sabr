import { CalculationMethod, Madhab, type CalculationParameters } from "adhan";

import type { AsrMethod, CalculationMethodId } from "@/types/prayer";

export function getCalculationParameters(
  method: CalculationMethodId,
  asrMethod: AsrMethod,
): CalculationParameters {
  const params = getCalculationMethod(method);

  params.madhab = asrMethod === "hanafi" ? Madhab.Hanafi : Madhab.Shafi;

  return params;
}

function getCalculationMethod(method: CalculationMethodId) {
  switch (method) {
    case "mwl":
      return CalculationMethod.MuslimWorldLeague();

    case "isna":
      return CalculationMethod.NorthAmerica();

    case "egyptian":
      return CalculationMethod.Egyptian();

    case "karachi":
      return CalculationMethod.Karachi();

    case "umm-al-qura":
      return CalculationMethod.UmmAlQura();

    default:
      return CalculationMethod.MuslimWorldLeague();
  }
}
