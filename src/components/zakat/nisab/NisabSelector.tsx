import { formatAmount } from "@/lib/format";
import type { ZakatNisabStandard } from "@/types/zakat";
import { Pressable, Text, View } from "react-native";

interface NisabSelectorProps {
  value: ZakatNisabStandard;
  onChange: (value: ZakatNisabStandard) => void;
  amount: number;
}

const NisabSelector = ({ value, onChange, amount }: NisabSelectorProps) => {
  return (
    <View className="gap-3">
      <View className="flex-row gap-3">
        <Pressable
          onPress={() => onChange("silver")}
          accessibilityRole="radio"
          accessibilityState={{ checked: value === "silver" }}
          className={
            value === "silver"
              ? "border-primary bg-primary-muted flex-1 rounded-2xl border-2 p-4"
              : "border-border bg-card flex-1 rounded-2xl border p-4"
          }
        >
          <Text className="font-sans-semibold text-foreground text-base">
            Silver
          </Text>

          <Text className="font-sans-regular text-muted-foreground mt-1 text-sm">
            612.36 g
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onChange("gold")}
          accessibilityRole="radio"
          accessibilityState={{ checked: value === "gold" }}
          className={
            value === "gold"
              ? "border-primary bg-primary-muted flex-1 rounded-2xl border-2 p-4"
              : "border-border bg-card flex-1 rounded-2xl border p-4"
          }
        >
          <Text className="font-sans-semibold text-foreground text-base">
            Gold
          </Text>

          <Text className="font-sans-regular text-muted-foreground mt-1 text-sm">
            87.48 g
          </Text>
        </Pressable>
      </View>

      <View className="bg-muted rounded-xl p-4">
        <Text className="font-sans-regular text-muted-foreground text-sm">
          Current Nisab
        </Text>

        <Text className="font-sans-bold text-foreground mt-1 text-xl">
          {formatAmount(amount)}
        </Text>
      </View>
    </View>
  );
};

export default NisabSelector;
