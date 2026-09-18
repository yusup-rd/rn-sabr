import { formatTime } from "@/lib/format";
import { clsx } from "clsx";
import { Text, View } from "react-native";

interface NightThirdsProps {
  sunset: Date;
  fajr: Date;
  firstThirdEnd: number;
  secondThirdStart: number;
  secondThirdEnd: number;
  lastThirdStart: number;
  isFirstThird: boolean;
  isSecondThird: boolean;
  isLastThird: boolean;
}

const NightThirds = ({
  sunset,
  fajr,
  firstThirdEnd,
  secondThirdStart,
  secondThirdEnd,
  lastThirdStart,
  isFirstThird,
  isSecondThird,
  isLastThird,
}: NightThirdsProps) => {
  return (
    <View className="border-border overflow-hidden rounded-2xl border">
      <View className={clsx("px-4 py-3.5", isFirstThird && "bg-primary-soft")}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <View
              className={clsx(
                "h-2 w-2 rounded-full",
                isFirstThird ? "bg-primary" : "bg-muted-foreground/30",
              )}
            />

            <Text
              className={clsx(
                "font-sans-semibold text-xs",
                isFirstThird ? "text-primary" : "text-foreground",
              )}
            >
              1st third
            </Text>
          </View>

          <Text className="text-muted-foreground font-sans text-xs">
            {formatTime(sunset)} – {formatTime(new Date(firstThirdEnd))}
          </Text>
        </View>
      </View>

      <View className="bg-border h-px" />

      <View className={clsx("px-4 py-3.5", isSecondThird && "bg-primary-soft")}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <View
              className={clsx(
                "h-2 w-2 rounded-full",
                isSecondThird ? "bg-primary" : "bg-muted-foreground/30",
              )}
            />

            <Text
              className={clsx(
                "font-sans-semibold text-xs",
                isSecondThird ? "text-primary" : "text-foreground",
              )}
            >
              2nd third
            </Text>
          </View>

          <Text className="text-muted-foreground font-sans text-xs">
            {formatTime(new Date(secondThirdStart))} –{" "}
            {formatTime(new Date(secondThirdEnd))}
          </Text>
        </View>
      </View>

      <View className="bg-border h-px" />

      <View className={clsx("px-4 py-3.5", isLastThird && "bg-primary-soft")}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <View
              className={clsx(
                "h-2 w-2 rounded-full",
                isLastThird ? "bg-primary" : "bg-muted-foreground/30",
              )}
            />

            <Text
              className={clsx(
                "font-sans-semibold text-xs",
                isLastThird ? "text-primary" : "text-foreground",
              )}
            >
              Last third
            </Text>
          </View>

          <Text className="text-muted-foreground font-sans text-xs">
            {formatTime(new Date(lastThirdStart))} – {formatTime(fajr)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NightThirds;
