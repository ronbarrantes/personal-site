import { useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { Icon } from "@/components/icon";
import { useTheme } from "@/components/theme-provider/theme-provider-state";
import { loginApi, queryKeys, useAuthStatus } from "@/hooks/use-api";
import { useClock } from "@/hooks/use-clock";
import { useAuthStore } from "@/store/use-auth";
import { bruStyles } from "@/styles/bru-styles";
import { tryCatch } from "@/utils/try-catch";

export const MainLogin = () => {
  const { theme, setTheme } = useTheme();
  const { time, date } = useClock();
  const { me } = useAuthStatus();
  const { isAuth, setIsAuth } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isDark = theme === "dark";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!me.get.isPending && !me.get.isFetching) {
      if (me.get.data) setIsAuth(true);
      else setIsAuth(false);
    }
  }, [me.get.data, me.get.isFetching, me.get.isPending, setIsAuth]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await tryCatch(
      loginApi.login({ username, password }),
    );
    setLoading(false);
    if (error) {
      toast.error("ACCESS DENIED");
      setPassword("");
      return;
    }
    queryClient.setQueryData([queryKeys.ME], { authenticated: true });
    queryClient.invalidateQueries({ queryKey: [queryKeys.ME] });
    setIsAuth(true);
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
    setIsAuth(false);
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <style>{bruStyles}</style>
      <div className={`bru ${isDark ? "dark" : ""}`}>
        <div className="relative z-10 flex min-h-screen flex-col">
          {/* nav */}
          <nav
            className="flex items-center justify-between border-b-4 px-4 py-3 md:px-8"
            style={{ borderColor: "var(--ink)", background: "var(--bg)" }}
          >
            <div className="syne text-xl font-extrabold">★ RON/B.CO</div>
            <div className="flex items-center gap-3 text-xs">
              <span className="tag">
                <Icon name="clock" className="mr-1 inline size-3" />
                {time}
              </span>
              <span className="tag hidden md:inline-block">
                <Icon name="calendar" className="mr-1 inline size-3" />
                {date}
              </span>
              <button
                className="btn text-xs"
                onClick={() => setTheme(isDark ? "light" : "dark")}
              >
                {isDark ? "☼" : "☾"}
              </button>
            </div>
          </nav>

          {/* centered content */}
          <div className="flex flex-1 items-center justify-center px-4 py-16">
            {isAuth ? (
              <div className="box w-full max-w-sm p-8">
                <div className="tag mb-4">STATUS // AUTHENTICATED</div>
                <h1 className="smash mb-6 text-6xl">
                  WELCOME
                  <span style={{ color: "var(--accent)" }}>.</span>
                </h1>
                <p className="mb-8 text-sm leading-relaxed">
                  YOU HAVE ACCESS. ALL SYSTEMS GO.
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="btn"
                    onClick={handleLogout}
                    disabled={loading}
                  >
                    {loading ? "SIGNING OUT..." : "SIGN OUT"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-alt"
                    onClick={() => navigate("/")}
                  >
                    ← HOME
                  </button>
                </div>
              </div>
            ) : (
              <div className="box w-full max-w-sm p-8">
                <div className="tag mb-4">FILE_00 // ACCESS</div>
                <h1 className="smash mb-8 text-6xl">
                  ENTER
                  <span style={{ color: "var(--accent)" }}>.</span>
                </h1>
                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="tag mb-2 block">USER_ID</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="IDENTIFIER..."
                      autoComplete="username"
                      required
                    />
                  </div>
                  <div>
                    <label className="tag mb-2 block">PASSKEY</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn w-full justify-center"
                    disabled={loading}
                  >
                    {loading ? "CHECKING..." : "ENTER →"}
                  </button>
                </form>
              </div>
            )}
          </div>

          <footer
            className="border-t-4 p-4 text-center text-xs tracking-[0.2em] uppercase"
            style={{
              borderColor: "var(--ink)",
              background: "var(--ink)",
              color: "var(--bg)",
            }}
          >
            © {new Date().getFullYear()} RON BARRANTES
          </footer>
        </div>
      </div>
    </>
  );
};
