import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme-provider/theme-provider-state";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type ModeToggleProps = {
  buttonClassName?: string;
  menuClassName?: string;
  itemClassName?: string;
};

export function ModeToggle({
  buttonClassName,
  menuClassName,
  itemClassName,
}: ModeToggleProps) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-fit w-fit p-1" asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "rounded-xl bg-slate-100/10 hover:bg-slate-100 hover:text-orange-500 dark:hover:bg-slate-900/60 dark:hover:text-cyan-300",
            buttonClassName
          )}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn("glass border", menuClassName)}
      >
        <DropdownMenuItem
          className={cn(itemClassName)}
          onClick={() => setTheme("light")}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(itemClassName)}
          onClick={() => setTheme("dark")}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(itemClassName)}
          onClick={() => setTheme("system")}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
