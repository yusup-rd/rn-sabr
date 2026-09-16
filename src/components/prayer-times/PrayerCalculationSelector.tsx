import { calculationMethods } from "@/constants/prayer-calculation";
import { useLocationName } from "@/hooks/useLocationName";
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
  const { locationName } = useLocationName();

  const method = calculationMethods.find(
    (item) => item.id === calculationMethod,
  );

  const asrLabel = asrMethod === "hanafi" ? "Hanafi" : "Standard";

  return (
    <Pressable
      onPress={onPress}
      className="bg-border/50 flex-row items-center justify-between gap-2 rounded-xl px-4 py-2 shadow-xs"
    >
      <View className="flex-row items-center gap-2">
        <Fa name="location-dot" size={16} className="text-primary" />

        <View>
          <Text className="text-foreground font-sans-semibold text-xs">
            {locationName}
          </Text>

          <Text className="text-muted-foreground font-sans-semibold text-xs">
            {method?.description} • {asrLabel}
          </Text>
        </View>
      </View>

      <View className="bg-border flex-row items-center gap-1 rounded-full px-2 py-1">
        <Text className="text-primary font-sans-semibold text-xs">Change</Text>

        <Fa name="sliders" size={12} className="text-primary" />
      </View>
    </Pressable>
  );
};

export default PrayerCalculationSelector;
