import i18n from "@/i18n";

type LocaleConfig = {
  intlLocale: string;
  hour12: boolean;
};

type MonthFormat = "short" | "long";

const LOCALE_CONFIGS: Record<string, LocaleConfig> = {
  en: { intlLocale: "en-US", hour12: true },
  ru: { intlLocale: "ru-RU", hour12: false },
};

const fallbackLanguage =
  typeof i18n.options.fallbackLng === "string"
    ? i18n.options.fallbackLng
    : "en";

const DEFAULT_LOCALE_CONFIG =
  LOCALE_CONFIGS[fallbackLanguage] ?? LOCALE_CONFIGS.en;

function getLocaleConfig(language: string): LocaleConfig {
  return LOCALE_CONFIGS[language] ?? DEFAULT_LOCALE_CONFIG;
}

function capitalizeFirst(text: string, locale: string) {
  if (!text) return text;
  return text.charAt(0).toLocaleUpperCase(locale) + text.slice(1);
}

/**
 * Formats a Date into a localized weekday, day, and month string.
 *
 * Example:
 * "Thursday, 13 Feb"
 */
export function formatDate(
  date: Date,
  language = i18n.language,
  monthFormat: MonthFormat = "short",
) {
  const { intlLocale } = getLocaleConfig(language);
  const isEnglish = language === "en";

  const formatted = date.toLocaleDateString(intlLocale, {
    weekday: "long",
    day: "numeric",
    month: isEnglish ? "short" : monthFormat,
  });

  return capitalizeFirst(formatted, intlLocale);
}

/**
 * Formats a Date into a localized day and month string.
 *
 * Example:
 * "13 Feb"
 */
export function formatDayMonth(date: Date, language = i18n.language) {
  const { intlLocale } = getLocaleConfig(language);

  return date.toLocaleDateString(intlLocale, {
    day: "numeric",
    month: "short",
  });
}

/**
 * Formats a Date into a localized abbreviated weekday.
 *
 * Example:
 * "Thu"
 */
export function formatWeekday(date: Date, language = i18n.language) {
  const { intlLocale } = getLocaleConfig(language);

  return date.toLocaleDateString(intlLocale, {
    weekday: "short",
  });
}

/**
 * Formats a Date into a localized month and year string.
 *
 * Example:
 * "September 2026"
 */
export function formatMonthYear(date: Date, language = i18n.language) {
  const { intlLocale } = getLocaleConfig(language);

  const formatted = date.toLocaleDateString(intlLocale, {
    month: "long",
    year: "numeric",
  });

  return capitalizeFirst(formatted, intlLocale);
}

/**
 * Formats a Date into a localized Hijri calendar date.
 *
 * Uses the Islamic calendar provided by the Intl API.
 *
 * Example:
 * "14 Sha'ban 1446 AH"
 */
export function formatHijriDate(date: Date, language = i18n.language) {
  const { intlLocale } = getLocaleConfig(language);

  const formatted = new Intl.DateTimeFormat(`${intlLocale}-u-ca-islamic`, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  const withoutEra = formatted.replace(/(\s*(AH|г\.))+\s*$/i, "").trim();

  const match = withoutEra.match(/^(\d+)\s+(.+?)\s+(\d+)$/);

  if (!match) {
    // Unexpected shape - return as-is rather than risk mangling it.
    return `${withoutEra} ${i18n.t("hijri.era")}`;
  }

  const [, day, month, year] = match;
  const capitalizedMonth = capitalizeFirst(month, intlLocale);

  return `${day} ${capitalizedMonth} ${year} ${i18n.t("hijri.era")}`;
}

/**
 * Formats a Date into a localized 12-hour time string.
 *
 * Example:
 * "5:42 AM"
 */
export function formatTime(date: Date, language = i18n.language) {
  const { intlLocale, hour12 } = getLocaleConfig(language);

  return date.toLocaleTimeString(intlLocale, {
    hour: "numeric",
    minute: "2-digit",
    hour12,
  });
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
 * 2 minutes → "2 mins"
 * 1 hour → "1 hr"
 * 2 hours → "2 hrs"
 * 2 hours 30 minutes → "2 hrs 30 mins"
 */
export function formatDuration(milliseconds: number) {
  const totalMinutes = Math.max(0, Math.ceil(milliseconds / 60_000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return i18n.t("duration.minute", { count: minutes });
  if (minutes === 0) return i18n.t("duration.hour", { count: hours });

  return `${i18n.t("duration.hour", { count: hours })} ${i18n.t("duration.minute", { count: minutes })}`;
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
 * Formats a number into a localized currency string.
 *
 * Example:
 * 1234.56 → "$1,234.56"
 */
export const formatAmount = (amount: number, currency = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Formats a distance in kilometers into a localized string.
 *
 * Example:
 * 1234.56 → "1,235"
 */
export const formatDistance = (distanceKm: number): string => {
  return Math.round(distanceKm).toLocaleString();
};
