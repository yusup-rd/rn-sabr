import TasbihBeads from "@/components/tasbih/TasbihBeads";
import TasbihCord from "@/components/tasbih/TasbihCord";
import TasbihImame from "@/components/tasbih/TasbihImame";
import TasbihTassel from "@/components/tasbih/TasbihTassel";
import { getTasbihLayout } from "@/components/tasbih/tasbih-geometry";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";
import { Pressable, useWindowDimensions, View } from "react-native";
import {
  cancelAnimation,
  Easing,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const DESIGN_WIDTH = 320;
const DESIGN_HEIGHT = 680;

const BEAD_COUNT = 33;
const CYCLE_LENGTH = BEAD_COUNT + 1;

const COUNT_DURATION = 420;
const RESET_DELAY = 200;
const RESET_DURATION = 700;

const HORIZONTAL_PADDING = 24;
const VERTICAL_PADDING = 32;
const MAX_SCALE = 1.15;

const TASBIH_STORAGE_KEY = "@app/tasbih";

interface TasbihStorage {
  currentCount: number;
  totalCount: number;
}

interface TasbihArtworkProps {
  resetKey: number;
  onCountChange: (currentCount: number, totalCount: number) => void;
}

const TasbihArtwork = ({ resetKey, onCountChange }: TasbihArtworkProps) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const [tapCount, setTapCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  const layout = useMemo(() => getTasbihLayout(), []);

  const position = useSharedValue(0);

  const scale = useMemo(() => {
    const availableWidth = screenWidth - HORIZONTAL_PADDING * 2;
    const availableHeight = screenHeight - VERTICAL_PADDING * 2;

    return Math.min(
      availableWidth / DESIGN_WIDTH,
      availableHeight / DESIGN_HEIGHT,
      MAX_SCALE,
    );
  }, [screenWidth, screenHeight]);

  const artworkWidth = DESIGN_WIDTH * scale;
  const artworkHeight = DESIGN_HEIGHT * scale;

  /*
   * Restore the saved logical state.
   *
   * position is restored to the same count so the beads
   * visually match the saved counter.
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

        setTapCount(restoredCount);
        setTotalCount(restoredTotal);

        position.value = restoredCount;

        onCountChange(restoredCount, restoredTotal);
      } catch {
        // Ignore corrupted/missing storage and start from zero.
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
  }, [onCountChange, position]);

  /*
   * Save the logical count after every change.
   *
   * We don't save animation progress — only the actual
   * user-facing count.
   */
  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    const saveTasbih = async () => {
      try {
        const value: TasbihStorage = {
          currentCount: tapCount,
          totalCount,
        };

        await AsyncStorage.setItem(TASBIH_STORAGE_KEY, JSON.stringify(value));
      } catch {
        // Ignore storage failures.
      }
    };

    saveTasbih();
  }, [tapCount, totalCount, isHydrated]);

  const handlePress = () => {
    if (tapCount >= BEAD_COUNT) {
      return;
    }

    const nextTap = tapCount + 1;
    const nextTotal = totalCount + 1;

    setTapCount(nextTap);
    setTotalCount(nextTotal);

    onCountChange(nextTap, nextTotal);

    const cycleStart = Math.floor(position.value / CYCLE_LENGTH) * CYCLE_LENGTH;

    const nextPosition = cycleStart + nextTap;

    if (nextTap < BEAD_COUNT) {
      position.value = withTiming(nextPosition, {
        duration: COUNT_DURATION,
        easing: Easing.out(Easing.cubic),
      });

      return;
    }

    position.value = withSequence(
      withTiming(nextPosition, {
        duration: COUNT_DURATION,
        easing: Easing.out(Easing.cubic),
      }),
      withDelay(
        RESET_DELAY,
        withTiming(
          cycleStart + CYCLE_LENGTH,
          {
            duration: RESET_DURATION,
            easing: Easing.inOut(Easing.cubic),
          },
          (finished) => {
            if (!finished) {
              return;
            }

            scheduleOnRN(setTapCount, 0);
          },
        ),
      ),
    );
  };

  /*
   * Manual reset only.
   *
   * This is the ONLY place where persisted data is removed.
   */
  useEffect(() => {
    if (resetKey === 0) {
      return;
    }

    cancelAnimation(position);

    position.value = 0;

    setTapCount(0);
    setTotalCount(0);

    onCountChange(0, 0);

    AsyncStorage.removeItem(TASBIH_STORAGE_KEY).catch(() => {
      // Ignore storage failures.
    });
  }, [resetKey, onCountChange, position]);

  /*
   * Don't render the artwork until the persisted state has
   * been restored. This prevents a visible 0 -> savedCount jump.
   */
  if (!isHydrated) {
    return null;
  }

  return (
    <View
      style={{
        width: artworkWidth,
        height: artworkHeight,
      }}
    >
      <Pressable
        onPress={handlePress}
        className="items-center justify-center"
        style={{
          width: artworkWidth,
          height: artworkHeight,
        }}
      >
        <View
          style={{
            width: DESIGN_WIDTH,
            height: DESIGN_HEIGHT,
            transform: [{ scale }],
          }}
        >
          <TasbihCord width={DESIGN_WIDTH} height={520} />

          <View
            style={{
              position: "absolute",
              left: 122,
              top: 555,
            }}
          >
            <TasbihTassel />
          </View>

          <TasbihBeads layout={layout} position={position} />

          <View
            style={{
              position: "absolute",
              left: 131,
              top: 470,
            }}
          >
            <TasbihImame />
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default TasbihArtwork;
