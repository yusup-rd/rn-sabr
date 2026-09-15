import { FontAwesome6 as Fa } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface QuickAccessButtonProps {
  type: "quran" | "mosques" | "prayer" | "zakat";
}

const quickAccessConfig = {
  quran: {
    icon: "book-quran" as const,
    iconClassName: "text-secondary",
    iconContainerClassName: "bg-secondary/30",
    badge: "Surah",
    badgeClassName: "bg-secondary/30",
    badgeTextClassName: "text-secondary",
    title: "Quran",
    description: "Read Surah Al-Kahf",
  },
  mosques: {
    icon: "mosque" as const,
    iconClassName: "text-primary",
    iconContainerClassName: "bg-success/20",
    badge: "0.4 mi",
    badgeClassName: "bg-success/20",
    badgeTextClassName: "text-primary",
    title: "Mosques",
    description: "4 open nearby",
  },
  prayer: {
    icon: "calendar-days" as const,
    iconClassName: "text-muted-foreground",
    iconContainerClassName: "bg-muted",
    badge: "Daily",
    badgeClassName: "",
    badgeTextClassName: "text-muted-foreground",
    title: "Prayer Times",
    description: "Times & notifications",
  },
  zakat: {
    icon: "money-bill-wave" as const,
    iconClassName: "text-muted-foreground",
    iconContainerClassName: "bg-muted",
    badge: "Nisab",
    badgeClassName: "",
    badgeTextClassName: "text-muted-foreground",
    title: "Zakat",
    description: "Quick Calculator",
  },
};

const QuickAccessButton = ({ type }: QuickAccessButtonProps) => {
  const item = quickAccessConfig[type];

  return (
    <View className="bg-card gap-3 rounded-xl p-4 shadow-md">
      <View className="flex-row items-center justify-between gap-2">
        <View
          className={`size-9 items-center justify-center rounded-full ${item.iconContainerClassName}`}
        >
          <Fa name={item.icon} size={16} className={item.iconClassName} />
        </View>

        {item.badge && (
          <View
            className={`flex items-center justify-center rounded-full px-2 py-0.5 ${item.badgeClassName}`}
          >
            <Text
              className={`font-sans-semibold text-xs ${item.badgeTextClassName}`}
            >
              {item.badge}
            </Text>
          </View>
        )}
      </View>

      <View>
        <Text
          className="font-sans-semibold text-foreground text-lg"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.title}
        </Text>

        <Text
          className="text-muted-foreground font-sans text-sm"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.description}
        </Text>
      </View>
    </View>
  );
};

export default QuickAccessButton;
