import { Icon } from "@/components/icon";

type TopBarProps = {
  date: string;
  time: string;
  theme: "light" | "dark" | "system";
  isDark: boolean;
  onToggleTheme: () => void;
  sticky?: boolean;
};

const THEME_LABELS: Record<"light" | "dark" | "system", string> = {
  system: "◉ SYS",
  dark: "☼ DRK",
  light: "☾ LGT",
};

export const TopBar = ({
  date,
  time,
  theme,
  isDark,
  onToggleTheme,
  sticky = false,
}: TopBarProps) => {
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
        <button
          type="button"
          className="btn text-xs"
          onClick={onToggleTheme}
          aria-label={`Current theme: ${theme}. Click to cycle theme.`}
        >
          <span aria-hidden="true">{THEME_LABELS[theme]}</span>
        </button>
      </div>
    </nav>
  );
};
