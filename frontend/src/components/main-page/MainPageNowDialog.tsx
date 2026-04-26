import type { FormEvent } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type MainPageNowDialogProps = {
  isDark: boolean;
  isOpen: boolean;
  title: string;
  description: string;
  isPosting: boolean;
  onOpenChange: (open: boolean) => void;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const MainPageNowDialog = ({
  isDark,
  isOpen,
  title,
  description,
  isPosting,
  onOpenChange,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
}: MainPageNowDialogProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="tag cursor-pointer"
          style={{
            background: "var(--accent)",
            color: "var(--alt)",
          }}
        >
          + ADD NOW
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className={`bru ${isDark ? "dark" : ""} flex flex-col gap-0 border-0 p-0 sm:max-w-md`}
        style={{
          borderLeft: "4px solid var(--ink)",
          boxShadow: "-8px 0 0 var(--accent)",
        }}
      >
        <div
          className="stripe px-6 py-3"
          style={{ borderBottom: "4px solid var(--ink)" }}
        >
          <div className="tag" style={{ background: "var(--accent)", color: "var(--alt)" }}>
            NEW // NOW
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <SheetHeader className="mb-6 p-0">
            <SheetTitle asChild>
              <h3 className="text-4xl">
                ADD ITEM
                <span style={{ color: "var(--accent)" }}>.</span>
              </h3>
            </SheetTitle>
            <SheetDescription className="sr-only">
              Add a new NOW item with a title and description.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={onSubmit}>
            <div className="mb-5">
              <label htmlFor="now-title" className="tag mb-2 block">
                TITLE
              </label>
              <input
                id="now-title"
                value={title}
                onChange={(event) => onTitleChange(event.target.value)}
                placeholder="WHAT ARE YOU ON..."
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="now-description" className="tag mb-2 block">
                DESCRIPTION
              </label>
              <textarea
                id="now-description"
                value={description}
                onChange={(event) => onDescriptionChange(event.target.value)}
                placeholder="TELL ME MORE..."
                rows={5}
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="btn flex-1 justify-center"
                disabled={isPosting}
              >
                {isPosting ? "POSTING..." : "POST IT →"}
              </button>
              <button
                type="button"
                className="btn btn-alt"
                onClick={() => onOpenChange(false)}
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};
