import PrayerCalculationSelector from "@/components/prayer-times/PrayerCalculationSelector";
import PrayerCalculationSheet from "@/components/prayer-times/PrayerCalculationSheet";
import type { AsrMethod, CalculationMethodId } from "@/types/prayer";
import { useState } from "react";
import { ScrollView } from "react-native";

const PrayerTimes = () => {
  const [calculationMethod, setCalculationMethod] =
    useState<CalculationMethodId>("mwl");

  const [asrMethod, setAsrMethod] = useState<AsrMethod>("standard");

  const [sheetVisible, setSheetVisible] = useState(false);

  const handleSave = (method: CalculationMethodId, asr: AsrMethod) => {
    setCalculationMethod(method);
    setAsrMethod(asr);
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
