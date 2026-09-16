import { FontAwesome6 as Fa } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

interface ErrorCardProps {
  title: string;
  message: string;
  actionLabel: string;
  onActionPress: () => void;
}

const ErrorCard = ({
  title,
  message,
  actionLabel,
  onActionPress,
}: ErrorCardProps) => {
  return (
    <View className="bg-card rounded-xl p-5 shadow-md">
      <View className="flex-row items-center gap-2">
        <Fa name="circle-exclamation" size={20} className="text-destructive" />
        <View>
          <Text className="font-sans-semibold text-foreground text-base">
            {title}
          </Text>

          <Text className="text-muted-foreground font-sans text-sm">
            {message}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={onActionPress}
        className="bg-primary mt-4 items-center rounded-lg px-4 py-3 active:opacity-80"
        accessibilityLabel={actionLabel}
      >
        <Text className="font-sans-semibold text-primary-foreground text-sm">
          {actionLabel}
        </Text>
      </Pressable>
    </View>
  );
};

export default ErrorCard;
