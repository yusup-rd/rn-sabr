import useDeviceHeading from "@/hooks/useDeviceHeading";
import useQiblaBearing from "@/hooks/useQiblaBearing";
import { shortestRotationPath } from "@/lib/qibla-calculations";
import { useTheme } from "@/providers/ThemeProvider";
import { useCallback, useEffect, useRef, useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
} from "react-native-reanimated";
import FacingReadout from "../readouts/FacingReadout";
import QiblaReadout from "../readouts/QiblaReadout";
import CalibrationCard from "../status/CalibrationCard";
import NoSensorFallback from "../status/NoSensorFallback";
import CompassDial from "./CompassDial";
import CompassIndicator from "./CompassIndicator";

const SPRING_STIFFNESS = 320;
const SPRING_DAMPING = 36;

const QiblaCompass = () => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  const dialSize = Math.min(width - 48, 340);

  const targetRotation = useSharedValue(0);
  const rotation = useSharedValue(0);
  const velocity = useSharedValue(0);
  const initialized = useSharedValue(false);

  const targetRotationRef = useRef<number | null>(null);

  const [showCalibration, setShowCalibration] = useState(false);

  const handleHeading = useCallback(
    (heading: number) => {
      if (!initialized.value) {
        initialized.value = true;
        targetRotationRef.current = heading;
        targetRotation.value = heading;
        rotation.value = heading;
        velocity.value = 0;

        return;
      }

      const previousTarget = targetRotationRef.current;

      if (previousTarget === null) {
        targetRotationRef.current = heading;
        targetRotation.value = heading;

        return;
      }

      const nextTarget = shortestRotationPath(previousTarget, heading);

      targetRotationRef.current = nextTarget;
      targetRotation.value = nextTarget;
    },
    [initialized, rotation, targetRotation, velocity],
  );

  const { heading, accuracy, hasSensor, permissionStatus } = useDeviceHeading({
    onHeading: handleHeading,
  });

  const qibla = useQiblaBearing();

  useEffect(() => {
    if (accuracy === null) {
      setShowCalibration(false);
      return;
    }

    const shouldShow = accuracy <= 1;

    const timeout = setTimeout(() => {
      setShowCalibration(shouldShow);
    }, 500);

    return () => clearTimeout(timeout);
  }, [accuracy]);

  const frameCallback = useCallback(
    (frame: { timeSincePreviousFrame: number | null }) => {
      "worklet";

      if (!initialized.value) {
        return;
      }

      const frameTime = frame.timeSincePreviousFrame;

      if (frameTime === null) {
        return;
      }

      const dt = Math.min(frameTime / 1000, 0.032);

      const displacement = targetRotation.value - rotation.value;

      const acceleration =
        displacement * SPRING_STIFFNESS - velocity.value * SPRING_DAMPING;

      velocity.value += acceleration * dt;
      rotation.value += velocity.value * dt;
    },
    [initialized, rotation, targetRotation, velocity],
  );

  useFrameCallback(frameCallback);

  const dialAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          rotate: `${-rotation.value}deg`,
        },
      ],
    }),
    [rotation],
  );

  if (qibla === null) {
    return (
      <View className="flex-1 items-center justify-center gap-3">
        <Text className="font-sans-semibold text-foreground text-lg">
          Location unavailable
        </Text>

        <Text className="text-muted-foreground px-8 text-center font-sans text-sm">
          Set your location to calculate the Qibla direction.
        </Text>
      </View>
    );
  }

  if (permissionStatus === "checking") {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-muted-foreground font-sans text-sm">
          Starting compass…
        </Text>
      </View>
    );
  }

  if (permissionStatus === "denied") {
    return (
      <View className="flex-1 items-center justify-center gap-3 px-8">
        <Text className="font-sans-semibold text-foreground text-lg">
          Compass permission required
        </Text>

        <Text className="text-muted-foreground text-center font-sans text-sm">
          Allow location access to use the Qibla compass.
        </Text>
      </View>
    );
  }

  if (heading === null && !hasSensor) {
    return (
      <View className="flex-1 items-center justify-center">
        <NoSensorFallback />
      </View>
    );
  }

  if (heading === null) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-muted-foreground font-sans text-sm">
          Finding your direction…
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center">
      <View className="items-center gap-10">
        <View
          style={{
            width: dialSize,
            height: dialSize,
          }}
          className="relative"
        >
          <Animated.View
            style={[
              {
                position: "absolute",
                width: dialSize,
                height: dialSize,
              },
              dialAnimatedStyle,
            ]}
          >
            <CompassDial
              size={dialSize}
              color={colors.primary}
              mutedColor={colors.mutedForeground}
              cardColor={colors.card}
              qiblaBearing={qibla.bearing}
              qiblaColor={colors.secondary}
            />
          </Animated.View>

          <CompassIndicator
            size={dialSize}
            color={colors.primary}
            cardColor={colors.card}
          />
        </View>

        <View className="items-center gap-5">
          <QiblaReadout bearing={qibla.bearing} distance={qibla.distance} />
          <FacingReadout heading={heading} />
          <CalibrationCard visible={showCalibration} />
        </View>
      </View>
    </View>
  );
};

export default QiblaCompass;
