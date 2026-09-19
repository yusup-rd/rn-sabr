import TasbihArtwork from "@/components/tasbih/artwork/TasbihArtwork";
import TasbihCounter from "@/components/tasbih/counter/TasbihCounter";
import { useTasbih } from "@/hooks/useTasbih";
import { useTheme } from "@/providers/ThemeProvider";
import { FontAwesome6 as Fa } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, View } from "react-native";

const Tasbih = () => {
  const { colors } = useTheme();

  const { currentCount, totalCount, isHydrated, recordTap, reset } =
    useTasbih();

  const [resetKey, setResetKey] = useState(0);

  const rounds = Math.floor(totalCount / 33);

  const handleReset = () => {
    Alert.alert(
      "Reset Tasbih?",
      "This will reset your current count, rounds, and total count.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            reset();

            setResetKey((value) => value + 1);
          },
        },
      ],
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerRight: () => (
            <Pressable onPress={handleReset} hitSlop={12}>
              <Fa
                name="arrow-rotate-left"
                size={17}
                color={colors.foreground}
              />
            </Pressable>
          ),
        }}
      />

      <View className="bg-card flex-1">
        <View className="flex-1 items-center justify-center">
          <TasbihArtwork
            resetKey={resetKey}
            initialCount={currentCount}
            isHydrated={isHydrated}
            onTap={recordTap}
          />
        </View>

        <View pointerEvents="none" className="absolute bottom-8 left-5">
          <TasbihCounter
            currentCount={currentCount}
            rounds={rounds}
            totalCount={totalCount}
          />
        </View>
      </View>
    </>
  );
};

export default Tasbih;
