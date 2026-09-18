import { formatDuration, formatTime } from "@/lib/format";
import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface TahajjudSectionProps {
  sunset: Date;
  fajr: Date;
}

const TahajjudSection = ({ sunset, fajr }: TahajjudSectionProps) => {
  const nightPrayerDuration = fajr.getTime() - sunset.getTime();

  return (
    <View className="border-border gap-3 border-t pt-4">
      <View className="flex-row items-start gap-3">
        <View className="bg-primary-soft h-9 w-9 items-center justify-center rounded-full">
          <AntDesign name="moon" size={17} className="text-primary" />
        </View>

        <View className="flex-1 gap-1">
          <Text className="font-sans-semibold text-foreground text-sm">
            Tahajjud
          </Text>

          <Text className="text-muted-foreground font-sans text-xs leading-5">
            Voluntary night prayer traditionally associated with waking after
            sleep.
          </Text>
        </View>
      </View>

      <View className="bg-muted rounded-xl px-4 py-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-1 gap-0.5">
            <Text className="text-muted-foreground font-sans text-xs">
              Night prayer window
            </Text>

            <Text className="font-sans-semibold text-foreground text-sm">
              {formatTime(sunset)} – {formatTime(fajr)}
            </Text>
          </View>

          <View className="items-end gap-0.5">
            <Text className="text-muted-foreground font-sans text-xs">
              Duration
            </Text>

            <Text className="font-sans-semibold text-primary text-sm">
              {formatDuration(nightPrayerDuration)}
            </Text>
          </View>
        </View>
      </View>

      <Text className="text-muted-foreground font-sans text-xs leading-5">
        Tahajjud is performed during the night after sleeping and waking for
        prayer. The last third of the night is a particularly significant time
        for voluntary worship.
      </Text>
    </View>
  );
};

export default TahajjudSection;
