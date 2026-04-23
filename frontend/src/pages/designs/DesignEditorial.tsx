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
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,800;0,9..144,900;1,9..144,400&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

.ed {
  --paper: #f3eee4;
  --ink: #14120f;
  --red: #c1440e;
  --mute: #6a5f52;
  --rule: rgba(20,18,15,0.25);
  background: var(--paper);
  color: var(--ink);
  font-family: 'IBM Plex Sans', sans-serif;
  min-height: 100vh;
  position: relative;
}
.ed.dark {
  --paper: #14120f;
  --ink: #f3eee4;
  --red: #ef794a;
  --mute: #a79a88;
  --rule: rgba(243,238,228,0.22);
}
.ed::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: radial-gradient(rgba(20,18,15,0.035) 1px, transparent 1px);
  background-size: 3px 3px;
  pointer-events: none;
  z-index: 0;
}
.ed.dark::before {
  background-image: radial-gradient(rgba(243,238,228,0.04) 1px, transparent 1px);
}
.ed .display {
  font-family: 'Fraunces', serif;
  font-variation-settings: 'opsz' 144;
  letter-spacing: -0.03em;
  line-height: 0.88;
}
.ed .serif { font-family: 'Fraunces', serif; }
.ed .mono { font-family: 'IBM Plex Mono', monospace; }
.ed .rule { border-color: var(--rule); }
.ed .dropcap::first-letter {
  font-family: 'Fraunces', serif;
  font-weight: 900;
  float: left;
  font-size: 4.3em;
  line-height: 0.85;
  padding: 6px 10px 0 0;
  color: var(--red);
}
.ed .num {
  font-family: 'Fraunces', serif;
  font-weight: 300;
  font-style: italic;
  color: var(--red);
}
.ed .lede { font-family: 'Fraunces', serif; font-style: italic; }
@keyframes ed-rise {
  from { opacity: 0; transform: translateY(14px); }
}
.ed .rise > * { animation: ed-rise 0.7s both; }
.ed .rise > *:nth-child(2) { animation-delay: 0.08s; }
.ed .rise > *:nth-child(3) { animation-delay: 0.16s; }
.ed .rise > *:nth-child(4) { animation-delay: 0.24s; }
`;

export const DesignEditorial = () => {
  const { theme, setTheme } = useTheme();
  const { date, time } = useClock();
  const { api } = useRoutes();
  const nowData = api.now.get.data || [];
  const isDark = theme === "dark";

  return (
    <>
      <style>{styles}</style>
      <div className={`ed ${isDark ? "dark" : ""}`}>
        <div className="relative z-10">
          {/* masthead */}
          <header
            className="border-b-2 px-6 py-4 md:px-12"
            style={{ borderColor: "var(--ink)" }}
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between">
              <div className="mono text-xs uppercase tracking-[0.25em]">
                Vol. VI · Issue 04
              </div>
              <div className="mono text-xs uppercase tracking-[0.25em]">
                <Icon name="calendar" className="mr-1 inline size-3" />
                {date} · <Icon name="clock" className="mx-1 inline size-3" />
                {time}
              </div>
              <div className="flex items-center gap-4">
                <button
                  className="mono text-xs uppercase tracking-[0.2em] underline underline-offset-4 hover:no-underline"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                >
                  {isDark ? "day" : "night"}
                </button>
                <Link
                  to="/designs"
                  className="mono text-xs uppercase tracking-[0.2em] underline underline-offset-4"
                >
                  index
                </Link>
              </div>
            </div>
            <div className="mx-auto mt-6 max-w-7xl">
              <div className="display text-center text-[14vw] md:text-[10vw]">
                The&nbsp;
                <span className="italic" style={{ color: "var(--red)" }}>
                  Barrantes
                </span>
                &nbsp;Register
              </div>
            </div>
            <div className="mx-auto mt-3 flex max-w-7xl items-center justify-between border-t pt-2 rule">
              <div className="serif text-sm italic">
                "Engineered with an eye for design."
              </div>
              <div className="mono text-xs uppercase tracking-[0.25em]">
                Single copy · Free · ronb.co
              </div>
            </div>
          </header>

          {/* hero feature */}
          <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-12 md:px-12">
            <div className="md:col-span-7 rise">
              <div className="num mb-3 text-2xl">§ 01 — The Profile</div>
              <h2 className="display mb-6 text-6xl md:text-7xl">
                An engineer, <em>reluctantly</em> romantic about the craft.
              </h2>
              <p className="lede mb-5 text-xl leading-snug">
                Six years shipping interfaces. Ten years around tech. A former
                salsa instructor who now argues about type hierarchy at
                standups.
              </p>
              <p className="dropcap mb-4 text-base leading-relaxed">
                {about.description[0]}
              </p>
              <p className="mb-4 text-base leading-relaxed">
                {about.description[2]}
              </p>
              <p className="text-base leading-relaxed">
                {about.description[3]}
              </p>
            </div>
            <aside className="md:col-span-5">
              <figure
                className="border-y-2 py-8"
                style={{ borderColor: "var(--ink)" }}
              >
                <div
                  className="mb-5 aspect-[4/5] w-full overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, var(--red) 0%, var(--ink) 100%)`,
                  }}
                >
                  <img
                    src="/img/ron.webp"
                    alt="Ron"
                    className="h-full w-full object-cover mix-blend-luminosity opacity-90"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
                <figcaption className="serif text-sm italic">
                  Plate I. — The author, photographed in quiet deliberation.
                </figcaption>
              </figure>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  "react",
                  "typescript",
                  "golang",
                  "postgresql",
                  "tailwind",
                  "git",
                ].map((t) => (
                  <div
                    key={t}
                    className="flex flex-col items-center gap-1 border p-3 rule"
                  >
                    <Icon name={t as "react"} className="size-6" />
                    <span className="mono text-[10px] uppercase tracking-wider">
                      {t}
                    </span>
                  </div>
                ))}
              </div>
            </aside>
          </section>

          {/* the now */}
          <section
            className="border-y-2"
            style={{ borderColor: "var(--ink)" }}
          >
            <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
              <div className="mb-8 flex items-end justify-between border-b pb-3 rule">
                <div>
                  <div className="num mb-1 text-2xl">§ 02 — Dispatches</div>
                  <h3 className="display text-5xl md:text-6xl">
                    What I'm up to <em>now</em>.
                  </h3>
                </div>
                <div className="mono hidden text-xs uppercase tracking-[0.25em] md:block">
                  {nowData.length} entries · live
                </div>
              </div>
              <div className="grid gap-8 md:grid-cols-3">
                {nowData.slice(0, 6).map((n, i) => (
                  <article
                    key={n.id}
                    className="border-l-2 pl-5 rule"
                    style={{ borderColor: "var(--red)" }}
                  >
                    <div className="num mb-2 text-3xl">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h4 className="serif mb-2 text-2xl leading-tight">
                      {n.title}
                    </h4>
                    <p className="mb-3 text-sm leading-relaxed">{n.desc}</p>
                    <div className="mono text-[11px] uppercase tracking-wider opacity-60">
                      <Icon name="clock" className="mr-1 inline size-3" />
                      {formatDate(n.created_at)}
                    </div>
                  </article>
                ))}
                {nowData.length === 0 && (
                  <p className="lede md:col-span-3">
                    The press is quiet today. Check back soon.
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* resume */}
          <section className="mx-auto max-w-7xl px-6 py-12 md:px-12">
            <div className="mb-8 flex items-end justify-between border-b pb-3 rule">
              <div>
                <div className="num mb-1 text-2xl">§ 03 — Chronicle</div>
                <h3 className="display text-5xl md:text-6xl">
                  A working <em>history</em>.
                </h3>
              </div>
            </div>
            <div className="space-y-10">
              {experienceItems.map((w, i) => (
                <article
                  key={i}
                  className="grid gap-6 border-b pb-8 rule md:grid-cols-12"
                >
                  <div className="md:col-span-3">
                    <div className="mono text-xs uppercase tracking-[0.2em] opacity-70">
                      {w.startDate} — {w.endDate || "Present"}
                    </div>
                    <div className="serif mt-1 text-xl">
                      {w.url ? (
                        <a
                          href={w.url}
                          target="_blank"
                          className="underline decoration-[var(--red)] underline-offset-4 hover:no-underline"
                        >
                          {w.employer}
                        </a>
                      ) : (
                        w.employer
                      )}
                    </div>
                  </div>
                  <div className="md:col-span-9">
                    <h4
                      className="display mb-3 text-3xl"
                      style={{ color: "var(--red)" }}
                    >
                      {w.jobTitle}
                    </h4>
                    <p className="mb-3 text-sm leading-relaxed">
                      {w.description[0]}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {w.tools.map((t) => (
                        <Icon
                          key={t}
                          tooltip
                          name={t}
                          className="size-5 opacity-70 hover:opacity-100"
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
            className="border-t-2"
            style={{ borderColor: "var(--ink)" }}
          >
            <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
              <div className="mb-8 border-b pb-3 rule">
                <div className="num mb-1 text-2xl">§ 04 — Exhibits</div>
                <h3 className="display text-5xl md:text-6xl">
                  Selected <em>works</em>.
                </h3>
              </div>
              <div className="grid gap-8 md:grid-cols-2">
                {portfolioItems.map((p, i) => (
                  <article
                    key={i}
                    className="border p-6 transition-colors rule hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <h4 className="serif text-3xl leading-tight">
                        {p.name}.
                      </h4>
                      <span className="num text-2xl">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mb-4 text-sm leading-relaxed">
                      {p.description[0]}
                    </p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {p.tools.map((t) => (
                        <Icon key={t} tooltip name={t} className="size-4" />
                      ))}
                    </div>
                    <div className="mono flex gap-4 text-xs uppercase tracking-[0.15em]">
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          className="underline underline-offset-4 hover:no-underline"
                        >
                          <Icon name="github" className="mr-1 inline size-3" />
                          Source
                        </a>
                      )}
                      {p.link && (
                        <a
                          href={p.link.href}
                          target="_blank"
                          className="underline underline-offset-4 hover:no-underline"
                          style={{ color: "var(--red)" }}
                        >
                          <Icon name="link" className="mr-1 inline size-3" />
                          Visit →
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* contact colophon */}
          <footer
            className="border-t-2 bg-[var(--ink)] text-[var(--paper)]"
            style={{ borderColor: "var(--ink)" }}
          >
            <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 md:grid-cols-3 md:px-12">
              <div>
                <div className="num mb-2 text-2xl">§ 05</div>
                <h3 className="display text-5xl">Correspondence.</h3>
              </div>
              <div className="md:col-span-2">
                <p className="lede mb-6 text-xl">{contactText.description}</p>
                <div className="flex flex-wrap gap-3">
                  {mediaLinks.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      className="mono flex items-center gap-3 border border-[var(--paper)] px-5 py-3 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[var(--paper)] hover:text-[var(--ink)]"
                    >
                      <Icon name={l.label as "github"} className="size-4" />
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-[var(--paper)]/20 px-6 py-4 md:px-12">
              <div className="mono mx-auto flex max-w-7xl items-center justify-between text-[10px] uppercase tracking-[0.3em] opacity-70">
                <span>Printed on the web · est. 2009</span>
                <span>— fin —</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};
