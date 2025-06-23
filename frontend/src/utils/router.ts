import { createBrowserRouter } from "react-router";

import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
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
]);
