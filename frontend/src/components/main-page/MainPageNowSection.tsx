import type { FormEvent } from "react";

import type { NowData } from "@/hooks/use-api";
import { MainPageNowCard } from "./MainPageNowCard";
import { MainPageNowDialog } from "./MainPageNowDialog";

type MainPageNowSectionProps = {
  isAuth: boolean;
  isDark: boolean;
  items: NowData[];
  showModal: boolean;
  dialogMode: "add" | "edit";
  title: string;
  description: string;
  isSubmitting: boolean;
  isLoading: boolean;
  onOpenChange: (open: boolean) => void;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onEdit: (item: NowData) => void;
  onDelete: (item: NowData) => void;
};

export const MainPageNowSection = ({
  isAuth,
  isDark,
  items,
  showModal,
  dialogMode,
  title,
  description,
  isSubmitting,
  isLoading,
  onOpenChange,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
  onEdit,
  onDelete,
}: MainPageNowSectionProps) => {
  const visibleItems = items.slice(0, 6);

  return (
    <section
      className="border-y-4"
      style={{ borderColor: "var(--ink)", background: "var(--ink)" }}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div
          className="mb-6 flex items-end justify-between"
          style={{ color: "var(--bg)" }}
        >
          <h2 className="text-6xl md:text-8xl">
            NOW<span style={{ color: "var(--accent)" }}>.</span>
          </h2>
          <div className="flex items-center gap-3">
            <div
              className="tag"
              style={{ background: "var(--bg)", color: "var(--ink)" }}
            >
              {visibleItems.length} ITEMS
            </div>
            {isAuth && (
              <MainPageNowDialog
                isDark={isDark}
                isOpen={showModal}
                mode={dialogMode}
                title={title}
                description={description}
                isSubmitting={isSubmitting}
                onOpenChange={onOpenChange}
                onTitleChange={onTitleChange}
                onDescriptionChange={onDescriptionChange}
                onSubmit={onSubmit}
              />
            )}
          </div>
        </div>
        {isLoading && (
          <div className="mb-4 text-sm tracking-[0.15em]" style={{ color: "var(--bg)" }}>
            FETCHING LATEST UPDATES… (COLD START CAN TAKE ~30S)
          </div>
        )}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <MainPageNowCard
              key={item.id}
              item={item}
              isAuth={isAuth}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
          {items.length === 0 && (
            <div
              className="text-center text-xl md:col-span-2 lg:col-span-3"
              style={{ color: "var(--bg)" }}
            >
              [ NO_DATA ]
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
