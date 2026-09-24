import { formatDayMonth } from "@/lib/format";
import type { Prayer } from "@/types/prayer";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import ScheduledPrayerRow from "./ScheduledPrayerRow";

interface ScheduledTimesProps {
  selectedDate: Date;
  prayers: Prayer[];
  isToday: boolean;
  onPrayerPress: (prayer: Prayer) => void;
}

const ScheduledTimes = ({
  selectedDate,
  prayers,
  isToday,
  onPrayerPress,
}: ScheduledTimesProps) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "prayerTimes.schedule",
  });

  const title = isToday
    ? t("todayTitle")
    : t("title", {
        date: formatDayMonth(selectedDate),
      });

  return (
    <View className="gap-2">
      <Text className="font-sans-semibold text-foreground text-lg">
        {title}
      </Text>

      <View className="bg-card overflow-hidden rounded-xl shadow-md">
        {prayers.map((prayer, index) => (
          <ScheduledPrayerRow
            key={prayer.name}
            prayer={prayer}
            onPress={() => onPrayerPress(prayer)}
            showBorder={index < prayers.length - 1}
          />
        ))}
      </View>
    </View>
  );
};

export default ScheduledTimes;
