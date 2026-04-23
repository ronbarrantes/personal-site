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
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Italiana&family=Cormorant+Unicase:wght@500;600;700&family=JetBrains+Mono:wght@400&display=swap');

.deco {
  --bg: #0d0c10;
  --panel: #14121a;
  --gold: #d4af37;
  --gold-2: #f0d57a;
  --ivory: #f4eadb;
  --line: rgba(212,175,55,0.35);
  background: var(--bg);
  color: var(--ivory);
  font-family: 'Cormorant Garamond', serif;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}
.deco.light {
  --bg: #f4eadb;
  --panel: #e9ddc3;
  --ivory: #1a1512;
  --line: rgba(26,21,18,0.4);
  --gold: #8a6d1d;
  --gold-2: #a9892a;
}
.deco .italiana { font-family: 'Italiana', serif; letter-spacing: 0.04em; }
.deco .unicase { font-family: 'Cormorant Unicase', serif; letter-spacing: 0.1em; }
.deco .mono { font-family: 'JetBrains Mono', monospace; letter-spacing: 0.15em; }

.deco-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.18;
  background-image:
    radial-gradient(circle at 50% 50%, var(--gold) 1px, transparent 2px),
    linear-gradient(0deg, transparent 49.5%, var(--gold) 50%, transparent 50.5%),
    linear-gradient(90deg, transparent 49.5%, var(--gold) 50%, transparent 50.5%);
  background-size: 40px 40px, 80px 80px, 80px 80px;
  z-index: 0;
}

.deco .gold { color: var(--gold); }
.deco .panel {
  background: var(--panel);
  border: 1px solid var(--line);
  position: relative;
}
.deco .panel::before, .deco .panel::after {
  content: '';
  position: absolute;
  width: 18px; height: 18px;
  border: 1px solid var(--gold);
}
.deco .panel::before { top: -6px; left: -6px; border-right: none; border-bottom: none; }
.deco .panel::after { bottom: -6px; right: -6px; border-left: none; border-top: none; }

.deco .hr {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--gold);
}
.deco .hr::before, .deco .hr::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}

.deco .btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 22px;
  border: 1px solid var(--gold);
  color: var(--gold);
  background: transparent;
  font-family: 'Italiana', serif;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-size: 12px;
  transition: all 0.25s;
  position: relative;
}
.deco .btn:hover { background: var(--gold); color: var(--bg); }

.deco .fan {
  width: 140px; height: 70px;
  margin: 0 auto;
  background:
    radial-gradient(circle at 50% 100%, transparent 55%, var(--gold) 55.5%, var(--gold) 56%, transparent 56.5%),
    radial-gradient(circle at 50% 100%, transparent 40%, var(--gold) 40.5%, var(--gold) 41%, transparent 41.5%),
    radial-gradient(circle at 50% 100%, transparent 25%, var(--gold) 25.5%, var(--gold) 26%, transparent 26.5%),
    linear-gradient(90deg, transparent 49.5%, var(--gold) 49.5%, var(--gold) 50.5%, transparent 50.5%),
    linear-gradient(60deg, transparent 49.5%, var(--gold) 49.5%, var(--gold) 50.5%, transparent 50.5%),
    linear-gradient(120deg, transparent 49.5%, var(--gold) 49.5%, var(--gold) 50.5%, transparent 50.5%);
  opacity: 0.85;
}

@keyframes deco-fade {
  from { opacity: 0; transform: translateY(10px); }
}
.deco .fade > * { animation: deco-fade 0.8s both; }
.deco .fade > *:nth-child(2) { animation-delay: 0.12s; }
.deco .fade > *:nth-child(3) { animation-delay: 0.24s; }
.deco .fade > *:nth-child(4) { animation-delay: 0.36s; }
`;

const Chevron = () => (
  <svg viewBox="0 0 100 20" className="mx-auto h-4 w-32 text-[var(--gold)]">
    <polyline
      points="0,20 50,2 100,20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <polyline
      points="20,20 50,12 80,20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <circle cx="50" cy="2" r="2" fill="currentColor" />
  </svg>
);

export const DesignDeco = () => {
  const { theme, setTheme } = useTheme();
  const { date, time } = useClock();
  const { api } = useRoutes();
  const nowData = api.now.get.data || [];
  const isLight = theme === "light";

  return (
    <>
      <style>{styles}</style>
      <div className={`deco ${isLight ? "light" : ""}`}>
        <div className="deco-bg" />
        <div className="relative z-10">
          {/* header */}
          <header className="mx-auto max-w-6xl px-6 py-6">
            <div className="mono flex items-center justify-between text-[10px] uppercase">
              <span>
                <Icon name="clock" className="mr-1 inline size-3" />
                {time}
              </span>
              <span className="gold">— Est. MMIX —</span>
              <div className="flex items-center gap-5">
                <button
                  className="hover:text-[var(--gold)]"
                  onClick={() => setTheme(isLight ? "dark" : "light")}
                >
                  {isLight ? "DARKEN" : "LIGHTEN"}
                </button>
                <Link to="/designs" className="hover:text-[var(--gold)]">
                  GALLERY
                </Link>
              </div>
            </div>
            <div className="mt-6 text-center fade">
              <div className="fan" />
              <Chevron />
              <h1 className="italiana mt-4 text-7xl md:text-9xl">
                R · O · N
              </h1>
              <div className="hr mt-4 mx-auto max-w-md">
                <span className="mono text-[10px] uppercase">
                  BARRANTES · ENGINEER · ARTISAN
                </span>
              </div>
              <p className="mx-auto mt-6 max-w-2xl text-xl italic opacity-90">
                "In the quiet between commits, I believe the best interfaces
                are small acts of hospitality."
              </p>
            </div>
          </header>

          {/* about */}
          <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-10 text-center">
              <div className="unicase gold text-sm">— I —</div>
              <h2 className="italiana text-5xl md:text-6xl">The Portrait</h2>
              <Chevron />
            </div>
            <div className="grid items-center gap-12 md:grid-cols-2 fade">
              <div className="panel p-8 text-center">
                <div
                  className="mx-auto aspect-square w-56 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, var(--gold) 0%, transparent 70%)",
                    padding: "4px",
                  }}
                >
                  <div
                    className="h-full w-full overflow-hidden rounded-full border-2"
                    style={{ borderColor: "var(--gold)" }}
                  >
                    <img
                      src="/img/ron.webp"
                      alt="Ron"
                      className="h-full w-full object-cover"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </div>
                </div>
                <div className="italiana mt-6 gold text-3xl">Ronald B.</div>
                <div className="mono mt-2 text-[10px] uppercase opacity-70">
                  of · San · José · &amp; · Elsewhere
                </div>
              </div>
              <div>
                <p className="mb-4 text-lg leading-relaxed">
                  {about.description[0]}
                </p>
                <p className="mb-4 text-lg leading-relaxed">
                  {about.description[2]}
                </p>
                <div className="hr my-6">
                  <span className="mono text-[10px] uppercase">ATELIER</span>
                </div>
                <div className="grid grid-cols-4 gap-3 md:grid-cols-6">
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
                      className="flex aspect-square items-center justify-center border text-2xl gold"
                      style={{ borderColor: "var(--line)" }}
                    >
                      <Icon name={t as "react"} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* now */}
          <section className="border-y" style={{ borderColor: "var(--line)" }}>
            <div className="mx-auto max-w-6xl px-6 py-16">
              <div className="mb-10 text-center">
                <div className="unicase gold text-sm">— II —</div>
                <h2 className="italiana text-5xl md:text-6xl">Diary</h2>
                <Chevron />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {nowData.slice(0, 6).map((n) => (
                  <article key={n.id} className="panel p-6">
                    <div className="mono mb-2 text-[10px] uppercase gold">
                      ENTRY · {String(n.id).padStart(3, "0")}
                    </div>
                    <h3 className="italiana mb-2 text-3xl">{n.title}</h3>
                    <p className="mb-3 leading-relaxed italic opacity-90">
                      {n.desc}
                    </p>
                    <div className="hr">
                      <span className="mono text-[10px] uppercase">
                        {formatDate(n.created_at)}
                      </span>
                    </div>
                  </article>
                ))}
                {nowData.length === 0 && (
                  <p className="md:col-span-2 text-center italic opacity-70">
                    The diary awaits its next entry.
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* resume */}
          <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-10 text-center">
              <div className="unicase gold text-sm">— III —</div>
              <h2 className="italiana text-5xl md:text-6xl">Provenance</h2>
              <Chevron />
            </div>
            <div className="relative fade">
              <div
                className="absolute top-0 bottom-0 left-1/2 w-px"
                style={{ background: "var(--line)" }}
              />
              <ul className="space-y-10">
                {experienceItems.map((w, i) => (
                  <li
                    key={i}
                    className={`relative md:grid md:grid-cols-2 md:gap-10 ${
                      i % 2 === 0 ? "" : "md:[direction:rtl]"
                    }`}
                  >
                    <div className="panel p-6 [direction:ltr]">
                      <div className="mono mb-2 text-[10px] uppercase gold">
                        {w.startDate} — {w.endDate || "Present"}
                      </div>
                      <h3 className="italiana text-3xl gold">{w.jobTitle}</h3>
                      <div className="mb-3 text-sm italic">
                        {w.url ? (
                          <a
                            href={w.url}
                            target="_blank"
                            className="underline decoration-dotted hover:text-[var(--gold)]"
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
                      <div className="mt-4 flex flex-wrap gap-2">
                        {w.tools.map((t) => (
                          <Icon
                            key={t}
                            tooltip
                            name={t}
                            className="size-4 gold"
                          />
                        ))}
                      </div>
                    </div>
                    <div
                      className="absolute top-6 left-1/2 hidden h-3 w-3 -translate-x-1/2 rotate-45 md:block"
                      style={{
                        background: "var(--gold)",
                        boxShadow: "0 0 0 4px var(--bg)",
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* portfolio */}
          <section className="border-y" style={{ borderColor: "var(--line)" }}>
            <div className="mx-auto max-w-6xl px-6 py-16">
              <div className="mb-10 text-center">
                <div className="unicase gold text-sm">— IV —</div>
                <h2 className="italiana text-5xl md:text-6xl">Collection</h2>
                <Chevron />
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {portfolioItems.map((p, i) => (
                  <article key={i} className="panel flex flex-col p-6">
                    <div className="mono mb-2 text-[10px] uppercase gold">
                      № {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="italiana mb-3 text-2xl">{p.name}</h3>
                    <p className="mb-4 flex-1 text-sm leading-relaxed italic opacity-85">
                      {p.description[0]}
                    </p>
                    <div className="flex flex-wrap gap-2 border-t pt-3" style={{ borderColor: "var(--line)" }}>
                      {p.tools.slice(0, 6).map((t) => (
                        <Icon key={t} tooltip name={t} className="size-4 gold" />
                      ))}
                    </div>
                    <div className="mt-3 flex gap-3 mono text-[10px] uppercase">
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          className="gold underline-offset-4 hover:underline"
                        >
                          ◆ Source
                        </a>
                      )}
                      {p.link && (
                        <a
                          href={p.link.href}
                          target="_blank"
                          className="gold underline-offset-4 hover:underline"
                        >
                          ◆ Visit
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* contact */}
          <section className="mx-auto max-w-4xl px-6 py-20 text-center">
            <div className="unicase gold text-sm">— V —</div>
            <h2 className="italiana text-5xl md:text-7xl">Correspondence</h2>
            <Chevron />
            <p className="mx-auto mt-6 mb-8 max-w-xl text-lg italic opacity-90">
              {contactText.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {mediaLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  className="btn"
                >
                  <Icon name={l.label as "github"} className="size-4" />
                  {l.label}
                </a>
              ))}
            </div>
          </section>

          <footer
            className="border-t py-6 text-center mono text-[10px] uppercase"
            style={{ borderColor: "var(--line)" }}
          >
            <Chevron />
            <div className="mt-3 opacity-70">
              <Icon name="calendar" className="mr-1 inline size-3" />
              {date} &nbsp;·&nbsp;
              <Icon name="clock" className="mr-1 inline size-3" />
              {time} &nbsp;·&nbsp; ronb.co
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};
