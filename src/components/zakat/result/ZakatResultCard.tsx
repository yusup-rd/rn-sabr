import { formatAmount } from "@/lib/format";
import type { ZakatSummary } from "@/types/zakat";
import { FontAwesome6 as Fa } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { Pressable, Share, Text, View } from "react-native";
import ZakatSummaryRow from "./ZakatSummaryRow";

interface ZakatResultCardProps {
  summary: ZakatSummary;
}

const ZakatResultCard = ({ summary }: ZakatResultCardProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const zakatAmount = formatAmount(summary.zakatAmount);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(zakatAmount);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  const handleShare = async () => {
    await Share.share({
      message: `My Zakat amount is ${zakatAmount}.`,
    });
  };

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
          {zakatAmount}
        </Text>

        <Text className="font-sans-regular text-muted-foreground mt-2 text-center text-xs leading-5">
          {summary.meetsNisab
            ? "Your net wealth meets the selected Nisab threshold. Hawl eligibility is not assessed by this calculator."
            : "Your net wealth is below the selected Nisab threshold."}
        </Text>

        <View className="mt-4 flex-row gap-3">
          <Pressable
            onPress={handleCopy}
            accessibilityRole="button"
            accessibilityLabel="Copy Zakat amount"
            accessibilityHint="Copies the Zakat amount to the clipboard"
            className="border-border bg-background flex-1 flex-row items-center justify-center gap-2 rounded-xl border px-4 py-3 active:opacity-70"
          >
            <Fa
              name={isCopied ? "check" : "copy"}
              size={14}
              className="text-primary"
            />

            <Text className="font-sans-semibold text-foreground text-sm">
              {isCopied ? "Copied" : "Copy Zakat"}
            </Text>
          </Pressable>

          <Pressable
            onPress={handleShare}
            accessibilityRole="button"
            accessibilityLabel="Share Zakat amount"
            accessibilityHint="Shares the Zakat amount"
            className="bg-primary flex-1 flex-row items-center justify-center gap-2 rounded-xl px-4 py-3 active:opacity-70"
          >
            <Fa name="share-nodes" size={14} color="white" />

            <Text className="font-sans-semibold text-primary-foreground text-sm">
              Share Zakat
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ZakatResultCard;
