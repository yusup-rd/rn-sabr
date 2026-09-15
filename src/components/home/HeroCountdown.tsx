import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import {
  FontAwesome6 as Fa,
  MaterialCommunityIcons as Mi,
} from "@expo/vector-icons";
import { Text, View } from "react-native";

const HeroCountdown = () => {
  const { previousPrayer, nextPrayer, countdown, elapsedPercent, solarEvent } =
    usePrayerTimes();

  if (!nextPrayer) {
    return (
      <View className="bg-primary relative overflow-hidden rounded-xl p-6 shadow-md">
        <View className="pointer-events-none absolute -top-12 -right-5 opacity-10">
          <Fa name="star-and-crescent" size={224} color="white" />
        </View>

        <View className="relative gap-2">
          <Text className="font-sans-semibold text-primary-foreground text-lg">
            Prayer times unavailable
          </Text>

          <Text className="text-primary-foreground/80 font-sans text-sm">
            Set your location to calculate prayer times.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="bg-primary relative overflow-hidden rounded-xl p-6 shadow-md">
      <View className="pointer-events-none absolute -top-12 -right-5 opacity-10">
        <Fa name="star-and-crescent" size={224} color="white" />
      </View>

      <View className="relative gap-2">
        <View className="flex-row items-center justify-between gap-3">
          <View className="bg-background/10 flex-row items-center gap-1.5 self-start rounded-full px-2.5 py-1">
            <View className="bg-secondary size-2 animate-pulse rounded-full" />

            <Text className="font-sans-semibold text-primary-foreground uppercase">
              Next Prayer
            </Text>
          </View>

          <Text className="font-sans-semibold text-primary-foreground/80 text-xs">
            {nextPrayer.name} • {nextPrayer.formattedTime}
          </Text>
        </View>

        <View>
          <Text className="text-primary-foreground/80 font-sans text-xs">
            Time Remaining
          </Text>

          <Text className="font-sans-semibold text-primary-foreground text-3xl tabular-nums">
            {countdown}
          </Text>
        </View>

        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <Text className="font-sans-semibold text-primary-foreground/80 text-xs">
              {previousPrayer.name} ({previousPrayer.formattedTime})
            </Text>

            <Text className="font-sans-semibold text-secondary text-xs">
              {Math.round(elapsedPercent)}% elapsed
            </Text>

            <Text className="font-sans-semibold text-primary-foreground/80 text-xs">
              {nextPrayer.name}
            </Text>
          </View>

          <View className="bg-primary-foreground/20 h-2 w-full overflow-hidden rounded-full">
            <View
              className="bg-secondary h-full rounded-full"
              style={{
                width: `${elapsedPercent}%`,
              }}
            />
          </View>
        </View>

        <View className="flex-row items-center justify-between pt-2">
          <View className="flex-row gap-1.5">
            <Mi name="weather-sunset" size={14} className="text-secondary" />

            <Text className="text-primary-foreground/80 font-sans text-xs">
              {solarEvent.label} in {solarEvent.remainingFormatted}
            </Text>
          </View>

          {/* TODO: Add Qibla direction once feature implemented */}
          <Text className="font-sans-semibold text-primary-foreground text-xs">
            Qibla: 118° SE
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HeroCountdown;
