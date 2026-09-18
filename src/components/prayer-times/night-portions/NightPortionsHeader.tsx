import { formatDayMonth } from "@/lib/format";
import { clsx } from "clsx";
import { Text, View } from "react-native";

interface NightStatus {
  label: string;
  className: string;
  textClassName: string;
}

interface NightPortionsHeaderProps {
  isToday: boolean;
  selectedDate: Date;
  status: NightStatus | null;
}

const NightPortionsHeader = ({
  isToday,
  selectedDate,
  status,
}: NightPortionsHeaderProps) => {
  return (
    <View className="flex-row items-start justify-between">
      <View className="flex-1 gap-1">
        <Text className="font-sans-semibold text-foreground text-base">
          Night Portions
        </Text>

        <Text className="text-muted-foreground font-sans text-xs">
          {isToday
            ? "From sunset until Fajr"
            : `Night · ${formatDayMonth(selectedDate)}`}
        </Text>
      </View>

      {status && (
        <View className={clsx("rounded-full px-3 py-1.5", status.className)}>
          <Text
            className={clsx("font-sans-semibold text-xs", status.textClassName)}
          >
            {status.label}
          </Text>
        </View>
      )}
    </View>
  );
};

export default NightPortionsHeader;
