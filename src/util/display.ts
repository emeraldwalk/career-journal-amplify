/**
 * MM-DD format
 */
export function monthAndDay(
  isoDateStr: string
) {
  return isoDateStr.substr(5);
}