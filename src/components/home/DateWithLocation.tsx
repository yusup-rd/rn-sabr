import { FontAwesome6 as Fa } from "@expo/vector-icons";
import { Text, View } from "react-native";

const DateWithLocation = () => {
  return (
    <View>
      <View className="flex-row items-center gap-1">
        <Fa name="location-dot" className="text-primary size-3" />
        <Text className="color-muted-foreground font-sans-semibold text-xs">
          Ashgabat, Turkmenistan
        </Text>

        <View className="bg-muted-foreground/50 size-1 rounded-full" />

        <Text className="font-sans-semibold color-secondary text-xs">
          14 Sha'ban 1446 AH
        </Text>
      </View>

      <Text className="font-sans-semibold text-foreground text-lg">
        Thursday, 13 February
      </Text>
    </View>
  );
};

export default DateWithLocation;
