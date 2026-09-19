import {
  fetchZakatMarketPrices,
  type ZakatMarketPrices,
} from "@/api/metals-api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const CACHE_KEY = "@sabr/zakat-market-prices"; // Key used to store the cached market prices in AsyncStorage
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface CachedZakatMarketPrices {
  prices: ZakatMarketPrices;
  cachedAt: number;
}

interface UseZakatMarketPricesResult {
  prices: ZakatMarketPrices | null;
  isLoading: boolean;
  error: string | null;
  isStale: boolean;
}

const isValidCache = (cached: CachedZakatMarketPrices): boolean => {
  return (
    cached.prices.goldPerGram > 0 &&
    cached.prices.silverPerGram > 0 &&
    cached.cachedAt > 0
  );
};

const useZakatMarketPrices = (): UseZakatMarketPricesResult => {
  const [prices, setPrices] = useState<ZakatMarketPrices | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isStale, setIsStale] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadPrices = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const cachedValue = await AsyncStorage.getItem(CACHE_KEY);

        if (cachedValue) {
          try {
            const cached: CachedZakatMarketPrices = JSON.parse(cachedValue);

            if (isValidCache(cached)) {
              const cacheAge = Date.now() - cached.cachedAt;

              if (cacheAge < CACHE_TTL) {
                if (isMounted) {
                  setPrices(cached.prices);
                  setIsStale(false);
                  setIsLoading(false);
                }

                return;
              }

              // Cache exists but is expired.
              // Keep it as a fallback if the API fails.
              if (isMounted) {
                setPrices(cached.prices);
                setIsStale(true);
              }
            }
          } catch {
            await AsyncStorage.removeItem(CACHE_KEY);
          }
        }

        try {
          const freshPrices = await fetchZakatMarketPrices();

          const newCache: CachedZakatMarketPrices = {
            prices: freshPrices,
            cachedAt: Date.now(),
          };

          await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(newCache));

          if (isMounted) {
            setPrices(freshPrices);
            setIsStale(false);
            setError(null);
          }
        } catch {
          if (isMounted) {
            setError("Unable to update market prices.");
          }
        }
      } catch {
        if (isMounted) {
          setError("Unable to load market prices.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPrices();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    prices,
    isLoading,
    error,
    isStale,
  };
};

export default useZakatMarketPrices;
