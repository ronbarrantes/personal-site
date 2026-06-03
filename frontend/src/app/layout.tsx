import type { Metadata } from "next";
import { cookies } from "next/headers";

import type { ReactNode } from "react";

import { Providers } from "@/app/providers";
import type { Theme } from "@/components/theme-provider/theme-provider-types";

import "@/index.css";

const THEME_STORAGE_KEY = "vite-ui-theme";

const isResolvedTheme = (value: string | undefined): value is "dark" | "light" =>
  value === "dark" || value === "light";

export const metadata: Metadata = {
  title: "RON/B.CO",
  description: "Personal site for Ron Barrantes",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon-144.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const theme = (await cookies()).get(THEME_STORAGE_KEY)?.value;
  const initialResolvedTheme = isResolvedTheme(theme) ? theme : undefined;
  const initialTheme: Theme | undefined = initialResolvedTheme;

  return (
    <html
      lang="en"
      className={initialResolvedTheme}
      style={initialResolvedTheme ? { colorScheme: initialResolvedTheme } : undefined}
      suppressHydrationWarning
    >
      <body>
        <Providers
          initialResolvedTheme={initialResolvedTheme}
          initialTheme={initialTheme}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
