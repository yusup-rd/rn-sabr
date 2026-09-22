import LanguageSelector from "@/components/settings/LanguageSelector";
import { ThemeSelector } from "@/components/settings/ThemeSelector";
import { styled } from "nativewind";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";
import { SafeAreaView as NativeSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(NativeSafeAreaView);

const Settings = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="bg-background flex-1 items-center justify-center gap-3 p-5">
      <Text className="text-foreground font-sans-bold text-2xl">
        {t("settings.title")}
      </Text>
      <ThemeSelector />
      <LanguageSelector />
    </SafeAreaView>
  );
};

export default Settings;
