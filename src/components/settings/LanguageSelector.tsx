import LanguageSheet from "@/components/settings/LanguageSheet";
import i18n from "@/i18n";
import { FontAwesome6 as Fa } from "@expo/vector-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

const LanguageSelector = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const languageKey =
    selectedLanguage === "ru" ? "settings.russian" : "settings.english";

  return (
    <>
      <Pressable
        onPress={() => setVisible(true)}
        accessibilityRole="button"
        accessibilityLabel={t("settings.language")}
        className="bg-card w-full flex-row items-center justify-between rounded-xl px-4 py-4 shadow-md"
      >
        <View className="flex-row items-center gap-3">
          <View className="bg-primary-soft size-9 items-center justify-center rounded-full">
            <Fa
              name="language"
              size={17}
              className="text-primary-soft-foreground"
            />
          </View>

          <View className="gap-0.5">
            <Text className="text-foreground font-sans-semibold text-sm">
              {t("settings.language")}
            </Text>

            <Text className="text-muted-foreground font-sans text-xs">
              {t(languageKey)}
            </Text>
          </View>
        </View>

        <Fa name="chevron-right" size={14} className="text-muted-foreground" />
      </Pressable>

      <LanguageSheet
        visible={visible}
        selectedLanguage={selectedLanguage}
        onClose={() => setVisible(false)}
        onLanguageChange={setSelectedLanguage}
      />
    </>
  );
};

export default LanguageSelector;
