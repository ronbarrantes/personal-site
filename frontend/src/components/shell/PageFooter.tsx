import type { ReactNode } from "react";

type PageFooterProps = {
  children: ReactNode;
};

export const PageFooter = ({ children }: PageFooterProps) => {
  return (
    <footer
      className="border-t-4 p-4 text-center text-xs tracking-[0.2em] uppercase"
      style={{
        borderColor: "var(--ink)",
        background: "var(--ink)",
        color: "var(--bg)",
      }}
    >
      {children}
    </footer>
  );
};
