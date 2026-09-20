import { degreesToCompassLabel } from "@/lib/qibla-calculations";
import { Text, View } from "react-native";

interface CompassReadoutProps {
  bearing: number;
  distance: number;
  heading: number;
}

const CompassReadout = ({
  bearing,
  distance,
  heading,
}: CompassReadoutProps) => {
  const qiblaDirection = degreesToCompassLabel(bearing);
  const facingDirection = degreesToCompassLabel(heading);

  return (
    <View className="bg-card w-full flex-row items-center justify-between rounded-xl px-5 py-4 shadow-md">
      <View className="flex-1 items-center gap-1">
        <Text className="font-sans-semibold text-foreground text-base">
          Qibla
        </Text>

        <View className="flex-row items-center gap-2">
          <Text className="font-sans-medium text-muted-foreground text-sm">
            {Math.round(bearing)}° {qiblaDirection}
          </Text>

          <Text className="text-muted-foreground text-xs">·</Text>

          <Text className="font-sans-medium text-muted-foreground text-sm">
            {Math.round(distance).toLocaleString()} km
          </Text>
        </View>
      </View>

      <View className="bg-border h-10 w-px" />

      <View className="flex-1 items-center gap-1">
        <Text className="font-sans-semibold text-foreground text-base">
          You&apos;re facing
        </Text>

        <Text className="font-sans-medium text-muted-foreground text-sm">
          {Math.round(heading)}° {facingDirection}
        </Text>
      </View>
    </View>
  );
};

export default CompassReadout;
