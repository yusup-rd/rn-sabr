import { calculationMethods } from "@/constants/prayer-calculation";
import { useLocationStore } from "@/store/locationStore";
import type { AsrMethod, CalculationMethodId } from "@/types/prayer";
import { FontAwesome6 as Fa } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

interface PrayerCalculationSelectorProps {
  calculationMethod: CalculationMethodId;
  asrMethod: AsrMethod;
  onPress: () => void;
}

const PrayerCalculationSelector = ({
  calculationMethod,
  asrMethod,
  onPress,
}: PrayerCalculationSelectorProps) => {
  const locationName = useLocationStore((state) => state.locationName);

  const method = calculationMethods.find(
    (item) => item.id === calculationMethod,
  );

  const asrLabel = asrMethod === "hanafi" ? "Hanafi" : "Standard";

  return (
    <Pressable
      onPress={onPress}
      className="bg-card active:bg-muted rounded-2xl px-4 py-3.5 shadow-md"
    >
      {/* Location */}
      <View className="flex-row items-center gap-2">
        <Fa name="location-dot" size={12} className="text-primary" />

        <Text
          className="text-muted-foreground font-sans-medium flex-1 text-xs"
          numberOfLines={1}
        >
          {locationName ?? "Locating..."}
        </Text>

        <Fa name="chevron-right" size={11} className="text-muted-foreground" />
      </View>

      <View className="bg-border my-3 h-px" />

      {/* Calculation settings */}
      <View className="flex-row">
        {/* Calculation method */}
        <View className="flex-1">
          <Text className="text-muted-foreground font-sans-medium text-xs">
            Calculation method
          </Text>

          <Text
            className="text-foreground font-sans-semibold mt-1 text-sm"
            numberOfLines={1}
          >
            {method?.description ?? "Unknown"}
          </Text>
        </View>

        {/* Asr method */}
        <View className="flex-1">
          <Text className="text-muted-foreground font-sans-medium text-xs">
            Asr method
          </Text>

          <Text className="text-foreground font-sans-semibold mt-1 text-sm">
            {asrLabel}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default PrayerCalculationSelector;
