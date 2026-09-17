import CalendarPicker from "@/components/prayer-times/CalendarPicker";
import DaylightArc from "@/components/prayer-times/DaylightArc";
import PrayerCalculationSelector from "@/components/prayer-times/PrayerCalculationSelector";
import PrayerCalculationSheet from "@/components/prayer-times/PrayerCalculationSheet";
import PrayerTimeSettingsSheet from "@/components/prayer-times/PrayerTimeSettingsSheet";
import ScheduledTimes from "@/components/prayer-times/ScheduledTimes";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { usePrayerStore } from "@/store/prayerStore";
import type { AsrMethod, CalculationMethodId, Prayer } from "@/types/prayer";
import { useState } from "react";
import { ScrollView } from "react-native";

const PrayerTimes = () => {
  const [calculationSheetVisible, setCalculationSheetVisible] = useState(false);
  const [prayerSettingsVisible, setPrayerSettingsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPrayer, setSelectedPrayer] = useState<Prayer | null>(null);

  const { calculationMethod, asrMethod, setCalculationSettings } =
    usePrayerStore();
  const prayerTimes = usePrayerTimes(selectedDate);

  const isToday = selectedDate.toDateString() === new Date().toDateString();

  const handleCalculationSave = (
    method: CalculationMethodId,
    asr: AsrMethod,
  ) => {
    setCalculationSettings(method, asr);
    setCalculationSheetVisible(false);
  };

  const handlePrayerPress = (prayer: Prayer) => {
    setSelectedPrayer(prayer);
    setPrayerSettingsVisible(true);
  };

  const handlePrayerSettingsClose = () => {
    setPrayerSettingsVisible(false);
  };

  return (
    <>
      <ScrollView
        className="bg-background flex-1"
        contentContainerClassName="gap-5 p-5"
        showsVerticalScrollIndicator={false}
      >
        <PrayerCalculationSelector
          calculationMethod={calculationMethod}
          asrMethod={asrMethod}
          onPress={() => setCalculationSheetVisible(true)}
        />

        <CalendarPicker
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        <ScheduledTimes
          selectedDate={selectedDate}
          prayers={prayerTimes.selectedPrayers}
          isToday={isToday}
          onPrayerPress={handlePrayerPress}
        />

        {prayerTimes.selectedSunrise && prayerTimes.selectedSunset && (
          <DaylightArc
            sunrise={prayerTimes.selectedSunrise}
            sunset={prayerTimes.selectedSunset}
            now={prayerTimes.now}
            isToday={isToday}
            selectedDate={selectedDate}
          />
        )}
      </ScrollView>

      <PrayerCalculationSheet
        visible={calculationSheetVisible}
        calculationMethod={calculationMethod}
        asrMethod={asrMethod}
        onClose={() => setCalculationSheetVisible(false)}
        onSave={handleCalculationSave}
      />

      <PrayerTimeSettingsSheet
        visible={prayerSettingsVisible}
        prayer={selectedPrayer}
        onClose={handlePrayerSettingsClose}
      />
    </>
  );
};

export default PrayerTimes;
