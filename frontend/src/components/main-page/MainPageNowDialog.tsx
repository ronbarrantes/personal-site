import type { FormEvent } from "react";

type MainPageNowDialogProps = {
  isDark: boolean;
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

export const MainPageNowDialog = ({
  isDark,
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

  return (
    <>
      {!isEditMode && (
        <button
          type="button"
          className="tag cursor-pointer"
          style={{
            background: "var(--accent)",
            color: "var(--alt)",
          }}
          onClick={() => onOpenChange(true)}
        >
          + ADD NOW
        </button>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex justify-end"
          aria-modal="true"
          role="dialog"
          aria-labelledby="now-dialog-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label={`Close ${isEditMode ? "edit" : "add"} now dialog`}
            onClick={() => onOpenChange(false)}
          />

          <div
            className={`bru ${isDark ? "dark" : ""} relative z-[101] flex h-screen w-full max-w-md flex-col gap-0 border-0 p-0`}
            style={{
              borderLeft: "4px solid var(--ink)",
              boxShadow: "-8px 0 0 var(--accent)",
            }}
          >
            <div
              className="stripe px-6 py-3"
              style={{ borderBottom: "4px solid var(--ink)" }}
            >
              <div
                className="tag"
                style={{ background: "var(--accent)", color: "var(--alt)" }}
              >
                {isEditMode ? "EDIT // NOW" : "NEW // NOW"}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-6">
                <h3 id="now-dialog-title" className="text-4xl">
                  {isEditMode ? "EDIT ITEM" : "ADD ITEM"}
                  <span style={{ color: "var(--accent)" }}>.</span>
                </h3>
                <p className="sr-only">
                  {isEditMode
                    ? "Edit an existing NOW item with a title and description."
                    : "Add a new NOW item with a title and description."}
                </p>
              </div>

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
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? isEditMode
                        ? "SAVING..."
                        : "POSTING..."
                      : isEditMode
                        ? "SAVE IT →"
                        : "POST IT →"}
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
          </div>
        </div>
      )}
    </>
  );
};
