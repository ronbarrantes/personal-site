import { createBrowserRouter } from "react-router";

import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { DesignBrutalist } from "@/pages/DesignBrutalist";
import { DesignBrutalistMoss } from "@/pages/DesignBrutalistMoss";
import { DesignBrutalistSlate } from "@/pages/DesignBrutalistSlate";
import { DesignRoot } from "@/pages/DesignRoot";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Portfolio } from "@/pages/Portfolio";
import { Resume } from "@/pages/Resume";
import { Root } from "@/pages/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "resume", Component: Resume },
      { path: "portfolio", Component: Portfolio },
      { path: "contact", Component: Contact },
      { path: "login", Component: Login },
    ],
  },
  {
    path: "/designs",
    Component: DesignRoot,
    children: [
      { index: true, Component: DesignBrutalist },
      { path: "brutalist", Component: DesignBrutalist },
      { path: "brutalist/slate", Component: DesignBrutalistSlate },
      { path: "brutalist/moss", Component: DesignBrutalistMoss },
    ],
  },
]);
