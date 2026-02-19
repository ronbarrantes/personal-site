import { useEffect } from "react";
import { Outlet } from "react-router";

import { MainLayout } from "@/components/MainLayout";
import { useAuthStatus } from "@/hooks/use-api";
import { useAuthStore } from "@/store/use-auth";

export const Root = () => {
  const { me } = useAuthStatus();
  const { setIsAuth } = useAuthStore();

  useEffect(() => {
    const data = me.get.data;
    if (data) setIsAuth(true);
  }, [me.get.data, me.get.error, setIsAuth]);

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};
