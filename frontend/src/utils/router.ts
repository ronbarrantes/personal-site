import { createBrowserRouter } from "react-router";

import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { DesignBrutalist } from "@/pages/designs/DesignBrutalist";
import { DesignDeco } from "@/pages/designs/DesignDeco";
import { DesignEditorial } from "@/pages/designs/DesignEditorial";
import { DesignOrganic } from "@/pages/designs/DesignOrganic";
import { DesignsIndex } from "@/pages/designs/DesignsIndex";
import { DesignTerminal } from "@/pages/designs/DesignTerminal";
import { MainLogin } from "@/pages/MainLogin";
import { MainPage } from "@/pages/MainPage";
import { Portfolio } from "@/pages/Portfolio";
import { Resume } from "@/pages/Resume";
import { Root } from "@/pages/Root";

export const router = createBrowserRouter([
  { path: "/", Component: MainPage },
  { path: "/login", Component: MainLogin },
  {
    Component: Root,
    children: [
      { path: "/about", Component: About },
      { path: "/resume", Component: Resume },
      { path: "/portfolio", Component: Portfolio },
      { path: "/contact", Component: Contact },
    ],
  },
  { path: "/designs", Component: DesignsIndex },
  { path: "/designs/terminal", Component: DesignTerminal },
  { path: "/designs/editorial", Component: DesignEditorial },
  { path: "/designs/brutalist", Component: DesignBrutalist },
  { path: "/designs/deco", Component: DesignDeco },
  { path: "/designs/organic", Component: DesignOrganic },
]);
