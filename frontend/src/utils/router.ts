import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const { MainPage } = await import("@/pages/MainPage");

      return { Component: MainPage };
    },
  },
  {
    path: "/login",
    lazy: async () => {
      const { MainLogin } = await import("@/pages/MainLogin");

      return { Component: MainLogin };
    },
  },
]);
