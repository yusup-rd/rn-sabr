import { styled } from "nativewind";
import { Text } from "react-native";
import { SafeAreaView as NativeSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(NativeSafeAreaView);

const Quran = () => {
  return (
    <SafeAreaView className="bg-background flex-1 items-center justify-center">
      <Text className="text-foreground font-sans-bold text-2xl">Quran</Text>
    </SafeAreaView>
  );
};

export default Quran;
