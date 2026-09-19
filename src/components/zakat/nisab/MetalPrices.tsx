import type { ZakatMarketPrices } from "@/types/zakat";
import { Text, View } from "react-native";

interface MetalPricesProps {
  prices: ZakatMarketPrices;
}

const MetalPrices = ({ prices }: MetalPricesProps) => {
  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between">
        <Text className="font-sans-regular text-muted-foreground text-base">
          Gold
        </Text>

        <Text className="font-sans-semibold text-foreground text-base">
          ${prices.goldPerGram.toFixed(2)}/g
        </Text>
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="font-sans-regular text-muted-foreground text-base">
          Silver
        </Text>

        <Text className="font-sans-semibold text-foreground text-base">
          ${prices.silverPerGram.toFixed(2)}/g
        </Text>
      </View>
    </View>
  );
};

export default MetalPrices;
