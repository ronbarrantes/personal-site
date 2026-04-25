import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { MainLoginAuthenticatedCard } from "@/components/main-login/MainLoginAuthenticatedCard";
import { MainLoginFormCard } from "@/components/main-login/MainLoginFormCard";
import { PageFooter } from "@/components/shell/PageFooter";
import { PageShell } from "@/components/shell/PageShell";
import { TopBar } from "@/components/shell/TopBar";
import { useTheme } from "@/components/theme-provider/theme-provider-state";
import { loginApi, queryKeys, useIsAuthenticated } from "@/hooks/use-api";
import { useClock } from "@/hooks/use-clock";
import { tryCatch } from "@/utils/try-catch";

export const MainLogin = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { date, time } = useClock();
  const { isAuth, isAuthResolved } = useIsAuthenticated();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isDark = resolvedTheme === "dark";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;

    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      toast.error("USER ID IS REQUIRED");
      return;
    }

    setLoading(true);
    const { error } = await tryCatch(
      loginApi.login({ username: trimmedUsername, password }),
    );
    setLoading(false);

    if (error) {
      toast.error("ACCESS DENIED");
      setPassword("");
      return;
    }

    await queryClient.invalidateQueries({ queryKey: [queryKeys.ME] });
    navigate("/");
  };

  const handleLogout = async () => {
    if (loading) return;

    setLoading(true);
    const { error } = await tryCatch(loginApi.logout());
    setLoading(false);

    if (error) {
      toast.error("SIGN OUT FAILED");
      return;
    }

    queryClient.setQueryData([queryKeys.ME], null);
    await queryClient.invalidateQueries({ queryKey: [queryKeys.ME] });
    setUsername("");
    setPassword("");
  };

  return (
    <PageShell isDark={isDark}>
      <div className="relative z-10 flex min-h-screen flex-col">
        <TopBar
          date={date}
          time={time}
          theme={theme}
          onSetTheme={setTheme}
        />
        <div className="flex flex-1 items-center justify-center px-4 py-16">
          {!isAuthResolved ? null : isAuth ? (
            <MainLoginAuthenticatedCard
              isLoading={loading}
              onLogout={handleLogout}
              onGoHome={() => navigate("/")}
            />
          ) : (
            <MainLoginFormCard
              username={username}
              password={password}
              isLoading={loading}
              onSubmit={handleLogin}
              onUsernameChange={setUsername}
              onPasswordChange={setPassword}
            />
          )}
        </div>
        <PageFooter>© {new Date().getFullYear()} RON BARRANTES</PageFooter>
      </div>
    </PageShell>
  );
};
