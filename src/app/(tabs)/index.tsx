import AyahCard from "@/components/home/AyahCard";
import DateWithLocation from "@/components/home/DateWithLocation";
import HeroCountdown from "@/components/home/HeroCountdown";
import PrayersToday from "@/components/home/PrayersToday";
import QuickAccess from "@/components/home/QuickAccess";
import SpiritualPauseCard from "@/components/home/SpiritualPauseCard";
import { styled } from "nativewind";
import { ScrollView } from "react-native";
import { SafeAreaView as NativeSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(NativeSafeAreaView);

const Index = () => {
  return (
    <SafeAreaView className="bg-background flex-1" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-5 p-5"
        showsVerticalScrollIndicator={false}
      >
        <DateWithLocation />
        <HeroCountdown />
        <QuickAccess />
        <PrayersToday />
        <SpiritualPauseCard />
        <AyahCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
