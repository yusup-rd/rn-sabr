import { formatDuration, formatTime } from "@/lib/format";
import { Text, View } from "react-native";

interface NightSummaryProps {
  sunset: Date;
  fajr: Date;
  nightDuration: number;
}

const NightSummary = ({ sunset, fajr, nightDuration }: NightSummaryProps) => {
  return (
    <View className="flex-row items-end">
      <View className="flex-1 gap-0.5">
        <Text className="text-muted-foreground font-sans text-xs">Sunset</Text>

        <Text className="font-sans-semibold text-foreground text-base">
          {formatTime(sunset)}
        </Text>
      </View>

      <View className="items-center gap-0.5">
        <Text className="text-muted-foreground font-sans text-xs">Night</Text>

        <Text className="font-sans-semibold text-primary text-base">
          {formatDuration(nightDuration)}
        </Text>
      </View>

      <View className="flex-1 items-end gap-0.5">
        <Text className="text-muted-foreground font-sans text-xs">Fajr</Text>

        <Text className="font-sans-semibold text-foreground text-base">
          {formatTime(fajr)}
        </Text>
      </View>
    </View>
  );
};

export default NightSummary;
