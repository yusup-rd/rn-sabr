import { BEAD_COUNT, TASBIH_STORAGE_KEY } from "@/constants/tasbih";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

interface TasbihStorage {
  currentCount: number;
  totalCount: number;
}

interface UseTasbihReturn {
  currentCount: number;
  totalCount: number;
  isHydrated: boolean;
  recordTap: (count: number) => void;
  reset: () => void;
}

export const useTasbih = (): UseTasbihReturn => {
  const [currentCount, setCurrentCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  /*
   * Restore the persisted logical state.
   */
  useEffect(() => {
    let cancelled = false;

    const restoreTasbih = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(TASBIH_STORAGE_KEY);

        if (cancelled) {
          return;
        }

        if (!storedValue) {
          setIsHydrated(true);
          return;
        }

        const stored: TasbihStorage = JSON.parse(storedValue);

        const restoredCount = Math.max(
          0,
          Math.min(BEAD_COUNT, stored.currentCount),
        );

        const restoredTotal = Math.max(0, stored.totalCount);

        setCurrentCount(restoredCount);
        setTotalCount(restoredTotal);
      } catch {
        // Ignore corrupted or unavailable storage.
      } finally {
        if (!cancelled) {
          setIsHydrated(true);
        }
      }
    };

    restoreTasbih();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * Persist logical state whenever it changes.
   *
   * Animation state is intentionally NOT stored here.
   */
  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    const saveTasbih = async () => {
      try {
        const value: TasbihStorage = {
          currentCount,
          totalCount,
        };

        await AsyncStorage.setItem(TASBIH_STORAGE_KEY, JSON.stringify(value));
      } catch {
        // Ignore storage failures.
      }
    };

    saveTasbih();
  }, [currentCount, totalCount, isHydrated]);

  /*
   * Called once for every physical tap.
   */
  const recordTap = useCallback((count: number) => {
    setCurrentCount(count);
    setTotalCount((value) => value + 1);
  }, []);

  /*
   * Manual reset.
   *
   * This is the only place that removes persisted data.
   */
  const reset = useCallback(() => {
    setCurrentCount(0);
    setTotalCount(0);

    AsyncStorage.removeItem(TASBIH_STORAGE_KEY).catch(() => {
      // Ignore storage failures.
    });
  }, []);

  return {
    currentCount,
    totalCount,
    isHydrated,
    recordTap,
    reset,
  };
};
