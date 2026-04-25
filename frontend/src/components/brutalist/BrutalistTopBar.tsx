import { Icon } from "@/components/icon";

type BrutalistTopBarProps = {
  date: string;
  time: string;
  isDark: boolean;
  onToggleTheme: () => void;
  sticky?: boolean;
};

export const BrutalistTopBar = ({
  date,
  time,
  isDark,
  onToggleTheme,
  sticky = false,
}: BrutalistTopBarProps) => {
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
        <button type="button" className="btn text-xs" onClick={onToggleTheme}>
          {isDark ? "☼" : "☾"}
        </button>
      </div>
    </nav>
  );
};
