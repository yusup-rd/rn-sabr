import { FontAwesome6 as Fa } from "@expo/vector-icons";
import { Text, View } from "react-native";

const NoSensorFallback = () => {
  return (
    <View className="w-full items-center gap-5">
      <View className="items-center justify-center gap-2">
        <View className="bg-primary-soft size-16 items-center justify-center rounded-full">
          <Fa name="compass" size={28} className="text-primary" />
        </View>

        <Text className="font-sans-semibold text-foreground text-center text-lg">
          Compass unavailable
        </Text>

        <Text className="text-muted-foreground max-w-sm text-center font-sans text-sm">
          This device doesn't have a compass sensor, so your facing direction
          can't be determined automatically.
        </Text>
      </View>

      <View className="bg-card w-full rounded-xl p-4 shadow-md">
        <View className="flex-row items-start gap-3">
          <View className="bg-secondary-soft size-7 items-center justify-center rounded-full">
            <Fa
              name="location-arrow"
              size={13}
              className="text-secondary-soft-foreground"
            />
          </View>

          <View className="flex-1 gap-0.5">
            <Text className="font-sans-semibold text-foreground text-sm">
              Qibla direction is still available
            </Text>

            <Text className="text-muted-foreground font-sans text-xs">
              Your Qibla bearing can still be calculated from your location. Use
              another compass to physically align yourself with it.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NoSensorFallback;
