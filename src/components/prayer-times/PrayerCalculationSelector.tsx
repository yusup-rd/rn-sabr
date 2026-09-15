import { FontAwesome6 as Fa } from "@expo/vector-icons";
import { Text, View } from "react-native";

const PrayerCalculationSelector = () => {
  return (
    <View className="bg-border/50 flex-row items-center justify-between gap-2 rounded-xl px-4 py-2 shadow-xs">
      <View className="flex-row items-center gap-2">
        <Fa name="location-dot" size={16} className="text-primary" />
        <View>
          <Text className="text-foreground font-sans-semibold text-xs">
            Ashgabat, Turkmenistan
          </Text>
          <Text className="text-muted-foreground font-sans-semibold text-xs">
            ISNA • Hanafi / Shafi'i Standard
          </Text>
        </View>
      </View>

      <View className="bg-border flex-row items-center gap-1 rounded-full px-3 py-2">
        <Text className="text-primary font-sans-semibold text-sm">Change</Text>
        <Fa name="sliders" size={14} className="text-primary" />
      </View>
    </View>
  );
};

export default PrayerCalculationSelector;
