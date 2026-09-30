const DAY_MS = 24 * 60 * 60 * 1000;

/** Start of the UTC calendar day that contains `date`. */
function utcDay(date: Date): number {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

/**
 * Formats `date` relative to `now` in calendar days: "today", "yesterday",
 * "3 days ago", "2 weeks ago", "5 months ago", "1 year ago".
 */
export function formatRelativeDate(date: Date, now: Date = new Date(), locale = 'en'): string {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const days = Math.round((utcDay(date) - utcDay(now)) / DAY_MS);
  const abs = Math.abs(days);

  if (abs < 7) return rtf.format(days, 'day');
  if (abs < 30) return rtf.format(Math.trunc(days / 7), 'week');
  if (abs < 365) return rtf.format(Math.trunc(days / 30), 'month');
  return rtf.format(Math.trunc(days / 365), 'year');
}

/** Full date for tooltips and `<time datetime>` attributes. */
export function formatAbsoluteDate(date: Date, locale = 'en'): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(date) + ' UTC';
}
