import type { ReactNode } from "react";

import { SiteHeader } from "./SiteHeader";

type SiteShellProps = {
  children: ReactNode;
};

// Header, main landmark and footer shared by every page.
export const SiteShell = ({ children }: SiteShellProps) => {
  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Ron Barrantes</span>
        <span>ronb.co</span>
      </footer>
    </div>
  );
};
