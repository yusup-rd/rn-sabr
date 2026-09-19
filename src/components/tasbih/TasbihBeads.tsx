import TasbihBead from "@/components/tasbih/TasbihBead";
import { TasbihLayout, TasbihPoint } from "@/components/tasbih/tasbih-geometry";
import { memo } from "react";
import { View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface TasbihBeadsProps {
  layout: TasbihLayout;
  position: SharedValue<number>;
}

const BEAD_SIZE = 38;

const TasbihBeads = ({ layout, position }: TasbihBeadsProps) => {
  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 320,
        height: 520,
      }}
    >
      {layout.beads.map((originalPoint, index) => {
        const beadNumber = index + 1;

        const target =
          beadNumber === 1 ? layout.gap : layout.beads[beadNumber - 2];

        return (
          <AnimatedBead
            key={beadNumber}
            beadNumber={beadNumber}
            originalPoint={originalPoint}
            target={target}
            position={position}
          />
        );
      })}
    </View>
  );
};

interface AnimatedBeadProps {
  beadNumber: number;
  originalPoint: TasbihPoint;
  target: TasbihPoint;
  position: SharedValue<number>;
}

const AnimatedBead = memo(
  ({ beadNumber, originalPoint, target, position }: AnimatedBeadProps) => {
    const animatedStyle = useAnimatedStyle(() => {
      /*
       * Convert the global position into this bead's
       * local animation progress.
       *
       * Example for bead 4:
       *
       * position < 3:
       *   bead 4 stays at original position
       *
       * position 3 → 4:
       *   bead 4 moves
       *
       * position >= 4:
       *   bead 4 stays at target
       */
      const localProgress = position.value - (beadNumber - 1);

      let x = originalPoint.x;
      let y = originalPoint.y;

      if (localProgress <= 0) {
        /*
         * This bead has not started moving yet.
         */
        x = originalPoint.x;
        y = originalPoint.y;
      } else if (localProgress >= 1) {
        /*
         * This bead has already completed its movement.
         */
        x = target.x;
        y = target.y;
      } else {
        /*
         * This bead is currently moving.
         */
        x = originalPoint.x + (target.x - originalPoint.x) * localProgress;

        y = originalPoint.y + (target.y - originalPoint.y) * localProgress;
      }

      return {
        position: "absolute",
        left: 0,
        top: 0,

        width: BEAD_SIZE,
        height: BEAD_SIZE,

        transform: [
          {
            translateX: x - BEAD_SIZE / 2,
          },
          {
            translateY: y - BEAD_SIZE / 2,
          },
        ],
      };
    });

    return (
      <Animated.View
        pointerEvents="none"
        style={animatedStyle}
        renderToHardwareTextureAndroid={false}
        shouldRasterizeIOS={false}
      >
        <TasbihBead size={BEAD_SIZE} />
      </Animated.View>
    );
  },
);

export default TasbihBeads;
