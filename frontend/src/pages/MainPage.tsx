import type { FormEvent } from "react";
import { useState } from "react";

import { toast } from "sonner";

import { BrutalistFooter } from "@/components/brutalist/BrutalistFooter";
import { BrutalistPageShell } from "@/components/brutalist/BrutalistPageShell";
import { BrutalistTopBar } from "@/components/brutalist/BrutalistTopBar";
import { MainPageContactSection } from "@/components/main-page/MainPageContactSection";
import { MainPageHero } from "@/components/main-page/MainPageHero";
import { MainPageMarquee } from "@/components/main-page/MainPageMarquee";
import { MainPageNowSection } from "@/components/main-page/MainPageNowSection";
import { MainPagePortfolioSection } from "@/components/main-page/MainPagePortfolioSection";
import { MainPageWorkSection } from "@/components/main-page/MainPageWorkSection";
import { useTheme } from "@/components/theme-provider/theme-provider-state";
import type { NowData } from "@/hooks/use-api";
import { useIsAuthenticated, useRoutes } from "@/hooks/use-api";
import { useClock } from "@/hooks/use-clock";

export const MainPage = () => {
  const { theme, setTheme } = useTheme();
  const { date, time } = useClock();
  const { api } = useRoutes();
  const { isAuth } = useIsAuthenticated();
  const nowData = api.now.get.data || [];
  const isDark = theme === "dark";

  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const handleAddNow = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (api.now.post.isPending) return;

    const title = newTitle.trim();
    const desc = newDesc.trim();

    if (!title || !desc) {
      toast.error("TITLE AND DESCRIPTION ARE REQUIRED");
      return;
    }

    api.now.post.mutate(
      { body: { title, desc } },
      {
        onSuccess: () => {
          setShowModal(false);
          setNewTitle("");
          setNewDesc("");
        },
        onError: () => toast.error("FAILED TO POST"),
      }
    );
  };

  const handleDeleteNow = (item: NowData) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;

    api.now.delete.mutate(item.id, {
      onError: () => toast.error("FAILED TO DELETE"),
    });
  };

  return (
    <BrutalistPageShell isDark={isDark}>
      <div className="relative z-10">
        <BrutalistTopBar
          date={date}
          time={time}
          isDark={isDark}
          onToggleTheme={() => setTheme(isDark ? "light" : "dark")}
          sticky
        />
        <MainPageMarquee />
        <MainPageHero />
        <MainPageNowSection
          isAuth={isAuth}
          isDark={isDark}
          items={nowData}
          showModal={showModal}
          title={newTitle}
          description={newDesc}
          isPosting={api.now.post.isPending}
          onOpenChange={setShowModal}
          onTitleChange={setNewTitle}
          onDescriptionChange={setNewDesc}
          onSubmit={handleAddNow}
          onDelete={handleDeleteNow}
        />
        <MainPageWorkSection />
        <MainPagePortfolioSection />
        <MainPageContactSection />
        <BrutalistFooter>
          {new Date().getFullYear()} RON BARRANTES — BUILT WITH LOVE
        </BrutalistFooter>
      </div>
    </BrutalistPageShell>
  );
};
