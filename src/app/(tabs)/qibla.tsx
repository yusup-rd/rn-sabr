import QiblaCompass from "@/components/qibla/QiblaCompass";
import { styled } from "nativewind";
import { SafeAreaView as NativeSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(NativeSafeAreaView);

const Qibla = () => {
  return (
    <SafeAreaView className="bg-background flex-1 p-5">
      <QiblaCompass />
    </SafeAreaView>
  );
};

export default Qibla;
