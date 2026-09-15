import { FontAwesome6 as Fa } from "@expo/vector-icons";
import { Text, View } from "react-native";

const AyahCard = () => {
  return (
    <View className="bg-card overflow-hidden rounded-xl shadow-md">
      <View className="border-l-secondary gap-2 border-l-6 p-6">
        <View className="flex-row items-center justify-between gap-2">
          <View className="flex-row items-center gap-1.5">
            <Text className="font-sans-extrabold text-secondary text-xs">
              99
            </Text>
            <Text className="font-sans-semibold text-secondary text-xs uppercase">
              Ayah of the Day
            </Text>
          </View>

          <Text className="font-sans-semibold text-muted-foreground text-xs">
            Surah Ash-Sharh (94:5)
          </Text>
        </View>

        {/* Arabic text */}
        <Text className="text-primary font-sans-semibold writingDirection-rtl text-right text-2xl">
          فَإِنَّ مَعَ الْعُسْرِ يُسْرًا
        </Text>

        <Text className="text-card-foreground font-sans-italic text-sm">
          “Indeed, with hardship comes ease.”
        </Text>

        <View className="flex-row items-center justify-between gap-2">
          <Text className="text-muted-foreground font-sans text-xs">
            A reminder of hope for every trial.
          </Text>
          <View className="bg-primary/10 flex-row items-center gap-1 rounded-full px-4 py-2">
            <Text className="font-sans-semibold text-primary text-xs">
              Reflect
            </Text>
            <Fa name="arrow-right" size={12} className="text-primary" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AyahCard;
