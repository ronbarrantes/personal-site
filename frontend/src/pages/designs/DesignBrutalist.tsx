import { Link } from "react-router";

import { Icon } from "@/components/icon";
import { useTheme } from "@/components/theme-provider/theme-provider-state";
import {
  about,
  contactText,
  experienceItems,
  mediaLinks,
  portfolioItems,
} from "@/data/text";
import { useRoutes } from "@/hooks/use-api";
import { useClock } from "@/hooks/use-clock";
import { formatDate } from "@/utils/time";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Mono:wght@400;700&family=Syne:wght@700;800&display=swap');

.bru {
  --bg: #ffe500;
  --ink: #0a0a0a;
  --alt: #ffffff;
  --accent: #ff3864;
  background: var(--bg);
  color: var(--ink);
  font-family: 'Space Mono', monospace;
  min-height: 100vh;
  position: relative;
}
.bru.dark {
  --bg: #0c0c0c;
  --ink: #ffe500;
  --alt: #111;
  --accent: #ff3864;
}
.bru::before {
  content: '';
  position: fixed;
  inset: 0;
  background:
    repeating-linear-gradient(45deg, transparent 0 20px, rgba(0,0,0,0.04) 20px 21px);
  pointer-events: none;
  z-index: 0;
}
.bru h1, .bru h2, .bru h3, .bru .smash {
  font-family: 'Archivo Black', sans-serif;
  letter-spacing: -0.03em;
  line-height: 0.85;
  text-transform: uppercase;
}
.bru .syne { font-family: 'Syne', sans-serif; }
.bru .box {
  border: 3px solid var(--ink);
  background: var(--alt);
  color: var(--ink);
  box-shadow: 8px 8px 0 var(--ink);
  position: relative;
}
.bru.dark .box { background: #1a1a1a; color: var(--ink); }
.bru .box:hover { transform: translate(-2px,-2px); box-shadow: 12px 12px 0 var(--ink); }
.bru .tag {
  display: inline-block;
  background: var(--ink);
  color: var(--bg);
  padding: 2px 10px;
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}
.bru .stripe {
  background: repeating-linear-gradient(-45deg, var(--ink) 0 10px, transparent 10px 20px);
}
@keyframes bru-marq {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.bru .marquee {
  display: flex;
  white-space: nowrap;
  animation: bru-marq 28s linear infinite;
}
.bru .btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--ink);
  color: var(--bg);
  padding: 12px 18px;
  font-family: 'Archivo Black', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 3px solid var(--ink);
  box-shadow: 6px 6px 0 var(--accent);
  transition: transform 0.12s, box-shadow 0.12s;
}
.bru .btn:hover { transform: translate(-2px,-2px); box-shadow: 10px 10px 0 var(--accent); }
.bru .btn-alt {
  background: var(--bg);
  color: var(--ink);
  box-shadow: 6px 6px 0 var(--ink);
}
.bru .brut-name-col { container-type: size; }
.bru .brut-name { font-size: clamp(56px, 30cqh, 260px); }
@media (min-width: 768px) {
  .bru .brut-name-col { container-type: normal; }
  .bru .brut-name { font-size: 11vw; }
}
`;

export const DesignBrutalist = () => {
  const { theme, setTheme } = useTheme();
  const { date, time } = useClock();
  const { api } = useRoutes();
  const nowData = api.now.get.data || [];
  const isDark = theme === "dark";

  return (
    <>
      <style>{styles}</style>
      <div className={`bru ${isDark ? "dark" : ""}`}>
        <div className="relative z-10">
          {/* nav */}
          <nav
            className="sticky top-0 z-30 flex items-center justify-between border-b-4 px-4 py-3 md:px-8"
            style={{
              borderColor: "var(--ink)",
              background: "var(--bg)",
            }}
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
              <Link to="/designs" className="btn btn-alt text-xs">
                ←BACK
              </Link>
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
                {/* on mobile: name + photo sit side-by-side; on md+: this is just the text column */}
                <div className="flex items-stretch gap-3 md:block">
                  <div
                    className="brut-name-col flex min-w-0 flex-1 flex-col md:block"
                  >
                    <div className="tag self-start">FILE_01 // HELLO</div>
                    <h1 className="brut-name smash mt-3 flex flex-1 items-center leading-[0.82] md:my-6 md:block md:text-[11vw]">
                      RON
                      <br />
                      BARR-
                      <br />
                      ANTES
                      <span style={{ color: "var(--accent)" }}>.</span>
                    </h1>
                  </div>
                  {/* mobile-only inline photo, stretches top of FILE_01 to bottom of ANTES. */}
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
                  <p className="text-sm leading-snug">
                    {about.description[3]}
                  </p>
                  <div className="stripe mt-4 h-3" />
                  <div className="mt-4 flex flex-wrap gap-2">
                    {mediaLinks.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
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
                        style={{
                          background: "var(--accent)",
                          opacity: 0.35,
                        }}
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
                    {/* corner tag */}
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
                    {/* registration crosshairs, pinned to frame */}
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
                  {/* caption slip */}
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
                <div className="tag" style={{ background: "var(--bg)" }}>
                  {nowData.length} ITEMS
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {nowData.slice(0, 6).map((n) => (
                  <div key={n.id} className="box p-4">
                    <div
                      className="tag mb-2"
                      style={{
                        background: "var(--accent)",
                        color: "var(--alt)",
                      }}
                    >
                      ///
                    </div>
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
                      style={{
                        fontFamily: "Archivo Black",
                        color: "var(--accent)",
                      }}
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
                          className="underline decoration-[var(--accent)] decoration-4 underline-offset-2"
                        >
                          {w.employer}
                        </a>
                      ) : (
                        w.employer
                      )}
                    </div>
                    <p className="text-sm leading-relaxed">
                      {w.description[0]}
                    </p>
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
          <section
            className="stripe border-t-4"
            style={{ borderColor: "var(--ink)" }}
          >
            <div
              className="mx-auto max-w-7xl border-4 px-4 py-10 md:px-8"
              style={{ borderColor: "var(--ink)", background: "var(--bg)" }}
            >
              <h2 className="mb-6 text-6xl md:text-8xl">
                SHIPS<span style={{ color: "var(--accent)" }}>.</span>
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {portfolioItems.map((p, i) => (
                  <article key={i} className="box p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <span
                        className="text-5xl"
                        style={{
                          fontFamily: "Archivo Black",
                          color: "var(--accent)",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex gap-2">
                        {p.github && (
                          <a
                            href={p.github}
                            target="_blank"
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
                            className="btn btn-alt text-xs"
                          >
                            <Icon name="link" />
                            LIVE
                          </a>
                        )}
                      </div>
                    </div>
                    <h3 className="mb-3 text-3xl">{p.name}</h3>
                    <p className="mb-4 text-sm leading-relaxed">
                      {p.description[0]}
                    </p>
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
