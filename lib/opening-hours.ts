import { openingHours, timeZone, type DayHours } from '@/data/site';

export type OpenStatus = {
  isOpen: boolean;
  /** Minutes until the next open/close transition. */
  minutesUntilChange: number;
  /** What that next transition is. */
  next: { day: number; time: string; kind: 'open' | 'close' } | null;
  /** Hours for the day the visitor is asking about, if we have them. */
  today: DayHours | undefined;
};

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6
};

type ZonedParts = { day: number; minutes: number };

/**
 * Resolves the wall-clock time inside the café's own timezone, independent of
 * wherever the visitor or the server happens to be.
 */
export function getZonedParts(date: Date, zone = timeZone): ZonedParts {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: zone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(date);

  const read = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? '';

  const day = WEEKDAY_INDEX[read('weekday')] ?? 0;
  const hours = Number(read('hour'));
  const minutes = Number(read('minute'));

  return { day, minutes: hours * 60 + minutes };
}

function toMinutes(hhmm: string): number {
  const [hours, minutes] = hhmm.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * A range is "open" if the current time falls inside it. Ranges where
 * `close` is earlier than `open` (e.g. 17:00–02:00) are treated as
 * spilling past midnight and anchored to the previous day.
 */
export function isWithinRange(
  day: number,
  minutes: number,
  hours: DayHours
): boolean {
  if (hours.open === null || hours.close === null) return false;

  const open = toMinutes(hours.open);
  const close = toMinutes(hours.close);

  if (close > open) {
    return day === hours.day && minutes >= open && minutes < close;
  }

  // Overnight: belongs to the evening of `day`, running into the next day.
  if (day === hours.day) return minutes >= open;
  const nextDay = (hours.day + 1) % 7;
  return day === nextDay && minutes < close;
}

/** Which day a given minute-of-day falls on, for overnight spill-over. */
function owningDay(day: number, minutes: number): number {
  if (minutes < 6 * 60) return (day + 6) % 7;
  return day;
}

export function getOpenStatus(now: Date = new Date()): OpenStatus {
  const { day: rawDay, minutes } = getZonedParts(now);
  const day = owningDay(rawDay, minutes);

  const today = openingHours.find((entry) => entry.day === day);
  const isOpen = today ? isWithinRange(day, minutes, today) : false;

  // Walk forward through the coming week to find the next transition.
  const DAY_MINUTES = 24 * 60;

  for (let offset = 0; offset <= 8; offset += 1) {
    const candidateDay = (day + offset) % 7;
    const entry = openingHours.find((item) => item.day === candidateDay);
    if (!entry || entry.open === null || entry.close === null) continue;

    const openAt = offset * DAY_MINUTES + toMinutes(entry.open);
    let closeAt = offset * DAY_MINUTES + toMinutes(entry.close);

    // Overnight closing time lands on the following day.
    if (closeAt <= openAt) closeAt += DAY_MINUTES;

    if (isOpen && closeAt > minutes) {
      return {
        isOpen: true,
        minutesUntilChange: closeAt - minutes,
        next: { day: entry.day, time: entry.close, kind: 'close' },
        today
      };
    }

    if (!isOpen && openAt > minutes) {
      return {
        isOpen: false,
        minutesUntilChange: openAt - minutes,
        next: { day: entry.day, time: entry.open, kind: 'open' },
        today
      };
    }
  }

  return { isOpen: false, minutesUntilChange: 0, next: null, today };
}

/** Stable id for a weekday, e.g. 1 → "mon", for use as translation keys. */
export const weekdayKeys = [
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat'
] as const;

export type WeekdayKey = (typeof weekdayKeys)[number];

export function weekdayKey(day: number): WeekdayKey {
  return weekdayKeys[((day % 7) + 7) % 7];
}
