import PrayerCalculationSelector from "@/components/prayer-times/PrayerCalculationSelector";
import { ScrollView } from "react-native";

const PrayerTimes = () => {
  return (
    <ScrollView
      className="bg-background flex-1"
      contentContainerClassName="gap-5 p-5"
      showsVerticalScrollIndicator={false}
    >
      <PrayerCalculationSelector />
    </ScrollView>
  );
};

export default PrayerTimes;
