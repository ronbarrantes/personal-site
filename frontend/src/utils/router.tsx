import { createBrowserRouter } from "react-router";

import { RouteErrorBoundary } from "@/components/shell/RouteErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <RouteErrorBoundary />,
    lazy: async () => {
      const { MainPage } = await import("@/pages/MainPage");

      return { Component: MainPage };
    },
  },
  {
    path: "/login",
    errorElement: <RouteErrorBoundary />,
    lazy: async () => {
      const { MainLogin } = await import("@/pages/MainLogin");

      return { Component: MainLogin };
    },
  },
]);
