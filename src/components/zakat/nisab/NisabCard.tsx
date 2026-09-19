import MetalPrices from "@/components/zakat/nisab/MetalPrices";
import NisabSelector from "@/components/zakat/nisab/NisabSelector";
import type { ZakatMarketPrices, ZakatNisabStandard } from "@/types/zakat";
import { FontAwesome6 as Fa } from "@expo/vector-icons";
import { ActivityIndicator, Text, View } from "react-native";

interface NisabCardProps {
  prices: ZakatMarketPrices | null;
  isLoading: boolean;
  error: string | null;
  isStale: boolean;
  nisabStandard: ZakatNisabStandard;
  nisabAmount: number | null;
  onNisabStandardChange: (value: ZakatNisabStandard) => void;
}

const formatUpdatedAt = (updatedAt: string) => {
  const date = new Date(updatedAt);

  if (Number.isNaN(date.getTime())) {
    return "Last updated recently";
  }

  return `Updated ${date.toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  })}`;
};

const NisabCard = ({
  prices,
  isLoading,
  error,
  isStale,
  nisabStandard,
  nisabAmount,
  onNisabStandardChange,
}: NisabCardProps) => {
  return (
    <View className="bg-card gap-5 rounded-2xl p-5 shadow-md">
      <View className="gap-1">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="bg-primary-soft size-10 items-center justify-center rounded-lg">
              <Fa name="scale-balanced" size={18} className="text-primary" />
            </View>

            <Text className="font-sans-semibold text-primary text-lg">
              Nisab
            </Text>
          </View>

          {isLoading ? <ActivityIndicator /> : null}
        </View>

        <Text className="font-sans-regular text-muted-foreground text-sm leading-5">
          Choose the standard used to determine your Nisab threshold.
        </Text>
      </View>

      {prices ? (
        <>
          <MetalPrices prices={prices} />

          <View className="bg-border h-px" />

          <NisabSelector
            value={nisabStandard}
            onChange={onNisabStandardChange}
            amount={nisabAmount ?? 0}
          />

          <Text className="font-sans-regular text-muted-foreground text-xs">
            {isStale
              ? "Using previously saved market prices."
              : formatUpdatedAt(prices.updatedAt)}
          </Text>
        </>
      ) : error ? (
        <Text className="font-sans-regular text-destructive text-sm leading-5">
          {error}
        </Text>
      ) : (
        <Text className="font-sans-regular text-muted-foreground text-sm leading-5">
          Loading current market prices...
        </Text>
      )}
    </View>
  );
};

export default NisabCard;
