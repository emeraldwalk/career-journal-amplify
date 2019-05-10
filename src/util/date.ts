/**
 * Create date from local date string.
 */
export function fromLocalDateStr(
  dateStr: string
): Date {
  const date = new Date(dateStr);
  return new Date(
    date.getTime() + timezoneOffsetMilliseconds(date)
  );
}

/**
 * Convert a given date to an ISO date string for the day.
 */
export function isoDayStr(
  date = new Date()
): string {
  return `${date.toISOString().substr(0, 10)}Z`;
}

/**
 * Return a local ISO string
 */
export function localISODateStr(
  date = new Date()
): string {
  return new Date(date.getTime() - timezoneOffsetMilliseconds(date))
    .toISOString()
    .replace(/Z$/, '');
}

export function timezoneOffsetMilliseconds(
  date = new Date()
) {
  return date.getTimezoneOffset() * 60 * 1000;
}

export function localISODayStr(
  date = new Date()
): string {
  return localISODateStr(date)
    .substr(0, 10);
}

/**
 * MM-DD format
 */
export function monthAndDay(
  isoDateStr: string
): string {
  return isoDateStr.substr(5, 5);
}