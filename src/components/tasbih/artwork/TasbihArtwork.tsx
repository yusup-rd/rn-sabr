import TasbihBeads from "@/components/tasbih/artwork/TasbihBeads";
import TasbihCord from "@/components/tasbih/artwork/TasbihCord";
import TasbihImame from "@/components/tasbih/artwork/TasbihImame";
import TasbihTassel from "@/components/tasbih/artwork/TasbihTassel";
import { getTasbihLayout } from "@/components/tasbih/geometry/tasbih-geometry";
import {
  BEAD_COUNT,
  COUNT_DURATION,
  CYCLE_LENGTH,
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  HORIZONTAL_PADDING,
  MAX_SCALE,
  RESET_DELAY,
  RESET_DURATION,
  VERTICAL_PADDING,
} from "@/constants/tasbih";
import { useEffect, useMemo, useRef, useState } from "react";
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

interface TasbihArtworkProps {
  resetKey: number;
  initialCount: number;
  isHydrated: boolean;
  onTap: (count: number) => void;
}

const TasbihArtwork = ({
  resetKey,
  initialCount,
  isHydrated,
  onTap,
}: TasbihArtworkProps) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  /*
   * Animation-local count.
   *
   * This controls the logical bead animation cycle.
   * It is intentionally separate from the persisted
   * screen state managed by useTasbih.
   */
  const [tapCount, setTapCount] = useState(0);

  /*
   * Prevent the hydration value from being applied
   * repeatedly after the animation has started.
   */
  const hasInitialized = useRef(false);

  /*
   * IMPORTANT:
   *
   * position is the sole source of truth for bead animation.
   *
   * TasbihBeads derives every bead position from this value.
   */
  const position = useSharedValue(0);

  const layout = useMemo(() => getTasbihLayout(), []);

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
   * Restore the animation position AFTER the persisted
   * state has been hydrated.
   *
   * This fixes the previous bug:
   *
   * Counter = 17
   * Beads   = position 0
   *
   * because useSharedValue(initialCount) only uses its
   * initial value once.
   */
  useEffect(() => {
    if (!isHydrated || hasInitialized.current) {
      return;
    }

    hasInitialized.current = true;

    setTapCount(initialCount);
    position.value = initialCount;
  }, [isHydrated, initialCount, position]);

  /*
   * Manual reset.
   *
   * This explicitly resets both the animation and its
   * local logical count.
   */
  useEffect(() => {
    if (resetKey === 0) {
      return;
    }

    cancelAnimation(position);

    position.value = 0;
    setTapCount(0);
  }, [resetKey, position]);

  const handlePress = () => {
    if (tapCount >= BEAD_COUNT) {
      return;
    }

    const nextTap = tapCount + 1;

    /*
     * Persist the logical count.
     *
     * This does not control the bead animation.
     */
    onTap(nextTap);

    setTapCount(nextTap);

    /*
     * Keep animation position continuous across cycles.
     */
    const cycleStart = Math.floor(position.value / CYCLE_LENGTH) * CYCLE_LENGTH;

    const nextPosition = cycleStart + nextTap;

    /*
     * Normal tap:
     * move the beads one position.
     */
    if (nextTap < BEAD_COUNT) {
      position.value = withTiming(nextPosition, {
        duration: COUNT_DURATION,
        easing: Easing.out(Easing.cubic),
      });

      return;
    }

    /*
     * 33rd tap:
     *
     * 1. Move final bead into position.
     * 2. Pause.
     * 3. Reset the whole string.
     * 4. Only after the animation finishes,
     *    reset the animation-local tap count.
     */
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
   * The screen itself is rendered immediately.
   * Only the artwork waits for hydration.
   *
   * This prevents the previous white-screen flicker.
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
