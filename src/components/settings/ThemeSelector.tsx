import { Pressable, Text, View } from "react-native";

import { useTheme } from "@/providers/ThemeProvider";

const options = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
] as const;

export function ThemeSelector() {
  const { mode, setMode } = useTheme();

  return (
    <View className="bg-muted flex-row rounded-xl p-1">
      {options.map((option) => {
        const selected = mode === option.value;

        return (
          <Pressable
            key={option.value}
            onPress={() => setMode(option.value)}
            className={`flex-1 items-center rounded-lg px-3 py-2.5 ${
              selected ? "bg-card" : ""
            }`}
          >
            <Text
              className={`font-sans-medium ${
                selected ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
