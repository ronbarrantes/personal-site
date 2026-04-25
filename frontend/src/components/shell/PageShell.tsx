import type { ReactNode } from "react";

import { bruStyles } from "@/styles/bru-styles";

type PageShellProps = {
  children: ReactNode;
  isDark: boolean;
};

export const PageShell = ({
  children,
  isDark,
}: PageShellProps) => {
  return (
    <>
      <style>{bruStyles}</style>
      <div className={`bru ${isDark ? "dark" : ""}`}>{children}</div>
    </>
  );
};
