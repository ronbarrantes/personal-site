import { useEffect, useState } from "react";

import { ThemeProviderContext } from "./theme-provider-context";
import type { Theme, ThemeProviderProps } from "./theme-provider-types";

const isTheme = (value: string | null): value is Theme =>
  value === "dark" || value === "light" || value === "system";

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme(storageKey: string, defaultTheme: Theme) {
  const storedTheme = localStorage.getItem(storageKey);

  return isTheme(storedTheme) ? storedTheme : defaultTheme;
}

function resolveTheme(theme: Theme) {
  return theme === "system" ? getSystemTheme() : theme;
}

function persistTheme(theme: Theme, storageKey: string) {
  if (theme === "system") {
    localStorage.removeItem(storageKey);
    document.cookie = `${storageKey}=; Path=/; Max-Age=0; SameSite=Lax`;
    return;
  }

  localStorage.setItem(storageKey, theme);
  document.cookie = `${storageKey}=${theme}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  initialResolvedTheme,
  initialTheme,
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    return initialTheme ?? defaultTheme;
  });
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">(() => {
    return initialResolvedTheme ?? "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const storedTheme = getStoredTheme(storageKey, defaultTheme);

    if (!initialTheme && storedTheme !== theme) {
      // Sync the client state with localStorage after SSR-provided initial state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(storedTheme);
      return;
    }

    const applyTheme = (nextTheme: Theme) => {
      const activeTheme = resolveTheme(nextTheme);

      root.classList.remove("light", "dark");
      root.classList.add(activeTheme);
      root.style.colorScheme = activeTheme;
      setResolvedTheme(activeTheme);
    };

    applyTheme(theme);
    persistTheme(theme, storageKey);

    if (theme !== "system") return;

    const handleChange = () => {
      applyTheme("system");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [defaultTheme, initialTheme, storageKey, theme]);

  const value = {
    theme,
    resolvedTheme,
    setTheme: (theme: Theme) => {
      persistTheme(theme, storageKey);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
