import type { NearbyMosque } from "@/hooks/useNearbyMosques";
import { formatDistance, formatDuration } from "@/lib/format";
import { FontAwesome6 as Fa } from "@expo/vector-icons";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

interface MosqueCardProps {
  mosque: NearbyMosque;
  selected: boolean;
  onPress: () => void;
  onDirectionsPress: () => void;
}

const MosqueCard = ({
  mosque,
  selected,
  onPress,
  onDirectionsPress,
}: MosqueCardProps) => {
  const { t: tUnits } = useTranslation(undefined, {
    keyPrefix: "units",
  });

  const distance = formatDistance(mosque.distanceMeters);

  return (
    <Pressable
      onPress={onPress}
      className={clsx(
        "gap-2 rounded-xl border p-4",
        selected ? "bg-primary-soft border-primary" : "bg-card border-border",
      )}
    >
      <View className="flex-row items-center gap-3">
        <View
          className={clsx(
            "size-11 items-center justify-center rounded-full",
            selected ? "bg-primary" : "bg-primary-soft",
          )}
        >
          <Fa
            name="mosque"
            size={20}
            className={clsx(
              selected
                ? "text-primary-foreground"
                : "text-primary-soft-foreground",
            )}
          />
        </View>

        <View className="flex-1">
          <View className="flex-row items-center justify-between gap-2">
            <Text
              className={clsx(
                "font-sans-semibold flex-1",
                selected ? "text-primary" : "text-foreground",
              )}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {mosque.name}
            </Text>

            {mosque.isClosest ? (
              <View className="bg-secondary-soft items-center justify-center rounded-full px-3 py-1">
                <Text className="font-sans-semibold text-secondary-soft-foreground text-xs">
                  Closest
                </Text>
              </View>
            ) : null}
          </View>

          {mosque.street ? (
            <Text className="font-sans-regular text-muted-foreground text-sm">
              {mosque.street}
            </Text>
          ) : null}
        </View>
      </View>

      <View className="flex-row items-center gap-2">
        <Text className="font-sans-medium text-muted-foreground text-sm">
          {formatDuration(mosque.walkingMinutes * 60_000)} walk
        </Text>

        <View className="bg-muted-foreground size-1 rounded-full" />

        <Text className="font-sans-regular text-muted-foreground text-sm">
          {distance.value} {tUnits(`${distance.unit}`)}
        </Text>
      </View>

      <Pressable
        onPress={onDirectionsPress}
        className={clsx(
          "flex-row items-center justify-center gap-2 rounded-lg px-4 py-3 active:opacity-80",
          selected ? "bg-primary" : "bg-muted",
        )}
      >
        <Fa
          name="diamond-turn-right"
          size={16}
          className={selected ? "text-primary-foreground" : "text-primary"}
        />
        <Text
          className={clsx(
            "font-sans-semibold",
            selected ? "text-primary-foreground" : "text-primary",
          )}
        >
          Directions
        </Text>
      </Pressable>
    </Pressable>
  );
};

export default MosqueCard;
