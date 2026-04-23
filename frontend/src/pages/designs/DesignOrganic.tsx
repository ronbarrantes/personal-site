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
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=DM+Serif+Display:ital@0;1&family=Nunito:wght@400;600;700&display=swap');

.org {
  --cream: #fcf6ee;
  --peach: #fde2cf;
  --coral: #ef7c6a;
  --moss: #7a8d67;
  --sky: #b8d4ce;
  --butter: #ffd994;
  --ink: #2e2622;
  --mute: #7a6d63;
  background: var(--cream);
  color: var(--ink);
  font-family: 'Nunito', sans-serif;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}
.org.dark {
  --cream: #1b1814;
  --peach: #3a2a24;
  --ink: #fcf6ee;
  --mute: #b8aca0;
  --coral: #ff9e8a;
  --moss: #a9c18d;
  --sky: #9bc2bd;
  --butter: #ffc77a;
}
.org .display { font-family: 'DM Serif Display', serif; letter-spacing: -0.01em; line-height: 0.95; }
.org .hand { font-family: 'Caveat', cursive; font-weight: 600; }

.org-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(50px);
  opacity: 0.55;
  pointer-events: none;
  z-index: 0;
}

.org .card {
  border-radius: 28px;
  background: var(--cream);
  box-shadow:
    0 2px 0 rgba(0,0,0,0.04),
    0 14px 40px -20px rgba(0,0,0,0.18);
  position: relative;
}
.org.dark .card {
  background: #221d18;
  box-shadow: 0 14px 40px -20px rgba(0,0,0,0.6);
}

.org .tape {
  position: absolute;
  width: 80px; height: 22px;
  background: rgba(255, 217, 148, 0.75);
  top: -8px; left: 50%;
  transform: translateX(-50%) rotate(-2deg);
  box-shadow: 0 2px 6px rgba(0,0,0,0.07);
}
.org.dark .tape { background: rgba(255, 217, 148, 0.35); }

.org .btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  border-radius: 999px;
  background: var(--coral);
  color: var(--cream);
  font-weight: 700;
  transition: transform 0.2s;
}
.org .btn:hover { transform: translateY(-2px) rotate(-1deg); }
.org .btn-ghost {
  background: transparent;
  color: var(--ink);
  border: 2px solid var(--ink);
}

.org .squiggle {
  stroke: var(--coral);
  stroke-width: 3;
  fill: none;
  stroke-linecap: round;
}

@keyframes org-pop {
  from { opacity: 0; transform: translateY(20px) scale(0.96); }
}
.org .pop > * { animation: org-pop 0.7s both cubic-bezier(0.2,0.8,0.2,1); }
.org .pop > *:nth-child(2) { animation-delay: 0.1s; }
.org .pop > *:nth-child(3) { animation-delay: 0.2s; }
.org .pop > *:nth-child(4) { animation-delay: 0.3s; }

@keyframes org-wobble {
  0%,100% { transform: rotate(-1deg); }
  50% { transform: rotate(1deg); }
}
.org .wobble { animation: org-wobble 4s ease-in-out infinite; transform-origin: center; }
`;

const Squiggle = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 20" className={className}>
    <path
      d="M2 10 Q 25 -2, 50 10 T 100 10 T 150 10 T 198 10"
      className="squiggle"
    />
  </svg>
);

export const DesignOrganic = () => {
  const { theme, setTheme } = useTheme();
  const { date, time } = useClock();
  const { api } = useRoutes();
  const nowData = api.now.get.data || [];
  const isDark = theme === "dark";

  return (
    <>
      <style>{styles}</style>
      <div className={`org ${isDark ? "dark" : ""}`}>
        <div
          className="org-blob wobble"
          style={{
            background: "var(--peach)",
            width: 420,
            height: 420,
            top: -140,
            left: -100,
          }}
        />
        <div
          className="org-blob"
          style={{
            background: "var(--sky)",
            width: 360,
            height: 360,
            top: 200,
            right: -120,
          }}
        />
        <div
          className="org-blob"
          style={{
            background: "var(--butter)",
            width: 320,
            height: 320,
            bottom: -120,
            left: "30%",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-5 py-6 md:px-8">
          {/* nav */}
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="h-9 w-9 rounded-full"
                style={{ background: "var(--coral)" }}
              />
              <span className="hand text-3xl">ron &amp; co.</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span
                className="rounded-full px-3 py-1 text-xs"
                style={{ background: "var(--sky)" }}
              >
                <Icon name="clock" className="mr-1 inline size-3" />
                {time}
              </span>
              <span
                className="hidden rounded-full px-3 py-1 text-xs md:inline-block"
                style={{ background: "var(--butter)", color: "#5a3e17" }}
              >
                <Icon name="calendar" className="mr-1 inline size-3" />
                {date}
              </span>
              <button
                className="rounded-full px-3 py-1 text-xs"
                style={{ background: "var(--peach)" }}
                onClick={() => setTheme(isDark ? "light" : "dark")}
              >
                {isDark ? "☀ sunny" : "☾ cozy"}
              </button>
              <Link
                to="/designs"
                className="hand text-xl underline decoration-wavy"
              >
                home
              </Link>
            </div>
          </nav>

          {/* hero */}
          <section className="mt-10 grid items-center gap-10 md:grid-cols-12 pop">
            <div className="md:col-span-7">
              <div className="hand mb-3 text-3xl" style={{ color: "var(--coral)" }}>
                hi, hello, hola ✿
              </div>
              <h1 className="display text-7xl md:text-[8.5rem]">
                i'm{" "}
                <span
                  className="inline-block rotate-[-2deg] rounded-2xl px-3 wobble"
                  style={{ background: "var(--coral)", color: "var(--cream)" }}
                >
                  ron
                </span>
                .
              </h1>
              <Squiggle className="my-4 h-5 w-64" />
              <p className="max-w-xl text-lg leading-relaxed">
                {about.description[0]}
              </p>
              <p
                className="mt-3 max-w-xl text-lg leading-relaxed"
                style={{ color: "var(--mute)" }}
              >
                {about.description[3]}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#now" className="btn">
                  <Icon name="clock" /> what i'm up to
                </a>
                <a href="#contact" className="btn btn-ghost">
                  <Icon name="contact" /> say hi
                </a>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="card relative mx-auto w-full max-w-sm rotate-2 p-5 wobble">
                <div className="tape" />
                <div
                  className="overflow-hidden rounded-2xl"
                  style={{ background: "var(--peach)" }}
                >
                  <img
                    src="/img/ron.webp"
                    alt="Ron"
                    className="aspect-square w-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
                <div className="hand mt-3 text-center text-2xl">
                  a portrait, slightly crooked
                </div>
              </div>
            </div>
          </section>

          {/* stack chips */}
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <span className="hand text-2xl">things i love —</span>
            {[
              { t: "react", bg: "var(--sky)" },
              { t: "typescript", bg: "var(--peach)" },
              { t: "golang", bg: "var(--butter)" },
              { t: "postgresql", bg: "var(--sky)" },
              { t: "tailwind", bg: "var(--peach)" },
              { t: "vite", bg: "var(--butter)" },
              { t: "git", bg: "var(--sky)" },
            ].map((c) => (
              <span
                key={c.t}
                className="flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold"
                style={{
                  background: c.bg,
                  color: isDark ? "var(--ink)" : "#3a2820",
                }}
              >
                <Icon name={c.t as "react"} /> {c.t}
              </span>
            ))}
          </div>

          {/* now */}
          <section id="now" className="mt-20">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <div
                  className="hand text-3xl"
                  style={{ color: "var(--coral)" }}
                >
                  currently ~
                </div>
                <h2 className="display text-6xl">right now.</h2>
              </div>
              <div className="hand text-xl" style={{ color: "var(--mute)" }}>
                {nowData.length} little things
              </div>
            </div>
            <Squiggle className="mb-8 h-5 w-full" />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 pop">
              {nowData.slice(0, 6).map((n, i) => {
                const pastels = [
                  "var(--peach)",
                  "var(--sky)",
                  "var(--butter)",
                ];
                const rot = [-1.5, 1, -0.5, 2, -1, 0.8][i % 6];
                return (
                  <article
                    key={n.id}
                    className="card p-6"
                    style={{
                      transform: `rotate(${rot}deg)`,
                      background: isDark ? undefined : pastels[i % 3],
                    }}
                  >
                    <div className="tape" />
                    <h3 className="display mb-2 text-3xl">{n.title}</h3>
                    <p className="mb-3 leading-relaxed">{n.desc}</p>
                    <div
                      className="hand text-lg"
                      style={{ color: "var(--coral)" }}
                    >
                      ✎ {formatDate(n.created_at)}
                    </div>
                  </article>
                );
              })}
              {nowData.length === 0 && (
                <div className="card p-8 text-center md:col-span-3">
                  <div className="hand text-3xl">
                    nothing new just yet — go make a cup of coffee ☕
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* work */}
          <section className="mt-20">
            <div className="mb-3">
              <div className="hand text-3xl" style={{ color: "var(--moss)" }}>
                a little history ~
              </div>
              <h2 className="display text-6xl">where i've been.</h2>
            </div>
            <Squiggle className="mb-8 h-5 w-full" />
            <ul className="space-y-6">
              {experienceItems.map((w, i) => (
                <li key={i} className="card p-6 md:p-8">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
                    <div className="md:w-1/4">
                      <div
                        className="inline-block rounded-full px-3 py-1 text-xs font-bold"
                        style={{ background: "var(--butter)", color: "#5a3e17" }}
                      >
                        {w.startDate} — {w.endDate || "now"}
                      </div>
                      <div className="hand mt-2 text-2xl">
                        {w.url ? (
                          <a
                            href={w.url}
                            target="_blank"
                            className="underline decoration-wavy"
                          >
                            {w.employer}
                          </a>
                        ) : (
                          w.employer
                        )}
                      </div>
                    </div>
                    <div className="md:flex-1">
                      <h3
                        className="display text-3xl"
                        style={{ color: "var(--coral)" }}
                      >
                        {w.jobTitle}
                      </h3>
                      <p className="mt-2 leading-relaxed">{w.description[0]}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {w.tools.map((t) => (
                          <span
                            key={t}
                            className="flex size-8 items-center justify-center rounded-full"
                            style={{ background: "var(--peach)" }}
                          >
                            <Icon tooltip name={t} className="size-4" />
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* portfolio */}
          <section className="mt-20">
            <div className="mb-3">
              <div className="hand text-3xl" style={{ color: "var(--sky)" }}>
                things i've made ~
              </div>
              <h2 className="display text-6xl">my little garden.</h2>
            </div>
            <Squiggle className="mb-8 h-5 w-full" />
            <div className="grid gap-6 md:grid-cols-2">
              {portfolioItems.map((p, i) => {
                const bgs = ["var(--peach)", "var(--sky)", "var(--butter)"];
                const rots = [-1, 1, -0.5, 0.8, -0.8];
                return (
                  <article
                    key={i}
                    className="card p-6"
                    style={{
                      transform: `rotate(${rots[i % rots.length]}deg)`,
                    }}
                  >
                    <div
                      className="mb-4 flex h-32 items-center justify-center rounded-2xl text-5xl"
                      style={{ background: bgs[i % bgs.length] }}
                    >
                      🌱
                    </div>
                    <h3 className="display mb-2 text-3xl">{p.name}</h3>
                    <p className="mb-4 leading-relaxed">{p.description[0]}</p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {p.tools.slice(0, 8).map((t) => (
                        <Icon key={t} tooltip name={t} className="size-5" />
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          className="btn btn-ghost text-sm"
                        >
                          <Icon name="github" className="size-4" /> code
                        </a>
                      )}
                      {p.link && (
                        <a href={p.link.href} target="_blank" className="btn text-sm">
                          <Icon name="link" className="size-4" /> visit
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* contact */}
          <section id="contact" className="mt-20 mb-16 text-center">
            <div
              className="hand text-3xl"
              style={{ color: "var(--coral)" }}
            >
              let's chat ~
            </div>
            <h2 className="display text-6xl md:text-8xl">
              say <em>hi</em>, please.
            </h2>
            <Squiggle className="mx-auto my-6 h-5 w-80" />
            <p className="mx-auto max-w-xl text-lg leading-relaxed">
              {contactText.description}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {mediaLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  className="btn"
                >
                  <Icon name={l.label as "github"} />
                  {l.label}
                </a>
              ))}
            </div>
            <div className="hand mt-10 text-2xl" style={{ color: "var(--mute)" }}>
              made with coffee &amp; care · {date} · {time}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
