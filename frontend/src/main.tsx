import { lazy, StrictMode, Suspense } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";

import { queryClient } from "@/lib/query-client.ts";
import App from "./App.tsx";

import "./index.css";

const ReactQueryDevtools =
  import.meta.env.VITE_USE_REACT_QUERY_DEVTOOLS === "true"
    ? lazy(async () => {
        const mod = await import("@tanstack/react-query-devtools");

        return { default: mod.ReactQueryDevtools };
      })
    : null;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {ReactQueryDevtools ? (
        <Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
      ) : null}
    </QueryClientProvider>
  </StrictMode>
);
