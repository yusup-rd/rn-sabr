import {
  formatDayMonth,
  formatDuration,
  formatRemainingDuration,
  formatTime,
} from "@/lib/format";
import { AntDesign } from "@expo/vector-icons";
import { clsx } from "clsx";
import { Text, View } from "react-native";

interface NightPortionsProps {
  sunset: Date;
  fajr: Date;
  now: Date;
  isToday: boolean;
  selectedDate: Date;
}

const NightPortions = ({
  sunset,
  fajr,
  now,
  isToday,
  selectedDate,
}: NightPortionsProps) => {
  const sunsetTime = sunset.getTime();
  const fajrTime = fajr.getTime();
  const nowTime = now.getTime();

  const nightDuration = fajrTime - sunsetTime;

  if (nightDuration <= 0) {
    return null;
  }

  const thirdDuration = nightDuration / 3;

  const firstThirdEnd = sunsetTime + thirdDuration;
  const secondThirdStart = firstThirdEnd;
  const secondThirdEnd = sunsetTime + thirdDuration * 2;
  const lastThirdStart = secondThirdEnd;
  const lastThirdEnd = fajrTime;

  const isBeforeNight = nowTime < sunsetTime;
  const isAfterNight = nowTime >= fajrTime;

  const isFirstThird =
    isToday && nowTime >= sunsetTime && nowTime < firstThirdEnd;

  const isSecondThird =
    isToday && nowTime >= secondThirdStart && nowTime < secondThirdEnd;

  const isLastThird =
    isToday && nowTime >= lastThirdStart && nowTime < lastThirdEnd;

  const isBeforeIsha = false;

  const getStatus = () => {
    if (!isToday) {
      return null;
    }

    if (isBeforeNight) {
      return {
        label: "Before night",
        className: "bg-muted",
        textClassName: "text-muted-foreground",
      };
    }

    if (isAfterNight) {
      return {
        label: "Night ended",
        className: "bg-muted",
        textClassName: "text-muted-foreground",
      };
    }

    if (isLastThird) {
      return {
        label: "Last third",
        className: "bg-primary-soft",
        textClassName: "text-primary",
      };
    }

    if (isSecondThird) {
      return {
        label: "2nd third",
        className: "bg-primary-soft",
        textClassName: "text-primary",
      };
    }

    if (isFirstThird) {
      return {
        label: "1st third",
        className: "bg-primary-soft",
        textClassName: "text-primary",
      };
    }

    return null;
  };

  const status = getStatus();

  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const selectedDateStart = new Date(selectedDate);
  selectedDateStart.setHours(0, 0, 0, 0);

  const isPastDate =
    !isToday && selectedDateStart.getTime() < todayStart.getTime();

  const lastThirdHasBegun = isToday ? nowTime >= lastThirdStart : isPastDate;

  const lastThirdLabel = lastThirdHasBegun
    ? "Last third began at"
    : "Last third begins at";

  const nightPrayerDuration = fajrTime - sunsetTime;

  return (
    <View className="bg-card gap-3 rounded-2xl p-5 shadow-md">
      {/* Header */}
      <View className="flex-row items-start justify-between">
        <View className="flex-1 gap-1">
          <Text className="font-sans-semibold text-foreground text-base">
            Night Portions
          </Text>

          <Text className="text-muted-foreground font-sans text-xs">
            {isToday
              ? "From sunset until Fajr"
              : `Night · ${formatDayMonth(selectedDate)}`}
          </Text>
        </View>

        {status && (
          <View className={clsx("rounded-full px-3 py-1.5", status.className)}>
            <Text
              className={clsx(
                "font-sans-semibold text-xs",
                status.textClassName,
              )}
            >
              {status.label}
            </Text>
          </View>
        )}
      </View>

      {/* Night summary */}
      <View className="flex-row items-end">
        <View className="flex-1 gap-0.5">
          <Text className="text-muted-foreground font-sans text-xs">
            Sunset
          </Text>

          <Text className="font-sans-semibold text-foreground text-base">
            {formatTime(sunset)}
          </Text>
        </View>

        <View className="items-center gap-0.5">
          <Text className="text-muted-foreground font-sans text-xs">Night</Text>

          <Text className="font-sans-semibold text-primary text-base">
            {formatDuration(nightDuration)}
          </Text>
        </View>

        <View className="flex-1 items-end gap-0.5">
          <Text className="text-muted-foreground font-sans text-xs">Fajr</Text>

          <Text className="font-sans-semibold text-foreground text-base">
            {formatTime(fajr)}
          </Text>
        </View>
      </View>

      {/* Portions */}
      <View className="border-border overflow-hidden rounded-2xl border">
        {/* First third */}
        <View
          className={clsx("px-4 py-3.5", isFirstThird && "bg-primary-soft")}
        >
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

        {/* Second third */}
        <View
          className={clsx("px-4 py-3.5", isSecondThird && "bg-primary-soft")}
        >
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

        {/* Last third */}
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

      {/* Last third details */}
      <View className="border-border flex-row items-center justify-between border-t pt-4">
        <View className="flex-1 gap-0.5">
          <Text className="text-muted-foreground font-sans text-xs">
            {lastThirdLabel}
          </Text>

          <Text className="font-sans-semibold text-foreground text-sm">
            {formatTime(new Date(lastThirdStart))}
          </Text>
        </View>

        <View className="items-end gap-0.5">
          <Text className="text-muted-foreground font-sans text-xs">
            Duration
          </Text>

          <Text className="font-sans-semibold text-primary text-sm">
            {formatDuration(lastThirdEnd - lastThirdStart)}
          </Text>
        </View>
      </View>

      {/* Live status */}
      {isToday && !isBeforeNight && !isAfterNight && (
        <Text className="text-muted-foreground text-center font-sans text-xs">
          {isLastThird
            ? "You are currently in the last third of the night."
            : `Last third begins in ${formatRemainingDuration(
                lastThirdStart - nowTime,
              )}.`}
        </Text>
      )}

      {/* Tahajjud */}
      <View className="border-border gap-3 border-t pt-4">
        <View className="flex-row items-start gap-3">
          <View className="bg-primary-soft h-9 w-9 items-center justify-center rounded-full">
            <AntDesign name="moon" size={17} className="text-primary" />
          </View>

          <View className="flex-1 gap-1">
            <Text className="font-sans-semibold text-foreground text-sm">
              Tahajjud
            </Text>

            <Text className="text-muted-foreground font-sans text-xs leading-5">
              Voluntary night prayer traditionally associated with waking after
              sleep.
            </Text>
          </View>
        </View>

        <View className="bg-muted rounded-xl px-4 py-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 gap-0.5">
              <Text className="text-muted-foreground font-sans text-xs">
                Night prayer window
              </Text>

              <Text className="font-sans-semibold text-foreground text-sm">
                {formatTime(sunset)} – {formatTime(fajr)}
              </Text>
            </View>

            <View className="items-end gap-0.5">
              <Text className="text-muted-foreground font-sans text-xs">
                Duration
              </Text>

              <Text className="font-sans-semibold text-primary text-sm">
                {formatDuration(nightPrayerDuration)}
              </Text>
            </View>
          </View>
        </View>

        <Text className="text-muted-foreground font-sans text-xs leading-5">
          Tahajjud is performed during the night after sleeping and waking for
          prayer. The last third of the night is a particularly significant time
          for voluntary worship.
        </Text>
      </View>
    </View>
  );
};

export default NightPortions;
