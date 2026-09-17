import { usePrayerStore } from "@/store/prayerStore";
import type { Prayer } from "@/types/prayer";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

interface ScheduledPrayerRowProps {
  prayer: Prayer;
  onPress: () => void;
}

const ScheduledPrayerRow = ({ prayer, onPress }: ScheduledPrayerRowProps) => {
  const notificationSettings = usePrayerStore(
    (state) => state.prayerNotifications[prayer.name],
  );

  const getNotificationLabel = () => {
    if (!notificationSettings.enabled) {
      return "Off";
    }

    if (notificationSettings.minutesBefore === 0) {
      return "At prayer time";
    }

    return `${notificationSettings.minutesBefore} min before`;
  };

  const notificationLabel = getNotificationLabel();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${prayer.name} prayer settings`}
      className="border-border active:bg-muted flex-row items-center justify-between border-b px-4 py-3.5"
    >
      <View className="min-w-0 flex-1 flex-row items-center gap-3">
        <View className="bg-muted size-9 shrink-0 items-center justify-center rounded-full">
          <Ionicons name={prayer.icon} size={16} className="text-primary" />
        </View>

        <View className="min-w-0 flex-1 gap-0.5">
          <View className="flex-row items-center gap-2">
            <Text className="font-sans-semibold text-foreground text-sm">
              {prayer.name}
            </Text>

            <View className="flex-row items-center gap-1">
              <Ionicons
                name={
                  notificationSettings.enabled
                    ? "notifications"
                    : "notifications-off"
                }
                size={12}
                className={
                  notificationSettings.enabled
                    ? "text-primary"
                    : "text-muted-foreground"
                }
              />

              <Text
                className={
                  notificationSettings.enabled
                    ? "font-sans-medium text-primary text-[10px]"
                    : "text-muted-foreground font-sans text-[10px]"
                }
              >
                {notificationLabel}
              </Text>
            </View>
          </View>

          <Text
            className="text-muted-foreground font-sans text-xs"
            numberOfLines={1}
          >
            {prayer.description}
          </Text>
        </View>
      </View>

      <View className="ml-3 flex-row items-center gap-3">
        <Text className="font-sans-semibold text-foreground text-base">
          {prayer.formattedTime}
        </Text>

        <Ionicons
          name="chevron-forward"
          size={14}
          className="text-muted-foreground"
        />
      </View>
    </Pressable>
  );
};

export default ScheduledPrayerRow;
