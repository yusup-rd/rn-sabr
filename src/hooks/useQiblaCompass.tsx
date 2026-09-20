import useDeviceHeading from "@/hooks/useDeviceHeading";
import useQiblaBearing from "@/hooks/useQiblaBearing";
import {
  getAngularDifference,
  shortestRotationPath,
} from "@/lib/qibla-calculations";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFrameCallback, useSharedValue } from "react-native-reanimated";

const SPRING_STIFFNESS = 320;
const SPRING_DAMPING = 36;
const QIBLA_ALIGNMENT_THRESHOLD = 5;

const useQiblaCompass = () => {
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

  const qiblaDifference =
    heading === null || qibla === null
      ? null
      : getAngularDifference(heading, qibla.bearing);

  const isFacingQibla =
    qiblaDifference !== null && qiblaDifference <= QIBLA_ALIGNMENT_THRESHOLD;

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

  return {
    heading,
    qibla,
    hasSensor,
    permissionStatus,
    showCalibration,
    isFacingQibla,
    rotation,
  };
};

export default useQiblaCompass;
