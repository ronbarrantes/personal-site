import { createBrowserRouter } from "react-router";

import { MainLogin } from "@/pages/MainLogin";
import { MainPage } from "@/pages/MainPage";

export const router = createBrowserRouter([
  { path: "/", Component: MainPage },
  { path: "/login", Component: MainLogin },
]);
