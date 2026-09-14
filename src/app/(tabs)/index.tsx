import DateWithLocation from "@/components/home/DateWithLocation";
import HeroCountdown from "@/components/home/HeroCountdown";
import { styled } from "nativewind";
import { SafeAreaView as NativeSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(NativeSafeAreaView);

const Index = () => {
  return (
    <SafeAreaView className="bg-background flex-1 gap-6 p-5">
      <DateWithLocation />

      <HeroCountdown />
    </SafeAreaView>
  );
};

export default Index;
