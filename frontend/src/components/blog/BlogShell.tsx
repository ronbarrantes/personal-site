import type { ReactNode } from "react";

import { SiteShell } from "@/components/shell/SiteShell";

type BlogShellProps = {
  children: ReactNode;
};

export const BlogShell = ({ children }: BlogShellProps) => {
  return <SiteShell>{children}</SiteShell>;
};
