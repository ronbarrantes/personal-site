import { createBrowserRouter } from "react-router";

import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
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
]);
