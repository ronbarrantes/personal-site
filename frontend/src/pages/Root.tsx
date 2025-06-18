import { useEffect } from "react";

import { Outlet } from "react-router";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useAuthStatus } from "@/hooks/use-api";
import { useAuthStore } from "@/store/use-auth";

export const Root = () => {
  const { me } = useAuthStatus();
  const { setIsAuth } = useAuthStore();

  console.log("VITE BACKEND URL = ", import.meta.env.VITE_BACKEND_URL);

  useEffect(() => {
    const data = me.get.data;
    if (data) setIsAuth(true);
  }, [me.get.data, me.get.error, setIsAuth]);

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
