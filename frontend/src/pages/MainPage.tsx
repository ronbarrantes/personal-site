import { useState } from "react";

import type { FormEvent } from "react";
import { toast } from "sonner";

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
import type { NowData } from "@/hooks/use-api";
import { useIsAuthenticated, useRoutes } from "@/hooks/use-api";
import { useClock } from "@/hooks/use-clock";

export const MainPage = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { date, time } = useClock();
  const { api } = useRoutes();
  const { isAuth, isAuthResolved } = useIsAuthenticated();
  const nowData = api.now.get.data || [];
  const isDark = resolvedTheme === "dark";
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<NowData | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const dialogMode = editingItem ? "edit" : "add";
  const isSubmitting = api.now.post.isPending || api.now.put.isPending;

  const resetNowForm = () => {
    setShowModal(false);
    setEditingItem(null);
    setNewTitle("");
    setNewDesc("");
  };

  const handleOpenChange = (open: boolean) => {
    setShowModal(open);
    if (!open) {
      setEditingItem(null);
      setNewTitle("");
      setNewDesc("");
    }
  };

  const handleAddNow = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const title = newTitle.trim();
    const desc = newDesc.trim();

    if (!title || !desc) {
      toast.error("TITLE AND DESCRIPTION ARE REQUIRED");
      return;
    }

    if (editingItem) {
      api.now.put.mutate(
        { id: editingItem.id, body: { title, desc } },
        {
          onSuccess: resetNowForm,
          onError: () => toast.error("FAILED TO SAVE"),
        }
      );
      return;
    }

    api.now.post.mutate(
      { body: { title, desc } },
      {
        onSuccess: resetNowForm,
        onError: () => toast.error("FAILED TO POST"),
      }
    );
  };

  const handleEditNow = (item: NowData) => {
    setEditingItem(item);
    setNewTitle(item.title);
    setNewDesc(item.desc);
    setShowModal(true);
  };

  const handleDeleteNow = (item: NowData) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;

    api.now.delete.mutate(item.id, {
      onError: () => toast.error("FAILED TO DELETE"),
    });
  };

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
          isAuth={isAuthResolved && isAuth}
          isDark={isDark}
          items={nowData}
          showModal={showModal}
          dialogMode={dialogMode}
          title={newTitle}
          description={newDesc}
          isSubmitting={isSubmitting}
          onOpenChange={handleOpenChange}
          onTitleChange={setNewTitle}
          onDescriptionChange={setNewDesc}
          onSubmit={handleAddNow}
          onEdit={handleEditNow}
          onDelete={handleDeleteNow}
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
