import { FontAwesome6 as Fa } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface InfoSectionProps {
  message: string;
}

const InfoSection = ({ message }: InfoSectionProps) => {
  return (
    <View className="border-border flex-row items-center gap-2 rounded-lg border p-2">
      <Fa name="circle-info" size={16} className="text-muted-foreground" />
      <Text className="text-muted-foreground flex-1 font-sans text-xs">
        {message}
      </Text>
    </View>
  );
};

export default InfoSection;
