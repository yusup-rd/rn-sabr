import { MaterialCommunityIcons as Mi } from "@expo/vector-icons";
import { Platform, Text, View } from "react-native";

interface CalibrationBannerProps {
  accuracy: number;
}

const CalibrationBanner = ({ accuracy }: CalibrationBannerProps) => {
  const isLowAccuracy =
    Platform.OS === "android"
      ? accuracy >= 0 && accuracy <= 1
      : accuracy === -1 || accuracy >= 3;

  if (!isLowAccuracy) return null;

  return (
    <View className="bg-secondary-muted flex-row items-center gap-3 rounded-xl p-4">
      <Mi name="compass-outline" size={22} className="text-secondary" />
      <View className="flex-1 gap-0.5">
        <Text className="font-sans-semibold text-foreground text-sm">
          Calibrate your compass
        </Text>
        <Text className="text-muted-foreground font-sans text-xs">
          Move your phone in a figure-eight motion until the compass becomes
          accurate.
        </Text>
      </View>
    </View>
  );
};

export default CalibrationBanner;
