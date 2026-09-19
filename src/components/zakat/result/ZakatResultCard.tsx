import { formatAmount } from "@/lib/format";
import type { ZakatSummary } from "@/types/zakat";
import { FontAwesome6 as Fa } from "@expo/vector-icons";
import { Text, View } from "react-native";
import ZakatSummaryRow from "./ZakatSummaryRow";

interface ZakatResultCardProps {
  summary: ZakatSummary;
}

const ZakatResultCard = ({ summary }: ZakatResultCardProps) => {
  return (
    <View className="bg-card gap-5 rounded-2xl p-5 shadow-md">
      <View className="gap-1">
        <View className="flex-row items-center gap-3">
          <View className="bg-primary-soft size-10 items-center justify-center rounded-lg">
            <Fa name="hand-holding-dollar" size={18} className="text-primary" />
          </View>

          <Text className="font-sans-semibold text-primary text-lg">
            Zakat Summary
          </Text>
        </View>
        <Text className="font-sans-regular text-muted-foreground text-sm leading-5">
          Based on the values you entered.
        </Text>
      </View>

      <View className="gap-4">
        <ZakatSummaryRow
          label="Total assets"
          value={formatAmount(summary.totalAssets)}
        />

        <ZakatSummaryRow
          label="Deductible liabilities"
          value={`-${formatAmount(summary.totalLiabilities)}`}
          color="destructive"
        />

        <View className="bg-border h-px" />

        <ZakatSummaryRow
          label="Net wealth"
          value={formatAmount(summary.netWealth)}
          emphasized
        />

        <ZakatSummaryRow
          label={`Nisab (${summary.meetsNisab ? "met" : "not met"})`}
          value={formatAmount(summary.nisabAmount)}
        />
      </View>

      <View className="bg-card rounded-2xl p-5">
        <Text className="font-sans-medium text-muted-foreground text-center text-sm">
          Zakat Amount
        </Text>

        <Text className="font-sans-bold text-primary mt-1 text-center text-3xl">
          {formatAmount(summary.zakatAmount)}
        </Text>

        <Text className="font-sans-regular text-muted-foreground mt-2 text-center text-xs leading-5">
          {summary.meetsNisab
            ? "Your net wealth meets the selected Nisab threshold. Hawl eligibility is not assessed by this calculator."
            : "Your net wealth is below the selected Nisab threshold."}
        </Text>
      </View>
    </View>
  );
};

export default ZakatResultCard;
