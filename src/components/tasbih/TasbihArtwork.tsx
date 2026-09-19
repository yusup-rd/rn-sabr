import TasbihBeads from "@/components/tasbih/TasbihBeads";
import TasbihCord from "@/components/tasbih/TasbihCord";
import TasbihImame from "@/components/tasbih/TasbihImame";
import TasbihTassel from "@/components/tasbih/TasbihTassel";
import { getTasbihLayout } from "@/components/tasbih/tasbih-geometry";
import { useMemo, useState } from "react";
import { Pressable, useWindowDimensions, View } from "react-native";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";

const DESIGN_WIDTH = 320;
const DESIGN_HEIGHT = 680;

const TasbihArtwork = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const [tapCount, setTapCount] = useState(0);

  const layout = useMemo(() => getTasbihLayout(), []);

  /*
   * This is the ONLY value that controls the bead animation.
   *
   * 0 = initial state
   * 1 = bead 1 has moved
   * 2 = bead 2 has moved
   * 3 = bead 3 has moved
   * ...
   */
  const position = useSharedValue(0);

  const scale = useMemo(() => {
    const horizontalPadding = 24;
    const verticalPadding = 32;

    const availableWidth = screenWidth - horizontalPadding * 2;

    const availableHeight = screenHeight - verticalPadding * 2;

    return Math.min(
      availableWidth / DESIGN_WIDTH,
      availableHeight / DESIGN_HEIGHT,
    );
  }, [screenWidth, screenHeight]);

  const artworkWidth = DESIGN_WIDTH * scale;
  const artworkHeight = DESIGN_HEIGHT * scale;

  const handlePress = () => {
    if (tapCount >= 33) {
      return;
    }

    const nextTap = tapCount + 1;

    /*
     * React state is only used for the tap count / app state.
     *
     * The actual visual animation is controlled exclusively
     * by the shared value.
     */
    setTapCount(nextTap);

    /*
     * IMPORTANT:
     *
     * We do NOT reset progress to 0.
     * We do NOT change the current bead's position manually.
     *
     * We simply move the single shared position:
     *
     * 0 → 1
     * 1 → 2
     * 2 → 3
     * ...
     */
    position.value = withTiming(nextTap, {
      duration: 420,
      easing: Easing.out(Easing.cubic),
    });
  };

  return (
    <Pressable
      onPress={handlePress}
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
