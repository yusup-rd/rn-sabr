import TasbihBeads from "@/components/tasbih/TasbihBeads";
import TasbihCord from "@/components/tasbih/TasbihCord";
import TasbihImame from "@/components/tasbih/TasbihImame";
import TasbihTassel from "@/components/tasbih/TasbihTassel";
import { getTasbihLayout } from "@/components/tasbih/tasbih-geometry";
import { useMemo, useState } from "react";
import { Pressable, useWindowDimensions, View } from "react-native";
import {
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
const COUNT_DURATION = 420;
const RESET_DELAY = 200;
const RESET_DURATION = 700;

const HORIZONTAL_PADDING = 24;
const VERTICAL_PADDING = 32;
const MAX_SCALE = 1.15;

const TasbihArtwork = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const [tapCount, setTapCount] = useState(0);
  const layout = useMemo(() => getTasbihLayout(), []);

  // Position stays continuous between cycles to prevent a visual jump after reset.
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

  const handlePress = () => {
    if (tapCount >= BEAD_COUNT) {
      return;
    }

    const nextTap = tapCount + 1;
    setTapCount(nextTap);

    const cycleStart =
      Math.floor(position.value / (BEAD_COUNT + 1)) * (BEAD_COUNT + 1);

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
          cycleStart + BEAD_COUNT + 1,
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

  return (
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
  );
};

export default TasbihArtwork;
