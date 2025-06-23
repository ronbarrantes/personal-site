import { RouterProvider } from "react-router";

import { ThemeProvider } from "@/components/theme-provider/theme-provider-provider";
import { Toaster } from "@/components/ui/sonner";
import { router } from "@/utils/router";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
