export type Theme = {
  root: string;
  borderAccent: string;
  borderMuted: string;
  textAccent: string;
  textMuted: string;
  linkMain: string;
  linkOther: string;
  cardBorder: string;
  workBorder: string;
};

export const MAIN_THEME: { light: Theme; dark: Theme } = {
  light: {
    root: "bg-[#f0f4ef] text-[#1a2418]",
    borderAccent: "border-emerald-700",
    borderMuted: "border-emerald-800/40",
    textAccent: "text-emerald-800",
    textMuted: "text-emerald-800/60",
    linkMain: "border-emerald-700 text-emerald-800 hover:bg-emerald-700/10",
    linkOther: "border-emerald-800/40 text-[#1a2418] opacity-70 hover:opacity-100",
    cardBorder: "border-emerald-600/30",
    workBorder: "border-emerald-600/50",
  },
  dark: {
    root: "dark:bg-[#1a1814] dark:text-[#e8e4dc]",
    borderAccent: "dark:border-amber-500",
    borderMuted: "dark:border-amber-700/50",
    textAccent: "dark:text-amber-400",
    textMuted: "dark:text-amber-600/80",
    linkMain: "dark:border-amber-400 dark:text-amber-400 dark:hover:bg-white/5",
    linkOther: "dark:border-amber-700/50 dark:text-[#e8e4dc] dark:opacity-70 dark:hover:opacity-100",
    cardBorder: "dark:border-amber-500/30",
    workBorder: "dark:border-amber-500/50",
  },
};
