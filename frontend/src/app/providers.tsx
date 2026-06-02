"use client";

import { lazy, Suspense, useState } from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "@/components/theme-provider/theme-provider-provider";
import { Toaster } from "@/components/ui/sonner";
import { createQueryClient } from "@/lib/query-client";

const ReactQueryDevtools =
  process.env.NEXT_PUBLIC_USE_REACT_QUERY_DEVTOOLS === "true"
    ? lazy(async () => {
        const mod = await import("@tanstack/react-query-devtools");

        return { default: mod.ReactQueryDevtools };
      })
    : null;

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        {children}
        <Toaster />
      </ThemeProvider>
      {ReactQueryDevtools ? (
        <Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
      ) : null}
    </QueryClientProvider>
  );
}
