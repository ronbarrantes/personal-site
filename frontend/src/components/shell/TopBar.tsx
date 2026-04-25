import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/icon";

type Theme = "light" | "dark" | "system";

type TopBarProps = {
  date: string;
  time: string;
  theme: Theme;
  onSetTheme: (theme: Theme) => void;
  sticky?: boolean;
};

const THEME_OPTIONS: { value: Theme; icon: "sun" | "moon" | "monitor"; label: string }[] = [
  { value: "light", icon: "sun", label: "Light" },
  { value: "dark", icon: "moon", label: "Dark" },
  { value: "system", icon: "monitor", label: "System" },
];

const THEME_ICON: Record<Theme, "sun" | "moon" | "monitor"> = {
  light: "sun",
  dark: "moon",
  system: "monitor",
};

export const TopBar = ({
  date,
  time,
  theme,
  onSetTheme,
  sticky = false,
}: TopBarProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <nav
      className={`${sticky ? "sticky top-0 z-30" : ""} flex items-center justify-between border-b-4 px-4 py-3 md:px-8`}
      style={{ borderColor: "var(--ink)", background: "var(--bg)" }}
    >
      <div className="syne text-xl font-extrabold">★ RON/B.CO</div>
      <div className="flex items-center gap-3 text-xs">
        <div className="flex flex-col items-end gap-1 md:flex-row">
          <span className="tag">
            <Icon name="clock" className="mr-1 inline size-3" />
            {time}
          </span>
          <span className="tag">
            <Icon name="calendar" className="mr-1 inline size-3" />
            {date}
          </span>
        </div>

        <div className="relative" ref={ref}>
          <button
            type="button"
            className="btn flex items-center justify-center p-2"
            aria-label={`Theme: ${theme}`}
            aria-haspopup="true"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={THEME_ICON[theme]} className="size-4" />
          </button>

          {open && (
            <div
              className="absolute right-0 top-full z-50 mt-1 flex flex-col overflow-hidden border-2"
              style={{
                borderColor: "var(--ink)",
                background: "var(--bg)",
              }}
            >
              {THEME_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className="flex items-center gap-2 px-3 py-2 text-xs font-bold transition-colors"
                  style={{
                    color: theme === opt.value ? "var(--bg)" : "var(--ink)",
                    background: theme === opt.value ? "var(--ink)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (theme !== opt.value) {
                      (e.currentTarget as HTMLButtonElement).style.background = "var(--ink)";
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--bg)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (theme !== opt.value) {
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--ink)";
                    }
                  }}
                  onClick={() => {
                    onSetTheme(opt.value);
                    setOpen(false);
                  }}
                  aria-label={`Set theme to ${opt.label}`}
                >
                  <Icon name={opt.icon} className="size-3.5" />
                  <span>{opt.label.toUpperCase()}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
