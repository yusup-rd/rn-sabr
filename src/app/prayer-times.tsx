import CalendarPicker from "@/components/prayer-times/calendar/CalendarPicker";
import DaylightArc from "@/components/prayer-times/daylight/DaylightArc";
import NightPortions from "@/components/prayer-times/night-portions/NightPortions";
import PrayerCalculationSelector from "@/components/prayer-times/prayer-calculation/PrayerCalculationSelector";
import PrayerCalculationSheet from "@/components/prayer-times/prayer-calculation/PrayerCalculationSheet";
import PrayerTimeSettingsSheet from "@/components/prayer-times/scheduled-prayers/PrayerTimeSettingsSheet";
import ScheduledTimes from "@/components/prayer-times/scheduled-prayers/ScheduledTimes";
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
  const [draftCalculationMethod, setDraftCalculationMethod] =
    useState<CalculationMethodId>("mwl");
  const [draftAsrMethod, setDraftAsrMethod] = useState<AsrMethod>("standard");

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

  const handleCalculationOpen = () => {
    setDraftCalculationMethod(calculationMethod);
    setDraftAsrMethod(asrMethod);
    setCalculationSheetVisible(true);
  };

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
          onPress={handleCalculationOpen}
        />

        <CalendarPicker
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {locationLoading ? (
          <LoadingCard
            title="Getting your location"
            message="Please wait while we determine your current location."
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

        {hasLocation &&
          prayerTimes.selectedSunset &&
          prayerTimes.selectedNextFajr && (
            <NightPortions
              sunset={prayerTimes.selectedSunset}
              fajr={prayerTimes.selectedNextFajr}
              now={prayerTimes.now}
              isToday={isToday}
              selectedDate={selectedDate}
            />
          )}
      </ScrollView>

      <PrayerCalculationSheet
        visible={calculationSheetVisible}
        calculationMethod={draftCalculationMethod}
        asrMethod={draftAsrMethod}
        onCalculationMethodChange={setDraftCalculationMethod}
        onAsrMethodChange={setDraftAsrMethod}
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
