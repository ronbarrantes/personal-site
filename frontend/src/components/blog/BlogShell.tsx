"use client";

import type { ReactNode } from "react";

import { PageFooter } from "@/components/shell/PageFooter";
import { PageShell } from "@/components/shell/PageShell";
import { TopBar } from "@/components/shell/TopBar";
import { useTheme } from "@/components/theme-provider/theme-provider-state";
import { useClock } from "@/hooks/use-clock";

type BlogShellProps = {
  children: ReactNode;
};

export const BlogShell = ({ children }: BlogShellProps) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { date, time } = useClock();

  return (
    <PageShell isDark={resolvedTheme === "dark"}>
      <div className="relative z-10 flex min-h-screen flex-col">
        <TopBar
          date={date}
          time={time}
          theme={theme}
          onSetTheme={setTheme}
          sticky
        />
        <main className="flex-1">{children}</main>
        <PageFooter>
          {new Date().getFullYear()} RON BARRANTES — BUILT WITH LOVE
        </PageFooter>
      </div>
    </PageShell>
  );
};
