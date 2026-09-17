import {
  formatDayMonth,
  formatDuration,
  formatRemainingDuration,
  formatTime,
} from "@/lib/format";
import { useTheme } from "@/providers/ThemeProvider";
import { Text, View } from "react-native";
import { Circle, Path, Svg } from "react-native-svg";

interface DaylightArcProps {
  sunrise: Date;
  sunset: Date;
  now: Date;
  isToday: boolean;
  selectedDate: Date;
}

const VIEWBOX_WIDTH = 320;
const VIEWBOX_HEIGHT = 180;

const START_X = 24;
const END_X = VIEWBOX_WIDTH - 24;
const BASE_Y = 138;
const CONTROL_X = VIEWBOX_WIDTH / 2;
const CONTROL_Y = 24;

function getArcPoint(progress: number) {
  const t = Math.min(1, Math.max(0, progress));
  const inverse = 1 - t;

  return {
    x:
      inverse * inverse * START_X + 2 * inverse * t * CONTROL_X + t * t * END_X,

    y:
      inverse * inverse * BASE_Y + 2 * inverse * t * CONTROL_Y + t * t * BASE_Y,
  };
}

function getPartialArcPath(progress: number) {
  const steps = Math.max(1, Math.ceil(progress * 60));

  const points = Array.from({ length: steps + 1 }, (_, index) =>
    getArcPoint((progress * index) / steps),
  );

  return points
    .map((point, index) =>
      index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`,
    )
    .join(" ");
}

const DaylightArc = ({
  sunrise,
  sunset,
  now,
  isToday,
  selectedDate,
}: DaylightArcProps) => {
  const { colors } = useTheme();

  const sunriseTime = sunrise.getTime();
  const sunsetTime = sunset.getTime();
  const nowTime = now.getTime();

  const daylightDuration = sunsetTime - sunriseTime;

  const rawProgress =
    daylightDuration > 0 ? (nowTime - sunriseTime) / daylightDuration : 0;

  const isBeforeSunrise = nowTime < sunriseTime;
  const isAfterSunset = nowTime > sunsetTime;
  const isDaytime = !isBeforeSunrise && !isAfterSunset;

  const progress = Math.min(1, Math.max(0, rawProgress));

  const sunPosition = getArcPoint(progress);

  const remainingDaylight = Math.max(0, sunsetTime - nowTime);

  const daylightProgress = Math.min(100, Math.max(0, progress * 100));

  const arcPath = `
    M ${START_X} ${BASE_Y}
    Q ${CONTROL_X} ${CONTROL_Y}
      ${END_X} ${BASE_Y}
  `;

  /*
   * Non-today view
   *
   * We don't show the dynamic arc because there is no
   * meaningful "current progress" for another date.
   */
  if (!isToday) {
    return (
      <View className="bg-card rounded-2xl p-5 shadow-md">
        <View className="gap-1">
          <Text className="font-sans-semibold text-foreground text-base">
            Daylight · {formatDayMonth(selectedDate)}
          </Text>

          <Text className="text-muted-foreground font-sans text-xs">
            Sun's journey across the sky
          </Text>
        </View>

        <View className="mt-5 flex-row items-center justify-between">
          <View className="gap-0.5">
            <Text className="text-muted-foreground font-sans text-xs">
              Sunrise
            </Text>

            <Text className="font-sans-semibold text-foreground text-base">
              {formatTime(sunrise)}
            </Text>
          </View>

          <View className="items-center gap-0.5">
            <Text className="text-muted-foreground font-sans text-xs">
              Daylight
            </Text>

            <Text className="font-sans-semibold text-primary text-base">
              {formatDuration(daylightDuration)}
            </Text>
          </View>

          <View className="items-end gap-0.5">
            <Text className="text-muted-foreground font-sans text-xs">
              Sunset
            </Text>

            <Text className="font-sans-semibold text-foreground text-base">
              {formatTime(sunset)}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  /*
   * Today view
   */
  return (
    <View className="bg-card rounded-2xl p-5 shadow-md">
      <View className="flex-row items-center justify-between">
        <View className="gap-1">
          <Text className="font-sans-semibold text-foreground text-base">
            Daylight
          </Text>

          <Text className="text-muted-foreground font-sans text-xs">
            Sun's journey across the sky
          </Text>
        </View>

        <View className="bg-primary-soft rounded-full px-3 py-1.5">
          <Text className="font-sans-semibold text-primary text-xs">
            {isDaytime
              ? `${Math.round(daylightProgress)}%`
              : isBeforeSunrise
                ? "Before sunrise"
                : "After sunset"}
          </Text>
        </View>
      </View>

      <View>
        <Svg
          width="100%"
          height={180}
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        >
          <Path
            d={arcPath}
            fill="none"
            stroke={colors.border}
            strokeWidth={3}
            strokeLinecap="round"
          />

          {isDaytime && (
            <Path
              d={getPartialArcPath(progress)}
              fill="none"
              stroke={colors.primary}
              strokeWidth={4}
              strokeLinecap="round"
            />
          )}

          <Circle cx={START_X} cy={BASE_Y} r={5} fill={colors.secondary} />

          <Circle cx={END_X} cy={BASE_Y} r={5} fill={colors.secondary} />

          {isDaytime && (
            <>
              <Circle
                cx={sunPosition.x}
                cy={sunPosition.y}
                r={18}
                fill={colors.secondary}
                opacity={0.12}
              />

              <Circle
                cx={sunPosition.x}
                cy={sunPosition.y}
                r={11}
                fill={colors.secondary}
                opacity={0.22}
              />

              <Circle
                cx={sunPosition.x}
                cy={sunPosition.y}
                r={7}
                fill={colors.secondary}
              />
            </>
          )}
        </Svg>

        <View className="flex-row justify-between px-1">
          <View className="gap-0.5">
            <Text className="font-sans-semibold text-foreground text-sm">
              {formatTime(sunrise)}
            </Text>

            <Text className="text-muted-foreground font-sans text-xs">
              Sunrise
            </Text>
          </View>

          <View className="items-end gap-0.5">
            <Text className="font-sans-semibold text-foreground text-sm">
              {formatTime(sunset)}
            </Text>

            <Text className="text-muted-foreground font-sans text-xs">
              Sunset
            </Text>
          </View>
        </View>
      </View>

      <View className="border-border mt-4 flex-row items-center justify-between border-t pt-4">
        <View className="gap-0.5">
          <Text className="text-muted-foreground font-sans text-xs">
            Current time
          </Text>

          <Text className="font-sans-semibold text-foreground text-sm">
            {formatTime(now)}
          </Text>
        </View>

        <View className="items-end gap-0.5">
          <Text className="text-muted-foreground font-sans text-xs">
            {isDaytime
              ? "Daylight remaining"
              : isBeforeSunrise
                ? "Until sunrise"
                : "Daylight ended"}
          </Text>

          {isDaytime || isBeforeSunrise ? (
            <Text className="font-sans-semibold text-primary text-sm">
              {formatRemainingDuration(
                isBeforeSunrise ? sunriseTime - nowTime : remainingDaylight,
              )}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default DaylightArc;
