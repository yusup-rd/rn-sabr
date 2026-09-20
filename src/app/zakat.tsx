import ZakatInput from "@/components/zakat/form/ZakatInput";
import ZakatSection from "@/components/zakat/form/ZakatSection";
import NisabCard from "@/components/zakat/nisab/NisabCard";
import ZakatResultCard from "@/components/zakat/result/ZakatResultCard";
import useZakatMarketPrices from "@/hooks/useZakatMarketPrices";
import { calculateZakatSummary } from "@/lib/zakat-calculations";
import { useZakatStore } from "@/store/zakatStore";
import { Pressable, ScrollView, Text } from "react-native";

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

  const {
    prices: marketPrices,
    isLoading: isMarketPricesLoading,
    error: marketPricesError,
    isStale: areMarketPricesStale,
  } = useZakatMarketPrices();

  const summary = marketPrices
    ? calculateZakatSummary(
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
      )
    : null;

  return (
    <ScrollView
      className="bg-background flex-1"
      contentContainerClassName="gap-5 p-5"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      automaticallyAdjustKeyboardInsets
    >
      {/* Nisab */}
      <NisabCard
        prices={marketPrices}
        isLoading={isMarketPricesLoading}
        error={marketPricesError}
        isStale={areMarketPricesStale}
        nisabStandard={nisabStandard}
        nisabAmount={summary?.nisabAmount ?? null}
        onNisabStandardChange={(value) => setField("nisabStandard", value)}
      />

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
        description="Include debts and payments that may be deductible from your zakatable wealth."
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
      {summary ? <ZakatResultCard summary={summary} /> : null}

      {/* Reset */}
      <Pressable
        onPress={reset}
        className="border-border bg-card active:bg-muted items-center rounded-2xl border px-5 py-4"
      >
        <Text className="font-sans-semibold text-foreground text-base">
          Reset Calculator
        </Text>
      </Pressable>

      {/* Info */}
      <Text className="font-sans-regular text-muted-foreground px-2 text-center text-xs leading-5">
        Zakat is generally calculated at 2.5% of zakatable wealth once it
        reaches the Nisab threshold and the applicable Hawl period has passed.
        For personal religious circumstances, consult a qualified scholar.
      </Text>
    </ScrollView>
  );
};

export default Zakat;
