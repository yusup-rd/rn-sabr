import { nextMonth, previousMonth } from "@/lib/date";
import { formatHijriDate, formatMonthYear } from "@/lib/format";
import { getIslamicEventForDate } from "@/lib/islamic-events";
import { useTheme } from "@/providers/ThemeProvider";
import { BottomSheet, Host, RNHostView } from "@expo/ui";
import { background } from "@expo/ui/jetpack-compose/modifiers";
import { presentationBackground } from "@expo/ui/swift-ui/modifiers";
import { FontAwesome6 as Fa } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import CalendarMonthGrid from "./CalendarMonthGrid";

interface CalendarSheetProps {
  visible: boolean;
  selectedDate: Date;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
}

const CalendarSheet = ({
  visible,
  selectedDate,
  onClose,
  onSelectDate,
}: CalendarSheetProps) => {
  const { colors } = useTheme();

  const [visibleMonth, setVisibleMonth] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
  );

  useEffect(() => {
    if (visible) {
      setVisibleMonth(
        new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
      );
    }
  }, [visible, selectedDate]);

  const selectedEvent = getIslamicEventForDate(selectedDate);

  const handleSelectDate = (date: Date) => {
    onSelectDate(date);
  };

  const goToPreviousMonth = () => {
    setVisibleMonth(previousMonth(visibleMonth));
  };

  const goToNextMonth = () => {
    setVisibleMonth(nextMonth(visibleMonth));
  };

  const goToToday = () => {
    const today = new Date();

    setVisibleMonth(new Date(today.getFullYear(), today.getMonth(), 1));

    handleSelectDate(today);
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
          <View className="gap-5 px-1 py-5">
            {/* Header */}
            <View className="items-center">
              <Text className="text-foreground font-sans-bold text-xl">
                {formatMonthYear(visibleMonth)}
              </Text>

              <Text className="text-muted-foreground font-sans-medium text-xs">
                Select a day
              </Text>
            </View>

            {/* Month navigation */}
            <View className="flex-row items-center justify-between">
              <Pressable
                onPress={goToPreviousMonth}
                accessibilityRole="button"
                accessibilityLabel="Previous month"
                className="bg-muted size-9 items-center justify-center rounded-full"
              >
                <Fa name="chevron-left" size={10} className="text-foreground" />
              </Pressable>

              <Pressable
                onPress={goToToday}
                accessibilityRole="button"
                accessibilityLabel="Today"
                className="bg-secondary-soft rounded-full px-4 py-2"
              >
                <Text className="text-secondary-soft-foreground font-sans-semibold text-xs">
                  Today
                </Text>
              </Pressable>

              <Pressable
                onPress={goToNextMonth}
                accessibilityRole="button"
                accessibilityLabel="Next month"
                className="bg-muted size-9 items-center justify-center rounded-full"
              >
                <Fa
                  name="chevron-right"
                  size={10}
                  className="text-foreground"
                />
              </Pressable>
            </View>

            {/* Calendar */}
            <CalendarMonthGrid
              month={visibleMonth}
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
            />

            {/* Selected date information */}
            <View className="border-border border-t pt-4">
              <Text className="text-foreground font-sans-semibold text-sm">
                {formatHijriDate(selectedDate)}
              </Text>

              {selectedEvent ? (
                <View className="bg-secondary-soft mt-2 rounded-lg px-3 py-2">
                  <View className="flex-row items-center gap-2">
                    <View className="bg-secondary size-2 rounded-full" />

                    <Text className="text-secondary-soft-foreground font-sans-semibold text-xs">
                      {selectedEvent.name}
                    </Text>
                  </View>

                  {selectedEvent.description && (
                    <Text className="text-secondary-soft-foreground/80 mt-1 font-sans text-xs">
                      {selectedEvent.description}
                    </Text>
                  )}
                </View>
              ) : (
                <Text className="text-muted-foreground mt-1 font-sans text-xs">
                  No Islamic observance marked for this date.
                </Text>
              )}
            </View>
          </View>
        </RNHostView>
      </BottomSheet>
    </Host>
  );
};

export default CalendarSheet;
