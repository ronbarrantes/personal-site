import { useEffect, useState } from "react";

import { ThemeProviderContext } from "./theme-provider-context";
import type { Theme, ThemeProviderProps } from "./theme-provider-types";

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">(
    () => (theme === "system" ? getSystemTheme() : theme)
  );

  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (nextTheme: Theme) => {
      const activeTheme =
        nextTheme === "system"
          ? mediaQuery.matches
            ? "dark"
            : "light"
          : nextTheme;

      root.classList.remove("light", "dark");
      root.classList.add(activeTheme);
      setResolvedTheme(activeTheme);
    };

    applyTheme(theme);

    if (theme !== "system") return;

    const handleChange = () => {
      applyTheme("system");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [theme]);

  const value = {
    theme,
    resolvedTheme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
