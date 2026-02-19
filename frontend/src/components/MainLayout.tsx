import { NavLink } from "react-router";

import { Icon } from "@/components/icon";
import { ModeToggle } from "@/components/mode-toggle";
import { useClock } from "@/hooks/use-clock";
import { MAIN_THEME } from "@/lib/brutalist-theme";

  const l = MAIN_THEME.light;
  const d = MAIN_THEME.dark;

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { date, time } = useClock();

  return (
    <div
      className={`flex min-h-screen w-full flex-col font-['Sora',sans-serif] ${l.root} ${d.root}`}
    >
      <div className="flex w-full flex-1 flex-col px-6 py-8 lg:px-12 lg:py-10">
        <header
          className={`mb-10 flex flex-wrap items-start justify-between gap-6 border-b-2 pb-8 lg:mb-14 lg:pb-10 ${l.borderMuted} ${d.borderMuted}`}
        >
          <div>
            <NavLink
              to="/"
              className={`block text-3xl font-semibold tracking-tight lg:text-4xl ${l.textAccent} ${d.textAccent} hover:opacity-90`}
            >
              Welcome to my site
            </NavLink>
            <p className="mt-2 max-w-2xl text-base opacity-90">
              I'm glad you found it. Explore the sections below for updates, work
              history, and projects.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-4 text-sm opacity-60">
              <span className="flex items-center gap-1.5">
                <Icon name="calendar" className="size-4" />
                {date}
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="clock" className="size-4" />
                {time}
              </span>
            </span>
            <ModeToggle
              buttonClassName={`border bg-transparent ${l.linkMain} ${d.linkMain}`}
              menuClassName={`${l.root} ${d.root} ${l.borderMuted} ${d.borderMuted}`}
              itemClassName={`${l.textAccent} ${d.textAccent} hover:bg-emerald-700/10 focus:bg-emerald-700/10 dark:hover:bg-white/5 dark:focus:bg-white/5`}
            />
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}
