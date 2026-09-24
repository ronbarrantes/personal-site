"use client";

import { Icon } from "@/components/icon";
import { useTheme } from "@/components/theme-provider/theme-provider-state";

// Flips between light and dark. Until the visitor picks, the page follows the
// system setting (ThemeProvider's "system" default).
export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      className="mode"
      aria-label="Dark mode"
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Icon name={isDark ? "sun" : "moon"} />
    </button>
  );
};
