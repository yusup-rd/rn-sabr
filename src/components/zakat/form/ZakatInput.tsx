import { useEffect, useState } from "react";
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
  const [text, setText] = useState(value === 0 ? "" : String(value));
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setText(value === 0 ? "" : String(value));
    }
  }, [value, isFocused]);

  const handleChange = (input: string) => {
    const normalized = input.replace(",", ".");

    if (!/^\d*\.?\d*$/.test(normalized)) {
      return;
    }

    setText(normalized);

    if (normalized === "") {
      onChange(0);
      return;
    }

    const parsed = Number(normalized);

    if (!Number.isNaN(parsed) && parsed >= 0) {
      onChange(parsed);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setText(value === 0 ? "" : String(value));
  };

  return (
    <View className="gap-2">
      <View className="gap-1">
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
        value={text}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
