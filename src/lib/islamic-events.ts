import { islamicEvents, type IslamicEvent } from "@/constants/islamic-events";

export interface HijriDateParts {
  day: number;
  month: number;
  year: number;
}

/**
 * Returns the Hijri date components for a Gregorian Date.
 *
 * Uses the Islamic calendar provided by the Intl API.
 */
export function getHijriDateParts(date: Date): HijriDateParts {
  const formatter = new Intl.DateTimeFormat("en-US-u-ca-islamic", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const parts = formatter.formatToParts(date);

  return {
    day: Number(parts.find((part) => part.type === "day")?.value),
    month: Number(parts.find((part) => part.type === "month")?.value),
    year: Number(parts.find((part) => part.type === "year")?.value),
  };
}

/**
 * Finds an Islamic event occurring on the given
 * Hijri month and day.
 */
export function getIslamicEvent(
  hijriMonth: number,
  hijriDay: number,
): IslamicEvent | null {
  return (
    islamicEvents.find(
      (event) => event.month === hijriMonth && event.day === hijriDay,
    ) ?? null
  );
}

/**
 * Returns the Islamic event associated with a
 * Gregorian Date, if one exists.
 */
export function getIslamicEventForDate(date: Date): IslamicEvent | null {
  const hijri = getHijriDateParts(date);

  return getIslamicEvent(hijri.month, hijri.day);
}
