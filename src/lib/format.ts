/**
 * Formats a Date into a localized weekday, day, and month string.
 *
 * Example:
 * "Thursday, 13 Feb"
 */
export function formatDate(date: Date) {
  return date.toLocaleDateString([], {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
}

/**
 * Formats a Date into a localized Hijri calendar date.
 *
 * Uses the Islamic calendar provided by the Intl API.
 *
 * Example:
 * "14 Sha'ban 1446 AH"
 */
export function formatHijriDate(date: Date) {
  return new Intl.DateTimeFormat("en-US-u-ca-islamic", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * Formats a Date into a localized 12-hour time string.
 *
 * Example:
 * "5:42 AM"
 */
export function formatTime(date: Date) {
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Formats a duration in milliseconds into a human-readable
 * hours and minutes string.
 *
 * Examples:
 * 45 minutes → "45 mins"
 * 2 hours → "2 hrs"
 * 2 hours 30 minutes → "2 hrs 30 mins"
 */
export function formatDuration(milliseconds: number) {
  const totalMinutes = Math.max(0, Math.floor(milliseconds / 60_000));

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes} min${minutes === 1 ? "" : "s"}`;
  }

  if (minutes === 0) {
    return `${hours} hr${hours === 1 ? "" : "s"}`;
  }

  return `${hours} hr${hours === 1 ? "" : "s"} ${minutes} min`;
}

/**
 * Formats a duration in milliseconds as a digital countdown.
 *
 * Example:
 * 5056000 → "01:24:16"
 */
export function formatDurationClock(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
}

/**
 * Formats a remaining duration in milliseconds into a human-readable
 * hours and minutes string.
 *
 * Uses ceil() so any remaining seconds are displayed as at least 1 minute
 * instead of showing "0 min" before the target time is reached.
 *
 * Examples:
 * 45 seconds → "1 min"
 * 45 minutes → "45 mins"
 * 2 hours → "2 hrs"
 * 2 hours 30 minutes → "2 hrs 30 mins"
 */
export function formatRemainingDuration(milliseconds: number) {
  const totalMinutes = Math.max(0, Math.ceil(milliseconds / 60_000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes} min`;
  }

  if (minutes === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${minutes} min`;
}
