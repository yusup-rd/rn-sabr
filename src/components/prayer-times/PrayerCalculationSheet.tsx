import { asrMethods, calculationMethods } from "@/constants/prayer-calculation";
import { useTheme } from "@/providers/ThemeProvider";
import type { AsrMethod, CalculationMethodId } from "@/types/prayer";
import { BottomSheet, Host, RNHostView } from "@expo/ui";
import { background } from "@expo/ui/jetpack-compose/modifiers";
import { presentationBackground } from "@expo/ui/swift-ui/modifiers";
import { FontAwesome6 as Fa } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

interface PrayerCalculationSheetProps {
  visible: boolean;
  calculationMethod: CalculationMethodId;
  asrMethod: AsrMethod;
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
  onClose,
  onSave,
}: PrayerCalculationSheetProps) => {
  const [selectedMethod, setSelectedMethod] =
    useState<CalculationMethodId>(calculationMethod);

  const [selectedAsrMethod, setSelectedAsrMethod] =
    useState<AsrMethod>(asrMethod);

  const { colors } = useTheme();

  useEffect(() => {
    if (visible) {
      setSelectedMethod(calculationMethod);
      setSelectedAsrMethod(asrMethod);
    }
  }, [visible, calculationMethod, asrMethod]);

  const handleSave = () => {
    onSave(selectedMethod, selectedAsrMethod);
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
          top: 32,
          bottom: 32,
          left: 20,
          right: 20,
        }}
      >
        <RNHostView>
          <View className="p5">
            <View className="mb-6">
              <Text className="text-foreground font-sans-bold text-xl">
                Prayer Calculation
              </Text>

              <Text className="text-muted-foreground font-sans-medium mt-1 text-sm">
                Choose how your prayer times are calculated.
              </Text>
            </View>

            <View className="gap-6">
              {/* Calculation method */}
              <View>
                <Text className="text-foreground font-sans-semibold mb-3 text-sm">
                  Calculation Method
                </Text>

                <View className="gap-2">
                  {calculationMethods.map((method) => (
                    <SelectionRow
                      key={method.id}
                      title={method.label}
                      description={method.description}
                      selected={selectedMethod === method.id}
                      onPress={() => setSelectedMethod(method.id)}
                    />
                  ))}
                </View>
              </View>

              {/* Asr method */}
              <View>
                <Text className="text-foreground font-sans-semibold mb-3 text-sm">
                  Asr Calculation
                </Text>

                <View className="gap-2">
                  {asrMethods.map((method) => (
                    <SelectionRow
                      key={method.id}
                      title={method.label}
                      description={method.description}
                      selected={selectedAsrMethod === method.id}
                      onPress={() => setSelectedAsrMethod(method.id)}
                    />
                  ))}
                </View>
              </View>
            </View>

            {/* Actions */}
            <View className="mt-6 flex-row gap-3">
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
          </View>
        </RNHostView>
      </BottomSheet>
    </Host>
  );
};

interface SelectionRowProps {
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
}

const SelectionRow = ({
  title,
  description,
  selected,
  onPress,
}: SelectionRowProps) => {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center justify-between rounded-xl border px-4 py-3 ${
        selected ? "border-primary bg-primary-soft" : "border-border bg-card"
      }`}
    >
      <View className="flex-1 pr-3">
        <Text
          className={`font-sans-semibold text-sm ${
            selected ? "text-primary" : "text-foreground"
          }`}
        >
          {title}
        </Text>

        <Text className="text-muted-foreground font-sans-medium mt-0.5 text-xs">
          {description}
        </Text>
      </View>

      <View
        className={`h-5 w-5 items-center justify-center rounded-full border-2 ${
          selected
            ? "border-primary bg-primary"
            : "border-border bg-transparent"
        }`}
      >
        {selected && (
          <Fa name="check" size={10} className="text-primary-foreground" />
        )}
      </View>
    </Pressable>
  );
};

export default PrayerCalculationSheet;
