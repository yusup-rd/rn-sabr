const METALS_API_URL = "https://api.metals.dev/v1/latest";
const METALS_API_KEY = process.env.EXPO_PUBLIC_METALS_API_KEY;

interface MetalsApiResponse {
  status: "success" | "failure";
  currency: string;
  unit: string;
  timestamps?: {
    currency: string;
    metal: string;
  };
  metals?: {
    gold: number;
    silver: number;
  };
  error_code?: number;
  error_message?: string;
}

export interface ZakatMarketPrices {
  goldPerGram: number;
  silverPerGram: number;
  updatedAt: string;
}

export const fetchZakatMarketPrices = async (): Promise<ZakatMarketPrices> => {
  if (!METALS_API_KEY) {
    throw new Error("Metals.Dev API key is not configured.");
  }

  const url = new URL(METALS_API_URL);

  url.searchParams.set("api_key", METALS_API_KEY);
  url.searchParams.set("currency", "USD");
  url.searchParams.set("unit", "g");

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
    },
  });

  const data: MetalsApiResponse = await response.json();

  if (!response.ok || data.status !== "success" || !data.metals) {
    throw new Error(data.error_message ?? "Failed to fetch metal prices.");
  }

  return {
    goldPerGram: data.metals.gold,
    silverPerGram: data.metals.silver,
    updatedAt: data.timestamps?.metal ?? new Date().toISOString(),
  };
};
