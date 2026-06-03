"use client";

import { MainPageContactSection } from "@/components/main-page/MainPageContactSection";
import { MainPageHero } from "@/components/main-page/MainPageHero";
import { MainPageMarquee } from "@/components/main-page/MainPageMarquee";
import { MainPageNowSection } from "@/components/main-page/MainPageNowSection";
import { MainPagePortfolioSection } from "@/components/main-page/MainPagePortfolioSection";
import { MainPageWorkSection } from "@/components/main-page/MainPageWorkSection";
import { PageFooter } from "@/components/shell/PageFooter";
import { PageShell } from "@/components/shell/PageShell";
import { TopBar } from "@/components/shell/TopBar";
import { useTheme } from "@/components/theme-provider/theme-provider-state";
import { useClock } from "@/hooks/use-clock";
import { useNowEditor } from "@/hooks/use-now-editor";

export const MainPage = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { date, time } = useClock();
  const nowEditor = useNowEditor();
  const isDark = resolvedTheme === "dark";

  return (
    <PageShell isDark={isDark}>
      <div className="relative z-10">
        <TopBar
          date={date}
          time={time}
          theme={theme}
          onSetTheme={setTheme}
          sticky
        />
        <MainPageMarquee />
        <MainPageHero />
        <MainPageNowSection
          {...nowEditor}
          isDark={isDark}
        />
        <MainPageWorkSection />
        <MainPagePortfolioSection />
        <MainPageContactSection />
        <PageFooter>
          {new Date().getFullYear()} RON BARRANTES — BUILT WITH LOVE
        </PageFooter>
      </div>
    </PageShell>
  );
};
