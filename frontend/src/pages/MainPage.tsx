import { useEffect, useState } from "react";

import { toast } from "sonner";

import { Icon } from "@/components/icon";
import { useTheme } from "@/components/theme-provider/theme-provider-state";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  about,
  contactText,
  experienceItems,
  mediaLinks,
  portfolioItems,
} from "@/data/text";
import { useAuthStatus, useRoutes } from "@/hooks/use-api";
import { useClock } from "@/hooks/use-clock";
import { useAuthStore } from "@/store/use-auth";
import { bruStyles } from "@/styles/bru-styles";
import { formatDate } from "@/utils/time";

export const MainPage = () => {
  const { theme, setTheme } = useTheme();
  const { date, time } = useClock();
  const { api } = useRoutes();
  const { me } = useAuthStatus();
  const { isAuth, setIsAuth } = useAuthStore();
  const nowData = api.now.get.data || [];
  const isDark = theme === "dark";

  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  useEffect(() => {
    if (!me.get.isPending && !me.get.isFetching) {
      if (me.get.data) setIsAuth(true);
      else setIsAuth(false);
    }
  }, [me.get.data, me.get.isFetching, me.get.isPending, setIsAuth]);

  const handleAddNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (api.now.post.isPending) return;
    const title = newTitle.trim();
    const desc = newDesc.trim();
    if (!title || !desc) {
      toast.error("TITLE AND DESCRIPTION ARE REQUIRED");
      return;
    }
    api.now.post.mutate(
      { body: { title, desc } },
      {
        onSuccess: () => {
          setShowModal(false);
          setNewTitle("");
          setNewDesc("");
        },
        onError: () => toast.error("FAILED TO POST"),
      },
    );
  };

  return (
    <>
      <style>{bruStyles}</style>
      <div className={`bru ${isDark ? "dark" : ""}`}>
        <div className="relative z-10">
          {/* nav */}
          <nav
            className="sticky top-0 z-30 flex items-center justify-between border-b-4 px-4 py-3 md:px-8"
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

          {/* marquee */}
          <div
            className="overflow-hidden border-b-4 py-2"
            style={{ borderColor: "var(--ink)", background: "var(--ink)" }}
          >
            <div className="marquee syne text-2xl font-extrabold text-[var(--bg)]">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="mx-6">
                  ★ SHIPS CODE ★ BUILDS INTERFACES ★ DRINKS COFFEE ★ DANCES
                  SALSA ★ TRAVELS LIGHT ★
                </span>
              ))}
            </div>
          </div>

          {/* hero */}
          <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
            <div className="grid items-stretch gap-6 md:grid-cols-12">
              {/* text block */}
              <div className="flex flex-col md:order-2 md:col-span-7">
                <div className="flex items-stretch gap-3 md:block">
                  <div className="brut-name-col flex min-w-0 flex-1 flex-col md:block">
                    <div className="tag self-start">FILE_01 // HELLO</div>
                    <h1 className="brut-name smash mt-3 flex flex-1 items-center leading-[0.82] md:my-6 md:block md:text-[11vw]">
                      <span>
                        RON
                        <br />
                        BARR-
                        <br />
                        ANTES
                        <span style={{ color: "var(--accent)" }}>.</span>
                      </span>
                    </h1>
                  </div>
                  {/* mobile-only inline photo */}
                  <div className="w-[40%] shrink-0 md:hidden">
                    <div
                      className="relative h-full border-4"
                      style={{
                        borderColor: "var(--ink)",
                        boxShadow: "6px 6px 0 var(--accent)",
                      }}
                    >
                      <img
                        src="/img/ron.webp"
                        alt="Ron Barrantes"
                        className="block h-full w-full object-cover"
                        style={{
                          filter:
                            "grayscale(100%) contrast(1.15) brightness(1.05)",
                        }}
                      />
                      <div
                        className="pointer-events-none absolute inset-0 mix-blend-multiply"
                        style={{ background: "var(--accent)", opacity: 0.35 }}
                      />
                      <div
                        className="pointer-events-none absolute inset-0 opacity-20"
                        style={{
                          backgroundImage:
                            "radial-gradient(var(--ink) 1px, transparent 1.5px)",
                          backgroundSize: "5px 5px",
                        }}
                      />
                      <div
                        className="absolute top-2 left-2 border-2 px-1.5 py-0.5 text-[9px] font-bold tracking-[0.15em]"
                        style={{
                          borderColor: "var(--ink)",
                          background: "var(--bg)",
                          color: "var(--ink)",
                        }}
                      >
                        RON · 01
                      </div>
                      <div
                        className="syne absolute right-2 bottom-2 text-[10px] font-extrabold"
                        style={{ color: "var(--bg)" }}
                      >
                        ★'09
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="mt-5 mb-5 border-3 px-4 py-3 text-sm font-bold tracking-[0.1em] md:mt-0 md:text-base"
                  style={{
                    borderColor: "var(--ink)",
                    background: "var(--accent)",
                    color: "var(--alt)",
                  }}
                >
                  UI ENGINEER / EX-SALSA-INSTRUCTOR / COFFEE-POWERED
                </div>
                <div className="box p-5">
                  <div className="tag mb-3">ABOUT.TXT</div>
                  <p className="mb-3 text-sm leading-snug">
                    {about.description[0]}
                  </p>
                  <p className="text-sm leading-snug">{about.description[3]}</p>
                  <div className="stripe mt-4 h-3" />
                  <div className="mt-4 flex flex-wrap gap-2">
                    {mediaLinks.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn text-xs"
                      >
                        <Icon name={l.label as "github"} />
                        {l.label.toUpperCase()}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* portrait block (md+ only) */}
              <div className="hidden md:order-1 md:col-span-5 md:block">
                <div className="relative mx-auto w-full max-w-xs md:max-w-none">
                  <div
                    className="relative border-4"
                    style={{
                      borderColor: "var(--ink)",
                      boxShadow: "10px 10px 0 var(--accent)",
                    }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src="/img/ron.webp"
                        alt="Ron Barrantes"
                        className="block aspect-[4/5] w-full object-cover"
                        style={{
                          filter:
                            "grayscale(100%) contrast(1.15) brightness(1.05)",
                        }}
                      />
                      <div
                        className="pointer-events-none absolute inset-0 mix-blend-multiply"
                        style={{ background: "var(--accent)", opacity: 0.35 }}
                      />
                      <div
                        className="pointer-events-none absolute inset-0 opacity-20"
                        style={{
                          backgroundImage:
                            "radial-gradient(var(--ink) 1px, transparent 1.5px)",
                          backgroundSize: "5px 5px",
                        }}
                      />
                    </div>
                    <div
                      className="absolute top-3 left-3 border-2 px-2 py-0.5 text-[10px] font-bold tracking-[0.2em]"
                      style={{
                        borderColor: "var(--ink)",
                        background: "var(--bg)",
                        color: "var(--ink)",
                      }}
                    >
                      SUBJECT 01 · RON
                    </div>
                    <svg
                      className="absolute -top-[9px] -left-[9px] h-4 w-4"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      style={{ color: "var(--ink)" }}
                    >
                      <path d="M0 8 H16 M8 0 V16" />
                    </svg>
                    <svg
                      className="absolute -top-[9px] -right-[9px] h-4 w-4"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      style={{ color: "var(--ink)" }}
                    >
                      <path d="M0 8 H16 M8 0 V16" />
                    </svg>
                    <svg
                      className="absolute -bottom-[9px] -left-[9px] h-4 w-4"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      style={{ color: "var(--ink)" }}
                    >
                      <path d="M0 8 H16 M8 0 V16" />
                    </svg>
                    <svg
                      className="absolute -right-[9px] -bottom-[9px] h-4 w-4"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      style={{ color: "var(--ink)" }}
                    >
                      <path d="M0 8 H16 M8 0 V16" />
                    </svg>
                  </div>
                  <div
                    className="mt-3 flex items-center justify-between border-3 px-3 py-2"
                    style={{
                      borderColor: "var(--ink)",
                      background: "var(--ink)",
                      color: "var(--bg)",
                    }}
                  >
                    <span className="syne text-sm font-extrabold tracking-wide">
                      ★ EST. 2009
                    </span>
                    <span className="text-[10px] tracking-[0.2em]">
                      PLATE — I
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* now */}
          <section
            className="border-y-4"
            style={{ borderColor: "var(--ink)", background: "var(--ink)" }}
          >
            <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
              <div
                className="mb-6 flex items-end justify-between"
                style={{ color: "var(--bg)" }}
              >
                <h2 className="text-6xl md:text-8xl">
                  NOW<span style={{ color: "var(--accent)" }}>.</span>
                </h2>
                <div className="flex items-center gap-3">
                  <div
                    className="tag"
                    style={{ background: "var(--bg)", color: "var(--ink)" }}
                  >
                    {nowData.length} ITEMS
                  </div>
                  {isAuth && (
                    <Dialog open={showModal} onOpenChange={setShowModal}>
                      <DialogTrigger asChild>
                        <button
                          type="button"
                          className="tag cursor-pointer"
                          style={{
                            background: "var(--accent)",
                            color: "var(--alt)",
                          }}
                        >
                          + ADD NOW
                        </button>
                      </DialogTrigger>
                      <DialogContent
                        showCloseButton={false}
                        className={`bru ${isDark ? "dark" : ""} box max-w-md border-0 p-6 shadow-none`}
                      >
                        <div className="tag mb-4">NEW // NOW</div>
                        <DialogTitle asChild>
                          <h3 className="mb-5 text-3xl">
                            ADD ITEM
                            <span style={{ color: "var(--accent)" }}>.</span>
                          </h3>
                        </DialogTitle>
                        <DialogDescription className="sr-only">
                          Add a new NOW item with a title and description.
                        </DialogDescription>
                        <form onSubmit={handleAddNow}>
                          <div className="mb-4">
                            <label className="tag mb-2 block">TITLE</label>
                            <input
                              value={newTitle}
                              onChange={(e) => setNewTitle(e.target.value)}
                              placeholder="WHAT ARE YOU ON..."
                              required
                            />
                          </div>
                          <div className="mb-5">
                            <label className="tag mb-2 block">DESCRIPTION</label>
                            <textarea
                              value={newDesc}
                              onChange={(e) => setNewDesc(e.target.value)}
                              placeholder="TELL ME MORE..."
                              rows={3}
                              required
                            />
                          </div>
                          <div className="flex gap-3">
                            <button
                              type="submit"
                              className="btn flex-1 justify-center"
                              disabled={api.now.post.isPending}
                            >
                              {api.now.post.isPending ? "POSTING..." : "POST IT →"}
                            </button>
                            <button
                              type="button"
                              className="btn btn-alt"
                              onClick={() => setShowModal(false)}
                            >
                              CANCEL
                            </button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {nowData.slice(0, 6).map((n) => (
                  <div key={n.id} className="box p-4">
                    <div
                      className="tag mb-2"
                      style={{ background: "var(--accent)", color: "var(--alt)" }}
                    >
                      ///
                    </div>
                    {isAuth && (
                      <button
                        type="button"
                        aria-label={`Delete ${n.title}`}
                        className="tag absolute top-2 right-2 cursor-pointer"
                        style={{ background: "var(--ink)", color: "var(--bg)" }}
                        onClick={() => {
                          if (!window.confirm(`Delete "${n.title}"?`)) return;
                          api.now.delete.mutate(n.id, {
                            onError: () => toast.error("FAILED TO DELETE"),
                          });
                        }}
                      >
                        ×
                      </button>
                    )}
                    <h3 className="mb-2 text-2xl">{n.title}</h3>
                    <p className="mb-3 text-sm">{n.desc}</p>
                    <div className="text-[10px] uppercase opacity-70">
                      <Icon name="clock" className="mr-1 inline size-3" />
                      {formatDate(n.created_at)}
                    </div>
                  </div>
                ))}
                {nowData.length === 0 && (
                  <div
                    className="text-center text-xl md:col-span-3"
                    style={{ color: "var(--bg)" }}
                  >
                    [ NO_DATA ]
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* work */}
          <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
            <h2 className="mb-6 text-6xl md:text-8xl">
              WORK<span style={{ color: "var(--accent)" }}>///</span>
            </h2>
            <div className="space-y-5">
              {experienceItems.map((w, i) => (
                <article
                  key={i}
                  className="box grid items-start gap-4 p-5 md:grid-cols-12"
                >
                  <div className="md:col-span-2">
                    <div
                      className="text-3xl"
                      style={{ fontFamily: "Archivo Black", color: "var(--accent)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="text-xs">
                      {w.startDate} → {w.endDate || "NOW"}
                    </div>
                  </div>
                  <div className="md:col-span-7">
                    <h3 className="mb-1 text-2xl md:text-3xl">{w.jobTitle}</h3>
                    <div className="mb-3 text-sm">
                      @{" "}
                      {w.url ? (
                        <a
                          href={w.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-[var(--accent)] decoration-4 underline-offset-2"
                        >
                          {w.employer}
                        </a>
                      ) : (
                        w.employer
                      )}
                    </div>
                    <p className="text-sm leading-relaxed">{w.description[0]}</p>
                  </div>
                  <div className="md:col-span-3">
                    <div className="tag mb-2">STACK</div>
                    <div className="flex flex-wrap gap-2">
                      {w.tools.map((t) => (
                        <Icon
                          key={t}
                          tooltip
                          name={t}
                          className="size-5 border-2 border-[var(--ink)] bg-[var(--bg)] p-1"
                        />
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* portfolio */}
          <section className="stripe border-t-4" style={{ borderColor: "var(--ink)" }}>
            <div
              className="mx-auto max-w-7xl border-4 px-4 py-10 md:px-8"
              style={{ borderColor: "var(--ink)", background: "var(--bg)" }}
            >
              <h2 className="mb-6 text-6xl md:text-8xl">
                SHIPS<span style={{ color: "var(--accent)" }}>.</span>
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {portfolioItems.map((p, i) => (
                  <article key={p.name} className="box p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <span
                        className="text-5xl"
                        style={{ fontFamily: "Archivo Black", color: "var(--accent)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex gap-2">
                        {p.github && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn text-xs"
                          >
                            <Icon name="github" />
                            SRC
                          </a>
                        )}
                        {p.link && (
                          <a
                            href={p.link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-alt text-xs"
                          >
                            <Icon name="link" />
                            LIVE
                          </a>
                        )}
                      </div>
                    </div>
                    <h3 className="mb-3 text-3xl">{p.name}</h3>
                    <p className="mb-4 text-sm leading-relaxed">{p.description[0]}</p>
                    <div
                      className="flex flex-wrap gap-2 border-t-2 pt-3"
                      style={{ borderColor: "var(--ink)" }}
                    >
                      {p.tools.map((t) => (
                        <Icon key={t} tooltip name={t} className="size-5" />
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* contact */}
          <section
            className="border-t-4 py-14"
            style={{
              borderColor: "var(--ink)",
              background: "var(--accent)",
              color: "var(--alt)",
            }}
          >
            <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
              <h2 className="mb-4 text-6xl md:text-[12vw]">
                SAY
                <br />
                HELLO.
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-sm">
                {contactText.description}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {mediaLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-alt"
                  >
                    <Icon name={l.label as "github"} className="size-5" />
                    {l.label.toUpperCase()}
                  </a>
                ))}
              </div>
            </div>
          </section>

          <footer
            className="border-t-4 p-4 text-center text-xs tracking-[0.2em] uppercase"
            style={{
              borderColor: "var(--ink)",
              background: "var(--ink)",
              color: "var(--bg)",
            }}
          >
            © {new Date().getFullYear()} RON BARRANTES — BUILT WITH ANGER &amp;
            LOVE
          </footer>
        </div>
      </div>

    </>
  );
};
