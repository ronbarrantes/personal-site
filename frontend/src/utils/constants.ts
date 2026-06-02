export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  (() => {
    throw new Error("NEXT_PUBLIC_BACKEND_URL environment variable is required");
  })();

export const MINUTE = 1000 * 60;
