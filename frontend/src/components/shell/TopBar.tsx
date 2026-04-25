import { Icon } from "@/components/icon";
import { Link } from "react-router";

type TopBarProps = {
  date: string;
  time: string;
  isDark: boolean;
  onToggleTheme: () => void;
  sticky?: boolean;
  navHref?: string;
  navLabel?: string;
};

export const TopBar = ({
  date,
  time,
  isDark,
  onToggleTheme,
  sticky = false,
  navHref,
  navLabel,
}: TopBarProps) => {
  return (
    <nav
      className={`${sticky ? "sticky top-0 z-30" : ""} flex items-center justify-between border-b-4 px-4 py-3 md:px-8`}
      style={{ borderColor: "var(--ink)", background: "var(--bg)" }}
    >
      <div className="syne text-xl font-extrabold">★ RON/B.CO</div>
      <div className="flex items-center gap-3 text-xs">
        <span className="tag">
          <Icon name="clock" className="mr-1 inline size-3" />
          {time}
        </span>
        <span className="tag hidden md:inline-block">
          <Icon name="calendar" className="mr-1 inline size-3" />
          {date}
        </span>
        {navHref && navLabel ? (
          <Link to={navHref} className="btn text-xs">
            {navLabel}
          </Link>
        ) : null}
        <button
          type="button"
          className="btn text-xs"
          onClick={onToggleTheme}
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        >
          <span aria-hidden="true">{isDark ? "☼" : "☾"}</span>
        </button>
      </div>
    </nav>
  );
};
