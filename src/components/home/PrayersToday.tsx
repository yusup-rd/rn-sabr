import { prayers } from "@/constants/dummy-data";
import { Text, View } from "react-native";
import PrayerCard from "./PrayerCard";

const PrayersToday = () => {
  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between gap-2">
        <Text className="font-sans-semibold text-foreground text-lg">
          Today's Prayers
        </Text>

        <Text className="font-sans-semibold text-muted-foreground text-xs">
          Standard (MWL)
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
