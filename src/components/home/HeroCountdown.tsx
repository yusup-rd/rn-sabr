import { Text, View } from "react-native";

const HeroCountdown = () => {
  return (
    <View className="bg-primary gap-1 rounded-xl p-6">
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
        <Text className="font-sans-semibold text-primary-foreground text-3xl">
          01:24:16
        </Text>
      </View>
    </View>
  );
};

export default HeroCountdown;
