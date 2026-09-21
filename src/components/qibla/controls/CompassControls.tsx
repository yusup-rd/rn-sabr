import { useTheme } from "@/providers/ThemeProvider";
import { MaterialCommunityIcons as Mi } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Switch, Text, View } from "react-native";

const HAPTICS_STORAGE_KEY = "@app/compass-haptics";

interface CompassControlsProps {
  onHapticsChange: (enabled: boolean) => void;
}

const CompassControls = ({ onHapticsChange }: CompassControlsProps) => {
  const [hapticsEnabled, setHapticsEnabled] = useState(true);

  const { colors } = useTheme();

  useEffect(() => {
    const loadHapticsSetting = async () => {
      const value = await AsyncStorage.getItem(HAPTICS_STORAGE_KEY);

      if (value !== null) {
        setHapticsEnabled(value === "true");
        onHapticsChange(value === "true");
      }
    };

    loadHapticsSetting();
  }, [onHapticsChange]);

  const handleHapticsChange = async (enabled: boolean) => {
    setHapticsEnabled(enabled);
    onHapticsChange(enabled);

    await AsyncStorage.setItem(HAPTICS_STORAGE_KEY, String(enabled));
  };

  return (
    <View className="bg-card w-full flex-row items-center justify-between gap-2 rounded-xl p-4 shadow-md">
      <View className="bg-primary-soft size-7 items-center justify-center rounded-full">
        <Mi name="vibrate" size={14} className="text-primary-soft-foreground" />
      </View>

      <Text
        className="font-sans-semibold text-foreground flex-1 text-sm"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        Haptic Feedback
      </Text>

      <View>
        <Switch
          value={hapticsEnabled}
          onValueChange={handleHapticsChange}
          trackColor={{
            false: colors.border,
            true: colors.primary,
          }}
          thumbColor={colors.muted}
        />
      </View>
    </View>
  );
};

export default CompassControls;
