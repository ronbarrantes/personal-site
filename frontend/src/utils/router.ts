import { createBrowserRouter } from "react-router";

import { MainLogin } from "@/pages/MainLogin";
import { MainPage } from "@/pages/MainPage";
import { Root } from "@/pages/Root";

export const router = createBrowserRouter([
  { path: "/", Component: MainPage },
  { path: "/login", Component: MainLogin },
  {
    Component: Root,
    children: [],
  },
]);
