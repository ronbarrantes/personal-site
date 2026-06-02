import { useEffect, useState } from "react";

import { ThemeProviderContext } from "./theme-provider-context";
import type { Theme, ThemeProviderProps } from "./theme-provider-types";

const isTheme = (value: string | null) =>
  value === "dark" || value === "light" || value === "system";

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    // The stored preference is only available after the server-rendered shell hydrates.
    const storedTheme = localStorage.getItem(storageKey);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(isTheme(storedTheme) ? storedTheme : defaultTheme);
  }, [defaultTheme, storageKey]);

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
      if (theme === "system") {
        localStorage.removeItem(storageKey);
      } else {
        localStorage.setItem(storageKey, theme);
      }

      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
