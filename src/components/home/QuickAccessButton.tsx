import { FontAwesome6 as Fa } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface QuickAccessButtonProps {
  type: "quran" | "mosques" | "prayer" | "zakat";
}

interface QuickAccessItem {
  icon: React.ComponentProps<typeof Fa>["name"];
  iconClassName: string;
  iconContainerClassName: string;
  badge: string;
  badgeClassName: string;
  badgeTextClassName: string;
  title: string;
  description: string;
  route: Href;
}

const quickAccessConfig: Record<
  QuickAccessButtonProps["type"],
  QuickAccessItem
> = {
  quran: {
    icon: "book-quran",
    iconClassName: "text-secondary-soft-foreground",
    iconContainerClassName: "bg-secondary-soft",
    badge: "Surah",
    badgeClassName: "bg-secondary-soft",
    badgeTextClassName: "text-secondary-soft-foreground",
    title: "Quran",
    description: "Read Surah Al-Kahf",
    route: "/quran",
  },

  mosques: {
    icon: "mosque",
    iconClassName: "text-primary-soft-foreground",
    iconContainerClassName: "bg-primary-soft",
    badge: "0.4 mi",
    badgeClassName: "bg-primary-soft",
    badgeTextClassName: "text-primary-soft-foreground",
    title: "Mosques",
    description: "4 open nearby",
    route: "/mosques",
  },

  prayer: {
    icon: "calendar-days",
    iconClassName: "text-muted-foreground",
    iconContainerClassName: "bg-muted",
    badge: "Daily",
    badgeClassName: "",
    badgeTextClassName: "text-muted-foreground",
    title: "Prayer Times",
    description: "Times & notifications",
    route: "/prayer-times",
  },

  zakat: {
    icon: "money-bill-wave",
    iconClassName: "text-muted-foreground",
    iconContainerClassName: "bg-muted",
    badge: "Nisab",
    badgeClassName: "",
    badgeTextClassName: "text-muted-foreground",
    title: "Zakat",
    description: "Quick Calculator",
    route: "/zakat",
  },
};

const QuickAccessButton = ({ type }: QuickAccessButtonProps) => {
  const item = quickAccessConfig[type];

  const handlePress = () => {
    if (item.route) {
      router.push(item.route);
    }
  };

  return (
    <Pressable
      className="bg-card gap-3 rounded-xl p-4 shadow-md active:opacity-75"
      onPress={handlePress}
      accessibilityLabel={item.title}
    >
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
    </Pressable>
  );
};

export default QuickAccessButton;
