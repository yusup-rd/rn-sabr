import { calculationMethods } from "@/constants/prayer-calculation";
import { usePrayerStore } from "@/store/prayerStore";
import type { Prayer } from "@/types/prayer";
import { Text, View } from "react-native";
import PrayerCard from "./PrayerCard";

interface PrayersTodayProps {
  prayers: Prayer[];
}

const PrayersToday = ({ prayers }: PrayersTodayProps) => {
  const { calculationMethod, asrMethod } = usePrayerStore();

  const calculationMethodLabel =
    calculationMethods.find((method) => method.id === calculationMethod)
      ?.description ?? calculationMethod;

  const asrLabel = asrMethod === "hanafi" ? "Hanafi" : "Standard";

  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between gap-2">
        <Text className="font-sans-semibold text-foreground text-lg">
          Today's Prayers
        </Text>

        <Text className="font-sans-semibold text-muted-foreground text-xs">
          {asrLabel} ({calculationMethodLabel})
        </Text>
      </View>

      <View className="gap-2">
        {prayers.map((prayer) => (
          <PrayerCard key={prayer.name} prayer={prayer} />
        ))}
      </View>
    </View>
  );
};

export default PrayersToday;
