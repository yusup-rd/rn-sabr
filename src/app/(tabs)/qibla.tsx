import QiblaCompass from "@/components/qibla/compass/QiblaCompass";
import CompassReadout from "@/components/qibla/readouts/CompassReadout";
import CalibrationCard from "@/components/qibla/status/CalibrationCard";
import NoSensorFallback from "@/components/qibla/status/NoSensorFallback";
import QiblaAlignmentStatus from "@/components/qibla/status/QiblaAlignmentStatus";
import useQiblaCompass from "@/hooks/useQiblaCompass";
import { styled } from "nativewind";
import { Text, View } from "react-native";
import { SafeAreaView as NativeSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(NativeSafeAreaView);

const Qibla = () => {
  const {
    heading,
    qibla,
    hasSensor,
    permissionStatus,
    showCalibration,
    isFacingQibla,
    rotation,
  } = useQiblaCompass();

  return (
    <SafeAreaView className="bg-background flex-1 p-5">
      {qibla === null ? (
        <View className="flex-1 items-center justify-center gap-3">
          <Text className="font-sans-semibold text-foreground text-lg">
            Location unavailable
          </Text>

          <Text className="text-muted-foreground px-8 text-center font-sans text-sm">
            Set your location to calculate the Qibla direction.
          </Text>
        </View>
      ) : permissionStatus === "checking" ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-muted-foreground font-sans text-sm">
            Starting compass…
          </Text>
        </View>
      ) : permissionStatus === "denied" ? (
        <View className="flex-1 items-center justify-center gap-3 px-8">
          <Text className="font-sans-semibold text-foreground text-lg">
            Compass permission required
          </Text>

          <Text className="text-muted-foreground text-center font-sans text-sm">
            Allow location access to use the Qibla compass.
          </Text>
        </View>
      ) : heading === null && !hasSensor ? (
        <View className="flex-1 items-center justify-center">
          <NoSensorFallback />
        </View>
      ) : heading === null ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-muted-foreground font-sans text-sm">
            Finding your direction…
          </Text>
        </View>
      ) : (
        <View className="flex-1">
          <View className="h-28 items-center justify-start gap-4">
            <QiblaAlignmentStatus isFacingQibla={isFacingQibla} />

            <View className="w-full">
              <CalibrationCard visible={showCalibration} />
            </View>
          </View>

          <View className="flex-1 items-center justify-center">
            <QiblaCompass bearing={qibla.bearing} rotation={rotation} />
          </View>

          <View className="h-24 w-full justify-end">
            <CompassReadout
              bearing={qibla.bearing}
              distance={qibla.distance}
              heading={heading}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Qibla;
