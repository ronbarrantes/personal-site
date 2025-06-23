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
