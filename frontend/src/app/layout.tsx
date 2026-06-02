import type { Metadata } from "next";

import type { ReactNode } from "react";

import { Providers } from "@/app/providers";

import "@/index.css";

export const metadata: Metadata = {
  title: "RON/B.CO",
  description: "Personal site for Ron Barrantes",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon-144.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
