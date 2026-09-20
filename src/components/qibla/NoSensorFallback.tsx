import { MaterialCommunityIcons as Mi } from "@expo/vector-icons";
import { Text, View } from "react-native";

const NoSensorFallback = () => {
  return (
    <View className="items-center gap-4 px-8">
      <View className="bg-primary-muted items-center justify-center rounded-full p-5">
        <Mi name="compass-off" size={36} className="text-primary" />
      </View>

      <View className="items-center gap-2">
        <Text className="font-sans-semibold text-foreground text-lg">
          Compass unavailable
        </Text>

        <Text className="text-muted-foreground text-center font-sans text-sm">
          Your device doesn't appear to provide heading information needed to
          use the Qibla compass.
        </Text>
      </View>
    </View>
  );
};

export default NoSensorFallback;
