import { useTheme } from "@/providers/ThemeProvider";
import { usePrayerStore } from "@/store/prayerStore";
import type { Prayer } from "@/types/prayer";
import { BottomSheet, Host, RNHostView } from "@expo/ui";
import { background } from "@expo/ui/jetpack-compose/modifiers";
import { presentationBackground } from "@expo/ui/swift-ui/modifiers";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Switch, Text, View } from "react-native";

interface PrayerTimeSettingsSheetProps {
  visible: boolean;
  prayer: Prayer | null;
  onClose: () => void;
}

const reminderOptions = [0, 5, 10, 15];

const PrayerTimeSettingsSheet = ({
  visible,
  prayer,
  onClose,
}: PrayerTimeSettingsSheetProps) => {
  const { colors } = useTheme();

  const { prayerNotifications, setPrayerNotification } = usePrayerStore();

  const [enabled, setEnabled] = useState(false);
  const [minutesBefore, setMinutesBefore] = useState(10);

  useEffect(() => {
    if (!visible || !prayer) {
      return;
    }

    const settings = prayerNotifications[prayer.name];

    setEnabled(settings.enabled);
    setMinutesBefore(settings.minutesBefore);
  }, [visible, prayer, prayerNotifications]);

  if (!prayer) {
    return null;
  }

  const handleDone = () => {
    setPrayerNotification(prayer.name, {
      enabled,
      minutesBefore,
    });

    onClose();
  };

  return (
    <Host>
      <BottomSheet
        isPresented={visible}
        onDismiss={onClose}
        snapPoints={["half", "full"]}
        modifiers={[
          presentationBackground(colors.background),
          background(colors.background),
        ]}
        contentPadding={{
          left: 20,
          right: 20,
        }}
      >
        <RNHostView>
          <ScrollView
            className="flex-1"
            contentContainerClassName="gap-5 px-1 py-5"
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View className="items-center gap-1">
              <View className="bg-primary-soft mb-1 size-12 items-center justify-center rounded-full">
                <Ionicons
                  name={prayer.icon}
                  size={22}
                  className="text-primary"
                />
              </View>

              <Text className="font-sans-bold text-foreground text-xl">
                {prayer.name}
              </Text>

              <Text className="font-sans-semibold text-primary text-base">
                {prayer.formattedTime}
              </Text>

              <Text className="text-muted-foreground font-sans text-xs">
                {prayer.description}
              </Text>
            </View>

            {/* Notification */}
            <View className="bg-card overflow-hidden rounded-xl shadow-md">
              <View className="flex-row items-center justify-between px-4 py-4">
                <View className="flex-row items-center gap-3">
                  <View className="bg-muted size-9 items-center justify-center rounded-full">
                    <Ionicons
                      name="notifications-outline"
                      size={18}
                      className="text-primary"
                    />
                  </View>

                  <View className="gap-0.5">
                    <Text className="font-sans-semibold text-foreground text-sm">
                      Notification
                    </Text>

                    <Text className="text-muted-foreground font-sans text-xs">
                      Remind me about this prayer
                    </Text>
                  </View>
                </View>

                <Switch
                  value={enabled}
                  onValueChange={setEnabled}
                  trackColor={{
                    false: colors.border,
                    true: colors.primary,
                  }}
                  thumbColor={colors.background}
                />
              </View>
            </View>

            {/* Reminder timing */}
            <View className={`gap-3 ${enabled ? "opacity-100" : "opacity-50"}`}>
              <Text className="font-sans-semibold text-foreground text-base">
                Remind me
              </Text>

              <View className="bg-card overflow-hidden rounded-xl shadow-md">
                {reminderOptions.map((minutes, index) => {
                  const selected = minutesBefore === minutes;

                  const label =
                    minutes === 0
                      ? "At prayer time"
                      : `${minutes} minutes before`;

                  return (
                    <Pressable
                      key={minutes}
                      disabled={!enabled}
                      onPress={() => setMinutesBefore(minutes)}
                      className={`flex-row items-center justify-between px-4 py-3.5 ${
                        index < reminderOptions.length - 1
                          ? "border-border border-b"
                          : ""
                      }`}
                    >
                      <Text
                        className={
                          selected
                            ? "font-sans-semibold text-foreground text-sm"
                            : "text-foreground font-sans text-sm"
                        }
                      >
                        {label}
                      </Text>

                      <View
                        className={`size-5 items-center justify-center rounded-full border ${
                          selected
                            ? "border-primary bg-primary"
                            : "border-border bg-card"
                        }`}
                      >
                        {selected && (
                          <View className="bg-primary-foreground size-2 rounded-full" />
                        )}
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Info */}
            <View className="bg-primary-soft flex-row items-center gap-2 rounded-xl px-4 py-3">
              <Ionicons
                name="information-circle-outline"
                size={17}
                className="text-primary"
              />

              <Text className="text-primary-soft-foreground flex-1 font-sans text-xs leading-5">
                Notification settings apply to this prayer every day.
              </Text>
            </View>

            {/* Done */}
            <Pressable
              onPress={handleDone}
              className="bg-primary items-center rounded-xl px-4 py-3.5 active:opacity-80"
            >
              <Text className="font-sans-semibold text-primary-foreground text-sm">
                Done
              </Text>
            </Pressable>
          </ScrollView>
        </RNHostView>
      </BottomSheet>
    </Host>
  );
};

export default PrayerTimeSettingsSheet;
