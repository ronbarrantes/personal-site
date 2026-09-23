import { contactEmail } from "@/data/text";

// Pre-fills the subject so job and project emails are easy to tell apart.
export const mailto = (subject?: string) =>
  `mailto:${contactEmail}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
