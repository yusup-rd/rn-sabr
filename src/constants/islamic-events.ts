export interface IslamicEvent {
  month: number;
  day: number;
  name: string;
  description?: string;
}

/**
 * Common Islamic calendar observances.
 *
 * These dates are based on the Hijri calendar.
 *
 * Note:
 * Islamic observances can differ between communities
 * and calendar/moon-sighting conventions.
 */
export const islamicEvents: IslamicEvent[] = [
  {
    month: 1,
    day: 1,
    name: "Islamic New Year",
  },
  {
    month: 1,
    day: 10,
    name: "Ashura",
  },
  {
    month: 1,
    day: 12,
    name: "Mawlid",
  },
  {
    month: 8,
    day: 15,
    name: "Laylat al-Bara'at",
  },
  {
    month: 9,
    day: 1,
    name: "Start of Ramadan",
  },
  {
    month: 9,
    day: 27,
    name: "Laylat al-Qadr",
  },
  {
    month: 10,
    day: 1,
    name: "Eid al-Fitr",
  },
  {
    month: 12,
    day: 9,
    name: "Day of Arafah",
  },
  {
    month: 12,
    day: 10,
    name: "Eid al-Adha",
  },
];
