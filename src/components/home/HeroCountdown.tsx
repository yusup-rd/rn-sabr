import {
  FontAwesome6 as Fa,
  MaterialCommunityIcons as Mi,
} from "@expo/vector-icons";
import { Text, View } from "react-native";

const HeroCountdown = () => {
  return (
    <View className="bg-primary relative overflow-hidden rounded-xl p-6">
      <View className="pointer-events-none absolute -top-12 -right-5 opacity-10">
        <Fa name="star-and-crescent" size={224} color="white" />
      </View>

      <View className="relative gap-2">
        <View className="flex-row items-center justify-between gap-3">
          <View className="bg-background/10 flex-row items-center gap-1.5 self-start rounded-full px-2.5 py-1">
            <View className="bg-secondary size-2 rounded-full" />

            <Text className="font-sans-semibold text-primary-foreground uppercase">
              Next Prayer
            </Text>
          </View>

          <Text className="font-sans-semibold text-primary-foreground/80 text-xs">
            Maghrib • 5:18 PM
          </Text>
        </View>

        <View>
          <Text className="text-primary-foreground/80 font-sans text-xs">
            Time Remaining
          </Text>

          <Text className="font-sans-semibold text-primary-foreground text-3xl tabular-nums">
            01:24:16
          </Text>
        </View>

        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <Text className="font-sans-semibold text-primary-foreground/80 text-xs">
              Asr (3:15 PM)
            </Text>

            <Text className="font-sans-semibold text-secondary text-xs">
              68% elapsed
            </Text>

            <Text className="font-sans-semibold text-primary-foreground/80 text-xs">
              Maghrib
            </Text>
          </View>

          <View className="bg-primary-foreground/20 h-2 w-full overflow-hidden rounded-full">
            <View
              className="bg-secondary h-full rounded-full"
              style={{ width: "68%" }}
            />
          </View>
        </View>

        <View className="flex-row items-center justify-between pt-2">
          <View className="flex-row gap-1.5">
            <Mi name="weather-sunset" size={14} color="#D6B66A" />

            <Text className="text-primary-foreground/80 font-sans text-xs">
              Sunset in 1 hr 24 mins
            </Text>
          </View>

          <Text className="font-sans-semibold text-primary-foreground text-xs">
            Qibla: 118° SE
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HeroCountdown;
