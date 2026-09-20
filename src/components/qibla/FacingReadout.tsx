import { degreesToCompassLabel } from "@/lib/qibla-calculations";
import { Text, View } from "react-native";

interface FacingReadoutProps {
  heading: number;
}

const FacingReadout = ({ heading }: FacingReadoutProps) => {
  const direction = degreesToCompassLabel(heading);

  return (
    <View className="items-center">
      <Text className="font-sans-semibold text-foreground text-base">
        You facing
      </Text>

      <Text className="font-sans-medium text-muted-foreground mt-1 text-sm">
        {Math.round(heading)}° {direction}
      </Text>
    </View>
  );
};

export default FacingReadout;
