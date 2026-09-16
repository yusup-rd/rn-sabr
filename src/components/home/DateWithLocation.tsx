import { formatDate, formatHijriDate } from "@/lib/format";
import { FontAwesome6 as Fa } from "@expo/vector-icons";
import { Text, View } from "react-native";

const DateWithLocation = () => {
  const today = new Date();

  return (
    <View>
      <View className="flex-row items-center gap-1">
        <Fa name="location-dot" className="text-primary size-3" />
        <Text className="text-muted-foreground font-sans-semibold text-xs">
          Ashgabat, Turkmenistan
        </Text>

        <View className="bg-muted-foreground/50 size-1 rounded-full" />

        <Text className="font-sans-semibold text-secondary text-xs">
          {formatHijriDate(today)}
        </Text>
      </View>

      <Text className="font-sans-semibold text-foreground text-lg">
        <Text>{formatDate(today)}</Text>
      </Text>
    </View>
  );
};

export default DateWithLocation;
