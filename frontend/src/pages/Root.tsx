import { Outlet } from "react-router";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const Root = () => {
  console.log("VITE BACKEND URL = ", import.meta.env.VITE_BACKEND_URL);

  return (
    <div className="relative flex h-screen flex-col overflow-hidden">
      <Header className="fixed top-0 left-0 z-20 w-full" />
      <main className="container mx-auto flex-1 px-2">
        <Outlet />
      </main>
      <Footer className="fixed bottom-0 left-0 z-20 w-full" />
    </div>
  );
};
