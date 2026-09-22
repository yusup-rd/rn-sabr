import { useTheme } from "@/providers/ThemeProvider";
import { Ionicons as Io } from "@expo/vector-icons";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

const options = [
  {
    value: "light",
    label: "settings.lightMode",
    icon: "sunny",
  },
  {
    value: "dark",
    label: "settings.darkMode",
    icon: "moon",
  },
  {
    value: "system",
    label: "settings.systemMode",
    icon: "phone-portrait",
  },
] as const;

export function ThemeSelector() {
  const { mode, setMode } = useTheme();
  const { t } = useTranslation();

  return (
    <View className="bg-muted flex-row rounded-xl p-1">
      {options.map((option) => {
        const selected = mode === option.value;

        return (
          <Pressable
            key={option.value}
            onPress={() => setMode(option.value)}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected }}
            className={clsx(
              "flex-1 items-center gap-1 rounded-lg px-3 py-2.5",
              selected && "bg-card",
            )}
          >
            <Io
              name={option.icon}
              size={15}
              className={clsx(
                selected ? "text-foreground" : "text-muted-foreground",
              )}
            />

            <Text
              className={clsx(
                "font-sans-medium text-xs",
                selected ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {t(option.label)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
