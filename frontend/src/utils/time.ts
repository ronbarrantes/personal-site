/**
 * Formats a number of seconds into a string in the format "MM:SS".
 * @param seconds - The number of seconds to format
 * @returns
 */
export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

/*
 * Formats a number of seconds into a human-readable string in the format "Xm Ys".
 * @param seconds - The number of seconds to format
 * */
export function formatTimeHumanReadable(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
}

/**
 * Formats an ISO 8601 date string (e.g., from Go's time.Time)
 * into a string in the format YYYY/MM/DD.
 *
 * @param isoDate - An ISO 8601 formatted date string (e.g. "2025-06-04T15:30:00Z")
 * @returns A formatted date string in "YYYY/MM/DD" format
 *
 * @example
 * formatDate("2025-06-04T15:30:00Z"); // "2025/06/04"
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}`;
}

/**
 * Formats a date as "Jun 2, 2026". Accepts "YYYY-MM-DD" or a full ISO string.
 * Uses UTC so server and client render the same text.
 */
export function formatShortDate(value: string): string {
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T12:00:00Z`)
    : new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "7/2023" → "Jul 2023" */
export function formatMonthYear(monthYear: string): string {
  const [month, year] = monthYear.split("/");
  if (!month || !year) return monthYear;

  return new Date(Date.UTC(Number(year), Number(month) - 1, 1)).toLocaleDateString(
    "en-US",
    { month: "short", year: "numeric", timeZone: "UTC" }
  );
}

/** "7/2023" → "2023-07" (for <time dateTime>) */
export function toMonthDateTime(monthYear: string): string | undefined {
  const [month, year] = monthYear.split("/");
  if (!month || !year) return undefined;

  return `${year}-${month.padStart(2, "0")}`;
}
