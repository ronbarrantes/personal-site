import type { CSSProperties, FormEvent } from "react";

import { sections } from "@/data/text";
import type { NowData } from "@/hooks/use-api";
import { MainPageNowCard } from "./MainPageNowCard";
import { MainPageNowDialog } from "./MainPageNowDialog";

const ITEMS_PER_ROW = 3;
const MAX_ITEMS = 6;

type MainPageNowSectionProps = {
  isAuth: boolean;
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
  const visibleItems = items.slice(0, MAX_ITEMS);
  const rows = Math.max(1, Math.ceil(visibleItems.length / ITEMS_PER_ROW));
  // Empty cells that finish the last desktop row so no gap shows through.
  const fillerCount =
    visibleItems.length > 0
      ? (ITEMS_PER_ROW - (visibleItems.length % ITEMS_PER_ROW)) % ITEMS_PER_ROW
      : 0;

  return (
    <section className="sheet" aria-labelledby="now-h">
      <div
        className="cell c-3 label lav now-label"
        style={{ "--now-rows": rows } as CSSProperties}
      >
        <span className="n">01</span>
        <h2 id="now-h">{sections.now.title}</h2>
        <p>{sections.now.sub}</p>
        {isAuth && (
          <div className="label-actions">
            <button
              type="button"
              className="btn sm"
              onClick={() => onOpenChange(true)}
            >
              + Add update
            </button>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="cell c-9 now-state" role="status">
          <span className="bar" aria-hidden="true" />
          Loading the latest updates. The server can take about 30 seconds to
          wake up.
        </div>
      ) : visibleItems.length === 0 ? (
        <div className="cell c-9 now-state">Nothing posted yet.</div>
      ) : (
        <>
          {visibleItems.map((item) => (
            <MainPageNowCard
              key={item.id}
              item={item}
              isAuth={isAuth}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
          {Array.from({ length: fillerCount }, (_, index) => (
            <div key={index} className="cell c-3 now-filler" aria-hidden="true" />
          ))}
        </>
      )}

      {isAuth && (
        <MainPageNowDialog
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
    </section>
  );
};
