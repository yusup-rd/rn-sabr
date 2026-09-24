import type { Prayer } from "@/types/prayer";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

interface PrayerCardProps {
  prayer: Prayer;
}

const PrayerCard = ({ prayer }: PrayerCardProps) => {
  const { t } = useTranslation(undefined, { keyPrefix: "home.prayersToday" });
  const { t: tPrayer } = useTranslation(undefined, {
    keyPrefix: "prayers",
  });

  const isSoon = prayer.status === "soon";
  const isCompleted = prayer.status === "completed";

  return (
    <View className="bg-card flex-row items-center justify-between gap-2 rounded-xl p-3.5 shadow-md">
      <View className="flex-row items-center gap-3">
        <View
          className={clsx(
            "size-8 items-center justify-center rounded-full",
            isSoon ? "bg-secondary/30" : "bg-muted",
          )}
        >
          <Ionicons
            name={prayer.icon}
            size={16}
            className={clsx(
              isSoon
                ? "text-secondary-soft-foreground"
                : "text-muted-foreground",
            )}
          />
        </View>

        <View className="gap-0.5">
          <View className="flex-row items-center gap-1.5">
            <Text className="font-sans-semibold text-foreground text-sm">
              {tPrayer(prayer.name.toLowerCase())}
            </Text>

            {isSoon && <View className="bg-secondary size-1.5 rounded-full" />}
          </View>

          <Text
            className={clsx(
              "text-xs",
              isSoon
                ? "text-secondary font-sans-semibold"
                : "text-muted-foreground font-sans",
            )}
          >
            {isSoon
              ? t("nextIn", { time: prayer.remainingFormatted })
              : tPrayer(prayer.description.toLowerCase())}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center gap-3">
        <Text
          className={clsx(
            isSoon
              ? "font-sans-bold text-primary text-lg"
              : "font-sans-medium text-foreground text-sm",
          )}
        >
          {prayer.formattedTime}
        </Text>

        <View
          className={clsx(
            "size-6 items-center justify-center rounded-full",
            isSoon
              ? "bg-secondary/30"
              : isCompleted
                ? "bg-success/30"
                : "bg-muted",
          )}
        >
          {isCompleted ? (
            <MaterialIcons name="check" size={13} className="text-success" />
          ) : (
            <MaterialIcons
              name={isSoon ? "notifications-active" : "notifications"}
              size={13}
              className={clsx(
                isSoon
                  ? "text-secondary-soft-foreground"
                  : "text-muted-foreground",
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default PrayerCard;
