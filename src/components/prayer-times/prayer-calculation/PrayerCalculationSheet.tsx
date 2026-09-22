import { asrMethods, calculationMethods } from "@/constants/prayer-calculation";
import { useTheme } from "@/providers/ThemeProvider";
import type { AsrMethod, CalculationMethodId } from "@/types/prayer";
import { BottomSheet, Host, RNHostView } from "@expo/ui";
import { background } from "@expo/ui/jetpack-compose/modifiers";
import { presentationBackground } from "@expo/ui/swift-ui/modifiers";
import { Pressable, ScrollView, Text, View } from "react-native";
import PrayerCalculationOption from "./PrayerCalculationOption";

interface PrayerCalculationSheetProps {
  visible: boolean;
  calculationMethod: CalculationMethodId;
  asrMethod: AsrMethod;
  onCalculationMethodChange: (method: CalculationMethodId) => void;
  onAsrMethodChange: (method: AsrMethod) => void;
  onClose: () => void;
  onSave: (
    calculationMethod: CalculationMethodId,
    asrMethod: AsrMethod,
  ) => void;
}

const PrayerCalculationSheet = ({
  visible,
  calculationMethod,
  asrMethod,
  onCalculationMethodChange,
  onAsrMethodChange,
  onClose,
  onSave,
}: PrayerCalculationSheetProps) => {
  const { colors } = useTheme();

  const handleSave = () => {
    onSave(calculationMethod, asrMethod);
  };

  return (
    <Host>
      <BottomSheet
        isPresented={visible}
        onDismiss={onClose}
        snapPoints={["half", "full"]}
        modifiers={[
          presentationBackground(colors.background),
          background(colors.background),
        ]}
        contentPadding={{
          left: 20,
          right: 20,
        }}
      >
        <RNHostView>
          <ScrollView
            className="flex-1"
            contentContainerClassName="gap-5 px-1 py-5"
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View className="gap-1">
              <Text className="text-foreground font-sans-bold text-xl">
                Prayer Calculation
              </Text>

              <Text className="text-muted-foreground font-sans-medium text-sm">
                Choose how your prayer times are calculated.
              </Text>
            </View>

            <View className="gap-5">
              {/* Calculation method */}
              <View className="gap-2">
                <Text className="text-foreground font-sans-semibold text-sm">
                  Calculation Method
                </Text>

                <View className="gap-2">
                  {calculationMethods.map((method) => (
                    <PrayerCalculationOption
                      key={method.id}
                      title={method.label}
                      description={method.description}
                      selected={calculationMethod === method.id}
                      onPress={() => onCalculationMethodChange(method.id)}
                    />
                  ))}
                </View>
              </View>

              {/* Asr method */}
              <View className="gap-2">
                <Text className="text-foreground font-sans-semibold text-sm">
                  Asr Calculation
                </Text>

                <View className="gap-2">
                  {asrMethods.map((method) => (
                    <PrayerCalculationOption
                      key={method.id}
                      title={method.label}
                      description={method.description}
                      selected={asrMethod === method.id}
                      onPress={() => onAsrMethodChange(method.id)}
                    />
                  ))}
                </View>
              </View>
            </View>

            {/* Actions */}
            <View className="flex-row gap-3">
              <Pressable
                onPress={onClose}
                className="bg-muted flex-1 items-center rounded-xl py-3.5"
              >
                <Text className="text-foreground font-sans-semibold text-sm">
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                onPress={handleSave}
                className="bg-primary flex-1 items-center rounded-xl py-3.5"
              >
                <Text className="text-primary-foreground font-sans-semibold text-sm">
                  Apply
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </RNHostView>
      </BottomSheet>
    </Host>
  );
};

export default PrayerCalculationSheet;
