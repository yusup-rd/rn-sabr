import { formatDuration, formatDurationClock, formatTime } from "@/lib/format";
import { calculatePrayerTimes } from "@/lib/prayer-calculations";
import { usePrayerStore } from "@/store/prayerStore";
import { useEffect, useMemo, useState } from "react";

type Prayer = {
  name: string;
  time: Date;
  formattedTime: string;
};

function toPrayer(name: string, time: Date): Prayer {
  return {
    name,
    time,
    formattedTime: formatTime(time),
  };
}

/**
 * Calculates the prayer and solar times for a specific date.
 *
 * This keeps the Adhan-specific calculation logic separate from
 * the logic that determines the current/next prayer.
 */
function getPrayerTimesForDate(
  date: Date,
  latitude: number,
  longitude: number,
  calculationMethod: Parameters<typeof calculatePrayerTimes>[3],
  asrMethod: Parameters<typeof calculatePrayerTimes>[4],
) {
  const times = calculatePrayerTimes(
    latitude,
    longitude,
    date,
    calculationMethod,
    asrMethod,
  );

  return {
    prayers: [
      toPrayer("Fajr", times.fajr),
      toPrayer("Dhuhr", times.dhuhr),
      toPrayer("Asr", times.asr),
      toPrayer("Maghrib", times.maghrib),
      toPrayer("Isha", times.isha),
    ],
    sunrise: times.sunrise,
    sunset: times.sunset,
  };
}

export function usePrayerTimes() {
  const { calculationMethod, asrMethod, latitude, longitude } =
    usePrayerStore();

  // Update the current time every second so countdowns and progress stay live.
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const data = useMemo(() => {
    if (latitude == null || longitude == null) {
      return {
        previousPrayer: null,
        nextPrayer: null,
        countdown: "00:00:00",
        elapsedPercent: 0,
        solarEvent: null,
      };
    }

    // We need adjacent days to handle the periods before Fajr and after Isha.
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayData = getPrayerTimesForDate(
      now,
      latitude,
      longitude,
      calculationMethod,
      asrMethod,
    );

    const yesterdayData = getPrayerTimesForDate(
      yesterday,
      latitude,
      longitude,
      calculationMethod,
      asrMethod,
    );

    const tomorrowData = getPrayerTimesForDate(
      tomorrow,
      latitude,
      longitude,
      calculationMethod,
      asrMethod,
    );

    const todayPrayers = todayData.prayers;

    let previousPrayer: Prayer;
    let nextPrayer: Prayer;

    const nextTodayPrayer = todayPrayers.find(
      (prayer) => prayer.time.getTime() > now.getTime(),
    );

    const previousTodayPrayer = [...todayPrayers]
      .reverse()
      .find((prayer) => prayer.time.getTime() <= now.getTime());

    if (nextTodayPrayer) {
      nextPrayer = nextTodayPrayer;

      // Before Fajr, the previous prayer is yesterday's Isha.
      previousPrayer =
        previousTodayPrayer ?? toPrayer("Isha", yesterdayData.prayers[4].time);
    } else {
      // After Isha, the next prayer is tomorrow's Fajr.
      nextPrayer = tomorrowData.prayers[0];
      previousPrayer = todayPrayers[4];
    }

    // Calculate progress through the current prayer interval.
    const intervalStart = previousPrayer.time.getTime();
    const intervalEnd = nextPrayer.time.getTime();

    const intervalDuration = intervalEnd - intervalStart;
    const elapsed = now.getTime() - intervalStart;

    const elapsedPercent =
      intervalDuration > 0
        ? Math.min(100, Math.max(0, (elapsed / intervalDuration) * 100))
        : 0;

    // Determine the next upcoming solar event.
    // Before sunrise → today's sunrise.
    // Between sunrise and sunset → today's sunset.
    // After sunset → tomorrow's sunrise.
    const isBeforeSunrise = now.getTime() < todayData.sunrise.getTime();

    const isBeforeSunset = now.getTime() < todayData.sunset.getTime();

    let solarEvent: {
      label: "Sunrise" | "Sunset";
      time: Date;
    };

    if (isBeforeSunrise) {
      solarEvent = {
        label: "Sunrise",
        time: todayData.sunrise,
      };
    } else if (isBeforeSunset) {
      solarEvent = {
        label: "Sunset",
        time: todayData.sunset,
      };
    } else {
      solarEvent = {
        label: "Sunrise",
        time: tomorrowData.sunrise,
      };
    }

    const solarEventRemaining = solarEvent.time.getTime() - now.getTime();

    return {
      previousPrayer,
      nextPrayer,
      countdown: formatDurationClock(nextPrayer.time.getTime() - now.getTime()),
      elapsedPercent,
      solarEvent: {
        label: solarEvent.label,
        remainingFormatted: formatDuration(solarEventRemaining),
      },
    };
  }, [now, latitude, longitude, calculationMethod, asrMethod]);

  return data;
}
