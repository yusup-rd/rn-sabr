import { Text, TextInput, View } from "react-native";

interface ZakatInputProps {
  label: string;
  description?: string;
  value: number;
  onChange: (value: number) => void;
}

const ZakatInput = ({
  label,
  description,
  value,
  onChange,
}: ZakatInputProps) => {
  const handleChange = (text: string) => {
    const normalized = text.replace(",", ".");

    if (normalized === "") {
      onChange(0);
      return;
    }

    const parsed = Number(normalized);

    if (!Number.isNaN(parsed) && parsed >= 0) {
      onChange(parsed);
    }
  };

  return (
    <View className="gap-2">
      <View className="flex-1 gap-1">
        <Text className="font-sans-medium text-foreground text-base">
          {label}
        </Text>

        {description ? (
          <Text className="font-sans-regular text-muted-foreground text-sm leading-5">
            {description}
          </Text>
        ) : null}
      </View>

      <TextInput
        value={value === 0 ? "" : String(value)}
        onChangeText={handleChange}
        keyboardType="decimal-pad"
        placeholder="0"
        placeholderTextColor="text-muted-foreground"
        className="border-border bg-card font-sans-medium text-foreground focus:border-primary rounded-xl border p-3"
      />
    </View>
  );
};

export default ZakatInput;
