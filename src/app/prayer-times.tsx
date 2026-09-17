import CalendarPicker from "@/components/prayer-times/CalendarPicker";
import DaylightArc from "@/components/prayer-times/DaylightArc";
import PrayerCalculationSelector from "@/components/prayer-times/PrayerCalculationSelector";
import PrayerCalculationSheet from "@/components/prayer-times/PrayerCalculationSheet";
import PrayerTimeSettingsSheet from "@/components/prayer-times/PrayerTimeSettingsSheet";
import ScheduledTimes from "@/components/prayer-times/ScheduledTimes";
import ErrorCard from "@/components/ui/ErrorCard";
import LoadingCard from "@/components/ui/LoadingCard";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { useLocationStore } from "@/store/locationStore";
import { usePrayerStore } from "@/store/prayerStore";
import type { AsrMethod, CalculationMethodId, Prayer } from "@/types/prayer";
import { useState } from "react";
import { Linking, ScrollView } from "react-native";

const PrayerTimes = () => {
  const [calculationSheetVisible, setCalculationSheetVisible] = useState(false);

  const [prayerSettingsVisible, setPrayerSettingsVisible] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedPrayer, setSelectedPrayer] = useState<Prayer | null>(null);

  const { calculationMethod, asrMethod, setCalculationSettings } =
    usePrayerStore();

  const {
    latitude,
    longitude,
    locationLoading,
    locationError,
    locationPermissionStatus,
    retryLocation,
  } = useLocationStore();

  const prayerTimes = usePrayerTimes(selectedDate);

  const isToday = selectedDate.toDateString() === new Date().toDateString();

  const hasLocation = latitude != null && longitude != null;

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

  const handleLocationAction = () => {
    if (locationPermissionStatus === "blocked") {
      void Linking.openSettings();
      return;
    }

    void retryLocation();
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

        {locationLoading ? (
          <LoadingCard
            title="Getting your location"
            message="Please wait while we determine your location."
          />
        ) : !hasLocation || locationError ? (
          <ErrorCard
            title="Location unavailable"
            message={
              locationError ?? "We couldn't determine your current location."
            }
            actionLabel={
              locationPermissionStatus === "blocked"
                ? "Open Settings"
                : "Try Again"
            }
            onActionPress={handleLocationAction}
          />
        ) : prayerTimes.selectedPrayers.length > 0 ? (
          <ScheduledTimes
            selectedDate={selectedDate}
            prayers={prayerTimes.selectedPrayers}
            isToday={isToday}
            onPrayerPress={handlePrayerPress}
          />
        ) : null}

        {hasLocation &&
          prayerTimes.selectedSunrise &&
          prayerTimes.selectedSunset && (
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
