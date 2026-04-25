import type { ReactNode } from "react";

import { bruStyles } from "@/styles/bru-styles";

type BrutalistPageShellProps = {
  children: ReactNode;
  isDark: boolean;
};

export const BrutalistPageShell = ({
  children,
  isDark,
}: BrutalistPageShellProps) => {
  return (
    <>
      <style>{bruStyles}</style>
      <div className={`bru ${isDark ? "dark" : ""}`}>{children}</div>
    </>
  );
};
