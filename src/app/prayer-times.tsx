import CalendarPicker from "@/components/prayer-times/CalendarPicker";
import DaylightArc from "@/components/prayer-times/DaylightArc";
import PrayerCalculationSelector from "@/components/prayer-times/PrayerCalculationSelector";
import PrayerCalculationSheet from "@/components/prayer-times/PrayerCalculationSheet";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { usePrayerStore } from "@/store/prayerStore";
import type { AsrMethod, CalculationMethodId } from "@/types/prayer";
import { useState } from "react";
import { ScrollView } from "react-native";

const PrayerTimes = () => {
  const { calculationMethod, asrMethod, setCalculationSettings } =
    usePrayerStore();
  const prayerTimes = usePrayerTimes();

  const [sheetVisible, setSheetVisible] = useState(false);

  const handleSave = (method: CalculationMethodId, asr: AsrMethod) => {
    setCalculationSettings(method, asr);
    setSheetVisible(false);
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
          onPress={() => setSheetVisible(true)}
        />

        <CalendarPicker />

        {prayerTimes.sunrise && prayerTimes.sunset && (
          <DaylightArc
            sunrise={prayerTimes.sunrise}
            sunset={prayerTimes.sunset}
            now={prayerTimes.now}
          />
        )}
      </ScrollView>

      <PrayerCalculationSheet
        visible={sheetVisible}
        calculationMethod={calculationMethod}
        asrMethod={asrMethod}
        onClose={() => setSheetVisible(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default PrayerTimes;
