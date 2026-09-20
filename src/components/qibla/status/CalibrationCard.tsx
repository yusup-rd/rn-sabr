import { FontAwesome6 as Fa } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface CalibrationCardProps {
  visible: boolean;
}

const CalibrationCard = ({ visible }: CalibrationCardProps) => {
  if (!visible) {
    return null;
  }

  return (
    <View className="bg-card w-full flex-row items-center gap-3 rounded-xl px-4 py-3 shadow-md">
      <View className="bg-secondary-soft size-8 items-center justify-center rounded-full">
        <Fa
          name="compass"
          size={15}
          className="text-secondary-soft-foreground"
        />
      </View>

      <View className="flex-1">
        <Text className="font-sans-semibold text-foreground text-sm">
          Compass needs calibration
        </Text>

        <Text className="text-muted-foreground mt-0.5 font-sans text-xs leading-5">
          Move your phone in a figure-eight to improve compass accuracy.
        </Text>
      </View>
    </View>
  );
};

export default CalibrationCard;
