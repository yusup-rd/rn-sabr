import { NISAB_WEIGHTS, ZAKAT_RATE } from "@/constants/zakat";
import type {
  ZakatFormData,
  ZakatMarketPrices,
  ZakatSummary,
} from "@/types/zakat";

export const calculateTotalAssets = (data: ZakatFormData): number => {
  return (
    data.gold +
    data.silver +
    data.cashAndBank +
    data.futurePurposeSavings +
    data.moneyOwed +
    data.investments +
    data.businessStock
  );
};

export const calculateTotalLiabilities = (data: ZakatFormData): number => {
  return data.shortTermDebt + data.immediateBills + data.wagesDue;
};

export const calculateNetWealth = (data: ZakatFormData): number => {
  const totalAssets = calculateTotalAssets(data);
  const totalLiabilities = calculateTotalLiabilities(data);

  return Math.max(totalAssets - totalLiabilities, 0);
};

export const calculateNisabAmount = (
  data: ZakatFormData,
  marketPrices: ZakatMarketPrices,
): number => {
  if (data.nisabStandard === "gold") {
    return NISAB_WEIGHTS.gold * marketPrices.goldPerGram;
  }

  return NISAB_WEIGHTS.silver * marketPrices.silverPerGram;
};

export const meetsNisab = (netWealth: number, nisabAmount: number): boolean => {
  return netWealth >= nisabAmount;
};

export const calculateZakatAmount = (
  netWealth: number,
  nisabAmount: number,
): number => {
  if (!meetsNisab(netWealth, nisabAmount)) {
    return 0;
  }

  return netWealth * ZAKAT_RATE;
};

export const calculateZakatSummary = (
  data: ZakatFormData,
  marketPrices: ZakatMarketPrices,
): ZakatSummary => {
  const totalAssets = calculateTotalAssets(data);
  const totalLiabilities = calculateTotalLiabilities(data);
  const netWealth = Math.max(totalAssets - totalLiabilities, 0);
  const nisabAmount = calculateNisabAmount(data, marketPrices);
  const meetsNisabThreshold = meetsNisab(netWealth, nisabAmount);
  const zakatAmount = calculateZakatAmount(netWealth, nisabAmount);

  return {
    totalAssets,
    totalLiabilities,
    netWealth,
    nisabAmount,
    meetsNisab: meetsNisabThreshold,
    zakatAmount,
  };
};
