import { FontAwesome6 as Fa } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface QiblaAlignmentStatusProps {
  isFacingQibla: boolean;
}

const QiblaAlignmentStatus = ({ isFacingQibla }: QiblaAlignmentStatusProps) => {
  if (isFacingQibla) {
    return (
      <View className="flex-row items-center gap-2">
        <View className="bg-primary-soft size-7 items-center justify-center rounded-full">
          <Fa name="check" size={17} className="text-primary" />
        </View>

        <Text className="font-sans-semibold text-primary text-sm">
          Facing Qibla
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-row items-center gap-2">
      <View className="bg-secondary-soft size-7 items-center justify-center rounded-full">
        <Fa
          name="location-arrow"
          size={14}
          className="text-secondary-soft-foreground"
        />
      </View>

      <Text className="font-sans-medium text-muted-foreground text-sm">
        Turn your phone towards Qibla
      </Text>
    </View>
  );
};

export default QiblaAlignmentStatus;
