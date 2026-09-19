import ZakatInfo from "@/components/zakat/ZakatInfo";
import ZakatInput from "@/components/zakat/ZakatInput";
import ZakatResult from "@/components/zakat/ZakatResult";
import ZakatSection from "@/components/zakat/ZakatSection";
import { DUMMY_ZAKAT_PRICES } from "@/constants/zakat";
import { calculateZakatSummary } from "@/lib/zakat-calculations";
import { useZakatStore } from "@/store/zakatStore";
import { Pressable, ScrollView, Text, View } from "react-native";

const Zakat = () => {
  const {
    nisabStandard,
    gold,
    silver,
    cashAndBank,
    futurePurposeSavings,
    moneyOwed,
    investments,
    businessStock,
    shortTermDebt,
    immediateBills,
    wagesDue,
    setField,
    reset,
  } = useZakatStore();

  const marketPrices = DUMMY_ZAKAT_PRICES;

  const summary = calculateZakatSummary(
    {
      nisabStandard,
      gold,
      silver,
      cashAndBank,
      futurePurposeSavings,
      moneyOwed,
      investments,
      businessStock,
      shortTermDebt,
      immediateBills,
      wagesDue,
    },
    marketPrices,
  );

  return (
    <ScrollView
      className="bg-background flex-1"
      contentContainerClassName="gap-5 p-5"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      automaticallyAdjustKeyboardInsets
    >
      <View className="gap-2">
        <Text className="font-sans-bold text-foreground text-3xl">Zakat</Text>

        <Text className="font-sans-regular text-muted-foreground text-base leading-6">
          Enter the value of your zakatable wealth to calculate your Zakat.
        </Text>
      </View>

      {/* Nisab */}
      <ZakatSection
        title="Nisab"
        description="Choose the standard used to determine the Nisab threshold."
        icon="scale-balanced"
      >
        <View className="flex-row gap-3">
          <Pressable
            onPress={() => setField("nisabStandard", "silver")}
            className={
              nisabStandard === "silver"
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
            onPress={() => setField("nisabStandard", "gold")}
            className={
              nisabStandard === "gold"
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
      </ZakatSection>

      {/* Precious metals */}
      <ZakatSection
        title="Gold & Silver"
        description="Enter the current monetary value of the gold and silver you own."
        icon="gem"
      >
        <ZakatInput
          label="Value of gold"
          value={gold}
          onChange={(value) => setField("gold", value)}
        />

        <ZakatInput
          label="Value of silver"
          value={silver}
          onChange={(value) => setField("silver", value)}
        />
      </ZakatSection>

      {/* Assets */}
      <ZakatSection
        title="Assets"
        description="Include your zakatable cash, savings, investments and business assets."
        icon="wallet"
      >
        <ZakatInput
          label="Cash & bank balance"
          description="Include the total money you currently hold in cash and bank accounts."
          value={cashAndBank}
          onChange={(value) => setField("cashAndBank", value)}
        />

        <ZakatInput
          label="Money saved for a future purpose"
          description="For example, money set aside for Hajj or another future purpose."
          value={futurePurposeSavings}
          onChange={(value) => setField("futurePurposeSavings", value)}
        />

        <ZakatInput
          label="Money owed to you"
          description="Loans or other money you expect to receive."
          value={moneyOwed}
          onChange={(value) => setField("moneyOwed", value)}
        />

        <ZakatInput
          label="Investments & savings"
          description="Zakatable investments, shares and similar assets."
          value={investments}
          onChange={(value) => setField("investments", value)}
        />

        <ZakatInput
          label="Business stock"
          description="Goods or stock held for trade."
          value={businessStock}
          onChange={(value) => setField("businessStock", value)}
        />
      </ZakatSection>

      {/* Liabilities */}
      <ZakatSection
        title="Deductible Liabilities"
        description="Include debts and payments that are currently deductible under the selected calculation methodology."
        icon="file-invoice-dollar"
      >
        <ZakatInput
          label="Short-term debt"
          description="Debt that must be paid within the next 12 months."
          value={shortTermDebt}
          onChange={(value) => setField("shortTermDebt", value)}
        />

        <ZakatInput
          label="Immediate bills"
          description="Rent, taxes, utilities and other payments currently due."
          value={immediateBills}
          onChange={(value) => setField("immediateBills", value)}
        />

        <ZakatInput
          label="Wages due"
          description="Outstanding wages owed to employees."
          value={wagesDue}
          onChange={(value) => setField("wagesDue", value)}
        />
      </ZakatSection>

      {/* Result */}
      <ZakatResult summary={summary} />

      {/* Reset */}
      <Pressable
        onPress={reset}
        className="border-border bg-card active:bg-muted items-center rounded-2xl border px-5 py-4"
      >
        <Text className="font-sans-semibold text-foreground text-base">
          Reset Calculator
        </Text>
      </Pressable>

      <ZakatInfo />
    </ScrollView>
  );
};

export default Zakat;
