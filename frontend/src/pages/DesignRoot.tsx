import { Outlet } from "react-router";

import { DesignSwitcher } from "@/components/DesignSwitcher";

export const DesignRoot = () => {
  return (
    <div className="min-h-screen">
      <DesignSwitcher />
      <Outlet />
    </div>
  );
};
