import { useEffect, useRef } from "react";

import type { FormEvent } from "react";

type MainPageNowDialogProps = {
  isOpen: boolean;
  mode: "add" | "edit";
  title: string;
  description: string;
  isSubmitting: boolean;
  onOpenChange: (open: boolean) => void;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

// Side drawer for adding or editing a Now item (only rendered for signed-in users).
export const MainPageNowDialog = ({
  isOpen,
  mode,
  title,
  description,
  isSubmitting,
  onOpenChange,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
}: MainPageNowDialogProps) => {
  const isEditMode = mode === "edit";
  const titleInputRef = useRef<HTMLInputElement>(null);
  const onOpenChangeRef = useRef(onOpenChange);

  useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  });

  // Focus the first field when the drawer opens; Escape closes it.
  useEffect(() => {
    if (!isOpen) return;

    titleInputRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChangeRef.current(false);
    };
    document.addEventListener("keydown", handleKey);

    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="drawer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="now-dialog-title"
    >
      <button
        type="button"
        className="drawer-backdrop"
        aria-label="Close"
        onClick={() => onOpenChange(false)}
      />
      <div className="drawer-panel">
        <div className="cell label lav">
          <span className="n">Now</span>
          <h2 id="now-dialog-title">
            {isEditMode ? "Edit update" : "New update"}
          </h2>
          <p>Shows up in the Now section on the home page.</p>
        </div>
        <div className="cell">
          <form className="drawer-form" onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="now-title">Title</label>
              <input
                ref={titleInputRef}
                id="now-title"
                value={title}
                onChange={(event) => onTitleChange(event.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="now-description">Description</label>
              <textarea
                id="now-description"
                value={description}
                onChange={(event) => onDescriptionChange(event.target.value)}
                rows={5}
                required
              />
            </div>
            <div className="ctas">
              <button type="submit" className="btn" disabled={isSubmitting}>
                {isSubmitting
                  ? "Saving…"
                  : isEditMode
                    ? "Save changes"
                    : "Post update"}
              </button>
              <button
                type="button"
                className="btn o"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
