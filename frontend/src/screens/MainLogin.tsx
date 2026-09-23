"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";
import type { FormEvent } from "react";
import { toast } from "sonner";

import { MainLoginAuthenticatedCard } from "@/components/main-login/MainLoginAuthenticatedCard";
import { MainLoginFormCard } from "@/components/main-login/MainLoginFormCard";
import { SiteShell } from "@/components/shell/SiteShell";
import { loginApi, queryKeys, useIsAuthenticated } from "@/hooks/use-api";
import { tryCatch } from "@/utils/try-catch";

export const MainLogin = () => {
  const { isAuth, isAuthResolved } = useIsAuthenticated();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;

    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      toast.error("Username is required.");
      return;
    }

    setLoading(true);
    const { error } = await tryCatch(
      loginApi.login({ username: trimmedUsername, password }),
    );
    setLoading(false);

    if (error) {
      toast.error("That username and password didn't work.");
      setPassword("");
      return;
    }

    await queryClient.invalidateQueries({ queryKey: [queryKeys.ME] });
    router.push("/");
  };

  const handleLogout = async () => {
    if (loading) return;

    setLoading(true);
    const { error } = await tryCatch(loginApi.logout());
    setLoading(false);

    if (error) {
      toast.error("Sign out failed. Try again.");
      return;
    }

    queryClient.setQueryData([queryKeys.ME], null);
    await queryClient.invalidateQueries({ queryKey: [queryKeys.ME] });
    setUsername("");
    setPassword("");
  };

  return (
    <SiteShell>
      <section className="sheet login-sheet" aria-labelledby="login-h">
        <div className="cell c-4 label vio">
          <span className="n">Admin</span>
          <h1 id="login-h">{isAuth ? "Signed in" : "Sign in"}</h1>
          <p>Admin sign-in for posting updates to the Now section.</p>
        </div>
        <div className="cell c-8">
          {!isAuthResolved ? (
            <p className="now-state" role="status">
              <span className="bar" aria-hidden="true" />
              Checking your session…
            </p>
          ) : isAuth ? (
            <MainLoginAuthenticatedCard
              isLoading={loading}
              onLogout={handleLogout}
              onGoHome={() => router.push("/")}
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
      </section>
    </SiteShell>
  );
};
