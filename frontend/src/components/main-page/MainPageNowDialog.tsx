import type { FormEvent } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
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
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className={`bru ${isDark ? "dark" : ""} box max-h-[calc(100dvh-2rem)] max-w-md overflow-y-auto border-0 p-6 shadow-none`}
      >
        <div className="tag mb-4">NEW // NOW</div>
        <DialogTitle asChild>
          <h3 className="mb-5 text-3xl">
            ADD ITEM
            <span style={{ color: "var(--accent)" }}>.</span>
          </h3>
        </DialogTitle>
        <DialogDescription className="sr-only">
          Add a new NOW item with a title and description.
        </DialogDescription>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
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
          <div className="mb-5">
            <label htmlFor="now-description" className="tag mb-2 block">
              DESCRIPTION
            </label>
            <textarea
              id="now-description"
              value={description}
              onChange={(event) => onDescriptionChange(event.target.value)}
              placeholder="TELL ME MORE..."
              rows={3}
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
      </DialogContent>
    </Dialog>
  );
};
