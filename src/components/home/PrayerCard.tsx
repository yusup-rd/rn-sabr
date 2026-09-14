import { Prayer } from "@/types";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { clsx } from "clsx";
import { Text, View } from "react-native";

const PrayerCard = ({ prayer }: { prayer: Prayer }) => {
  const isSoon = prayer.status === "soon";
  const isCompleted = prayer.status === "completed";

  const prayerIcon =
    prayer.iconFamily === "ionicons" ? (
      <Ionicons
        name={prayer.icon}
        size={16}
        color={isSoon ? "#C5A059" : "#64748B"}
      />
    ) : (
      <Feather
        name={prayer.icon}
        size={16}
        color={isSoon ? "#C5A059" : "#64748B"}
      />
    );

  return (
    <View className="bg-card flex-row items-center justify-between gap-2 rounded-xl p-3.5 shadow-md">
      <View className="flex-row items-center gap-3">
        <View
          className={clsx(
            "size-8 items-center justify-center rounded-full",
            isSoon ? "bg-secondary/30" : "bg-muted",
          )}
        >
          {prayerIcon}
        </View>

        <View className="gap-0.5">
          <View className="flex-row items-center gap-1.5">
            <Text className="font-sans-semibold text-foreground text-sm">
              {prayer.name}
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
            {isSoon ? "Next in 1h 24 min" : prayer.description}
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
          {prayer.time}
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
            <Feather name="check" size={12} color="#10B981" />
          ) : (
            <MaterialCommunityIcons
              name={isSoon ? "bell-ring-outline" : "bell-outline"}
              size={13}
              color={isSoon ? "#C5A059" : "#64748B"}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default PrayerCard;
