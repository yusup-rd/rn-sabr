import AyahCard from "@/components/home/AyahCard";
import DateWithLocation from "@/components/home/DateWithLocation";
import HeroCountdown from "@/components/home/HeroCountdown";
import PrayersToday from "@/components/home/PrayersToday";
import QuickAccess from "@/components/home/QuickAccess";
import SpiritualPauseCard from "@/components/home/SpiritualPauseCard";
import ErrorCard from "@/components/ui/ErrorCard";
import LoadingCard from "@/components/ui/LoadingCard";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { useLocationStore } from "@/store/locationStore";
import { styled } from "nativewind";
import { useEffect, useRef } from "react";
import {
  AppState,
  type AppStateStatus,
  Linking,
  ScrollView,
} from "react-native";
import { SafeAreaView as NativeSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(NativeSafeAreaView);

const Index = () => {
  const prayerTimes = usePrayerTimes();
  const locationLoading = useLocationStore((state) => state.locationLoading);
  const locationError = useLocationStore((state) => state.locationError);
  const locationPermissionStatus = useLocationStore(
    (state) => state.locationPermissionStatus,
  );
  const retryLocation = useLocationStore((state) => state.retryLocation);

  const previousAppState = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      const wasInactive =
        previousAppState.current === "inactive" ||
        previousAppState.current === "background";

      const returnedToApp = wasInactive && nextAppState === "active";

      if (returnedToApp && locationPermissionStatus === "blocked") {
        void retryLocation();
      }

      previousAppState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [locationPermissionStatus, retryLocation]);

  const renderLocationContent = () => {
    if (locationLoading) {
      return (
        <LoadingCard
          title="Getting your location..."
          message="We need your location to calculate prayer times."
        />
      );
    }

    if (locationError) {
      const isBlocked = locationPermissionStatus === "blocked";

      const handleLocationAction = async () => {
        if (isBlocked) {
          await Linking.openSettings();
          return;
        }

        await retryLocation();
      };

      return (
        <ErrorCard
          title={
            isBlocked
              ? "Location permission is disabled"
              : "Location unavailable"
          }
          message={locationError}
          actionLabel={isBlocked ? "Open Settings" : "Try Again"}
          onActionPress={handleLocationAction}
        />
      );
    }

    return (
      <>
        <DateWithLocation />

        <HeroCountdown
          previousPrayer={prayerTimes.previousPrayer}
          nextPrayer={prayerTimes.nextPrayer}
          countdown={prayerTimes.countdown}
          elapsedPercent={prayerTimes.elapsedPercent}
          solarEvent={prayerTimes.solarEvent}
        />

        <PrayersToday prayers={prayerTimes.prayers} />
      </>
    );
  };

  return (
    <SafeAreaView className="bg-background flex-1" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-5 p-5"
        showsVerticalScrollIndicator={false}
      >
        {renderLocationContent()}

        <QuickAccess />

        <SpiritualPauseCard />

        <AyahCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
