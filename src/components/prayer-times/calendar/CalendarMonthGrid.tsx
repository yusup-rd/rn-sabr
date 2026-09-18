import { getMonthDays, isSameDay } from "@/lib/date";
import { getHijriDateParts, getIslamicEvent } from "@/lib/islamic-events";
import { clsx } from "clsx";
import { Pressable, Text, View } from "react-native";

interface CalendarMonthGridProps {
  month: Date;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CalendarMonthGrid = ({
  month,
  selectedDate,
  onSelectDate,
}: CalendarMonthGridProps) => {
  const days = getMonthDays(month);

  return (
    <View className="gap-2">
      <View className="flex-row">
        {weekDays.map((day) => (
          <View key={day} className="w-[14.285%] items-center">
            <Text className="text-muted-foreground font-sans-semibold text-xs">
              {day}
            </Text>
          </View>
        ))}
      </View>

      <View className="flex-row flex-wrap">
        {days.map((date, index) => {
          if (!date) {
            return <View key={`empty-${index}`} className="w-[14.285%] p-1" />;
          }

          const selected = isSameDay(date, selectedDate);
          const hijri = getHijriDateParts(date);
          const event = getIslamicEvent(hijri.month, hijri.day);

          return (
            <Pressable
              key={date.toISOString()}
              onPress={() => onSelectDate(date)}
              className="w-[14.285%] p-1"
            >
              <View
                className={clsx(
                  "will-change-variable aspect-square items-center justify-center rounded-lg",
                  selected ? "bg-primary shadow-xs" : "bg-card",
                )}
              >
                <Text
                  className={
                    selected
                      ? "text-primary-foreground font-sans-semibold text-sm"
                      : "text-foreground font-sans-semibold text-sm"
                  }
                >
                  {date.getDate()}
                </Text>

                {event && (
                  <View className="bg-secondary absolute bottom-1 size-1.5 rounded-full" />
                )}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default CalendarMonthGrid;
