import { degreesToCompassLabel } from "@/lib/qibla-calculations";
import { Text, View } from "react-native";

interface QiblaReadoutProps {
  bearing: number;
  distance: number;
}

const QiblaReadout = ({ bearing, distance }: QiblaReadoutProps) => {
  const direction = degreesToCompassLabel(bearing);

  return (
    <View className="items-center">
      <Text className="font-sans-semibold text-foreground text-base">
        Qibla
      </Text>

      <View className="mt-1 flex-row items-center">
        <Text className="font-sans-medium text-muted-foreground text-sm">
          {Math.round(bearing)}° {direction}
        </Text>

        <Text className="text-muted-foreground mx-2 text-xs">·</Text>

        <Text className="font-sans-medium text-muted-foreground text-sm">
          {Math.round(distance).toLocaleString()} km
        </Text>
      </View>
    </View>
  );
};

export default QiblaReadout;
