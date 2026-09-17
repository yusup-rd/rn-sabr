import { formatDate, formatHijriDate } from "@/lib/format";
import { useLocationStore } from "@/store/locationStore";
import { FontAwesome6 as Fa } from "@expo/vector-icons";
import { Text, View } from "react-native";

const DateWithLocation = () => {
  const today = new Date();

  const locationName = useLocationStore((state) => state.locationName);
  const locationNameStatus = useLocationStore(
    (state) => state.locationNameStatus,
  );

  return (
    <View>
      <View className="flex-row items-center gap-1">
        <Fa name="location-dot" className="text-primary size-3" />

        <Text
          className="text-muted-foreground font-sans-semibold text-xs"
          numberOfLines={1}
        >
          {locationNameStatus === "loading"
            ? "Locating..."
            : (locationName ?? "Location unavailable")}
        </Text>

        <View className="bg-muted-foreground/50 size-1 rounded-full" />

        <Text className="font-sans-semibold text-secondary text-xs">
          {formatHijriDate(today)}
        </Text>
      </View>

      <Text className="font-sans-semibold text-foreground text-lg">
        {formatDate(today)}
      </Text>
    </View>
  );
};

export default DateWithLocation;
