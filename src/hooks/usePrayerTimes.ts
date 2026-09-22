import { prayerMetadata } from "@/constants/prayers";
import {
  formatDuration,
  formatDurationClock,
  formatRemainingDuration,
  formatTime,
} from "@/lib/format";
import { calculatePrayerTimes } from "@/lib/prayer-calculations";
import { useLocationStore } from "@/store/locationStore";
import { usePrayerStore } from "@/store/prayerStore";
import type { Prayer, PrayerName, PrayerStatus } from "@/types/prayer";
import { useEffect, useMemo, useState } from "react";

const TEST_CURRENT_TIME = false;
const TEST_HOUR = 13;
const TEST_MINUTE = 0;

const prayerNames: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

function getNow() {
  if (TEST_CURRENT_TIME) {
    const date = new Date();
    date.setHours(TEST_HOUR, TEST_MINUTE, 0, 0);
    return date;
  }

  return new Date();
}

function getPrayerTime(
  name: PrayerName,
  times: ReturnType<typeof calculatePrayerTimes>,
) {
  switch (name) {
    case "Fajr":
      return times.fajr;

    case "Dhuhr":
      return times.dhuhr;

    case "Asr":
      return times.asr;

    case "Maghrib":
      return times.maghrib;

    case "Isha":
      return times.isha;
  }
}

function getPrayerData(
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

  const prayers: Prayer[] = prayerNames.map((name) => {
    const time = getPrayerTime(name, times);
    const metadata = prayerMetadata[name];

    return {
      name,
      time,
      formattedTime: formatTime(time),
      description: metadata.description,
      icon: metadata.icon,
      status: "upcoming",
    };
  });

  return {
    prayers,
    sunrise: times.sunrise,
    sunset: times.sunset,
  };
}

export function usePrayerTimes(selectedDate?: Date) {
  const calculationMethod = usePrayerStore((state) => state.calculationMethod);
  const asrMethod = usePrayerStore((state) => state.asrMethod);
  const latitude = useLocationStore((state) => state.latitude);
  const longitude = useLocationStore((state) => state.longitude);

  const [now, setNow] = useState(getNow);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(getNow());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const todayKey = [now.getFullYear(), now.getMonth(), now.getDate()].join("-");

  const selectedKey = selectedDate
    ? [
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
      ].join("-")
    : todayKey;

  const calculatedData = useMemo(() => {
    if (latitude == null || longitude == null) {
      return null;
    }

    const [todayYear, todayMonth, todayDay] = todayKey.split("-").map(Number);

    const [selectedYear, selectedMonth, selectedDay] = selectedKey
      .split("-")
      .map(Number);

    const currentDate = new Date(todayYear, todayMonth, todayDay);

    const selectedDateValue = new Date(
      selectedYear,
      selectedMonth,
      selectedDay,
    );

    const yesterday = new Date(currentDate);
    yesterday.setDate(yesterday.getDate() - 1);

    const tomorrow = new Date(currentDate);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const selectedNextDay = new Date(selectedDateValue);
    selectedNextDay.setDate(selectedNextDay.getDate() + 1);

    return {
      yesterday: getPrayerData(
        yesterday,
        latitude,
        longitude,
        calculationMethod,
        asrMethod,
      ),

      today: getPrayerData(
        currentDate,
        latitude,
        longitude,
        calculationMethod,
        asrMethod,
      ),

      tomorrow: getPrayerData(
        tomorrow,
        latitude,
        longitude,
        calculationMethod,
        asrMethod,
      ),

      selected: getPrayerData(
        selectedDateValue,
        latitude,
        longitude,
        calculationMethod,
        asrMethod,
      ),

      selectedNextDay: getPrayerData(
        selectedNextDay,
        latitude,
        longitude,
        calculationMethod,
        asrMethod,
      ),
    };
  }, [
    todayKey,
    selectedKey,
    latitude,
    longitude,
    calculationMethod,
    asrMethod,
  ]);

  return useMemo(() => {
    if (!calculatedData) {
      return {
        prayers: [],
        selectedPrayers: [],
        selectedSunrise: null,
        selectedSunset: null,
        selectedNextFajr: null,
        previousPrayer: null,
        nextPrayer: null,
        countdown: "00:00:00",
        elapsedPercent: 0,
        sunrise: null,
        sunset: null,
        now,
        solarEvent: null,
      };
    }

    const { yesterday, today, tomorrow, selected, selectedNextDay } =
      calculatedData;

    const nextTodayPrayer = today.prayers.find(
      (prayer) => prayer.time.getTime() > now.getTime(),
    );

    const previousTodayPrayer = [...today.prayers]
      .reverse()
      .find((prayer) => prayer.time.getTime() <= now.getTime());

    let previousPrayer: Prayer;
    let nextPrayer: Prayer;

    if (nextTodayPrayer) {
      nextPrayer = nextTodayPrayer;

      previousPrayer = previousTodayPrayer ?? yesterday.prayers[4];
    } else {
      nextPrayer = tomorrow.prayers[0];
      previousPrayer = today.prayers[4];
    }

    const prayers = today.prayers.map((prayer) => {
      let status: PrayerStatus = "upcoming";

      if (prayer.time.getTime() <= now.getTime()) {
        status = "completed";
      }

      const isNextPrayerToday =
        prayer.time.getTime() === nextPrayer.time.getTime();

      if (isNextPrayerToday) {
        status = "soon";
      }

      return {
        ...prayer,
        status,
        remainingFormatted: isNextPrayerToday
          ? formatRemainingDuration(prayer.time.getTime() - now.getTime())
          : undefined,
      };
    });

    const intervalStart = previousPrayer.time.getTime();

    const intervalEnd = nextPrayer.time.getTime();

    const intervalDuration = intervalEnd - intervalStart;

    const elapsed = now.getTime() - intervalStart;

    const elapsedPercent =
      intervalDuration > 0
        ? Math.min(100, Math.max(0, (elapsed / intervalDuration) * 100))
        : 0;

    const isBeforeSunrise = now.getTime() < today.sunrise.getTime();

    const isBeforeSunset = now.getTime() < today.sunset.getTime();

    let solarEvent: {
      label: "Sunrise" | "Sunset";
      time: Date;
    };

    if (isBeforeSunrise) {
      solarEvent = {
        label: "Sunrise",
        time: today.sunrise,
      };
    } else if (isBeforeSunset) {
      solarEvent = {
        label: "Sunset",
        time: today.sunset,
      };
    } else {
      solarEvent = {
        label: "Sunrise",
        time: tomorrow.sunrise,
      };
    }

    return {
      prayers,
      selectedPrayers: selected.prayers,
      selectedSunrise: selected.sunrise,
      selectedSunset: selected.sunset,
      selectedNextFajr:
        selectedNextDay.prayers.find((prayer) => prayer.name === "Fajr")
          ?.time ?? null,
      previousPrayer,
      nextPrayer,
      countdown: formatDurationClock(nextPrayer.time.getTime() - now.getTime()),
      elapsedPercent,
      sunrise: today.sunrise,
      sunset: today.sunset,
      now,
      solarEvent: {
        label: solarEvent.label,
        remainingFormatted: formatDuration(
          solarEvent.time.getTime() - now.getTime(),
        ),
      },
    };
  }, [calculatedData, now]);
}
