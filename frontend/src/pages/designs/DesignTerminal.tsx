import { useEffect, useState } from "react";

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
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=VT323&display=swap');

.crt {
  --bg: #05080a;
  --panel: #0a1113;
  --fg: #7ef29d;
  --dim: #3b8159;
  --amber: #ffb86b;
  --red: #ff5f6d;
  font-family: 'JetBrains Mono', monospace;
  background: var(--bg);
  color: var(--fg);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}
.crt.light {
  --bg: #e8e2cf;
  --panel: #ddd5be;
  --fg: #1b2b1f;
  --dim: #5d6a4f;
  --amber: #7a4a00;
  --red: #9a2a2a;
}
.crt::before {
  content: '';
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0,0,0,0.18) 0px,
    rgba(0,0,0,0.18) 1px,
    transparent 1px,
    transparent 3px
  );
  pointer-events: none;
  z-index: 50;
  mix-blend-mode: multiply;
}
.crt.light::before { opacity: 0.25; }
.crt::after {
  content: '';
  position: fixed;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%);
  pointer-events: none;
  z-index: 49;
}
.crt.light::after {
  background: radial-gradient(ellipse at center, transparent 55%, rgba(80,60,20,0.3) 100%);
}
.crt .display {
  font-family: 'VT323', monospace;
}
.crt .glow {
  text-shadow: 0 0 6px var(--fg), 0 0 16px rgba(126,242,157,0.35);
}
.crt.light .glow { text-shadow: none; }
.crt .panel {
  border: 1px solid var(--dim);
  background: var(--panel);
  position: relative;
}
.crt .panel::before {
  content: '';
  position: absolute;
  left: 0; right: 0; top: 0;
  height: 22px;
  border-bottom: 1px solid var(--dim);
  background: linear-gradient(90deg, var(--dim) 0, var(--dim) 100%);
  opacity: 0.25;
}
.crt .panel-title {
  position: absolute;
  top: 2px; left: 10px;
  font-size: 11px;
  letter-spacing: 0.15em;
  color: var(--fg);
  z-index: 1;
}
.crt .btn {
  border: 1px solid var(--fg);
  padding: 6px 14px;
  background: transparent;
  color: var(--fg);
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
  transition: all 0.15s;
}
.crt .btn:hover { background: var(--fg); color: var(--bg); }
@keyframes crt-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
.crt .cursor { animation: crt-blink 1s step-end infinite; }
@keyframes crt-boot {
  from { opacity: 0; transform: translateY(-10px); }
}
.crt .boot > * { animation: crt-boot 0.6s both; }
.crt .boot > *:nth-child(2) { animation-delay: 0.1s; }
.crt .boot > *:nth-child(3) { animation-delay: 0.2s; }
.crt .boot > *:nth-child(4) { animation-delay: 0.3s; }
.crt .boot > *:nth-child(5) { animation-delay: 0.4s; }
.crt .ascii {
  white-space: pre;
  font-family: 'VT323', monospace;
  line-height: 0.95;
  font-size: 14px;
  color: var(--dim);
}
`;

const banner = `
 ██████╗  ██████╗  ███╗   ██╗   ██████╗  ██████╗
 ██╔══██╗██╔═══██╗ ████╗  ██║   ██╔══██╗██╔═══██╗
 ██████╔╝██║   ██║ ██╔██╗ ██║   ██████╔╝██║   ██║
 ██╔══██╗██║   ██║ ██║╚██╗██║   ██╔══██╗██║   ██║
 ██║  ██║╚██████╔╝ ██║ ╚████║██╗██████╔╝╚██████╔╝
 ╚═╝  ╚═╝ ╚═════╝  ╚═╝  ╚═══╝╚═╝╚═════╝  ╚═════╝`;

export const DesignTerminal = () => {
  const { theme, setTheme } = useTheme();
  const { date, time } = useClock();
  const { api } = useRoutes();
  const nowData = api.now.get.data || [];
  const [typed, setTyped] = useState("");
  const full = "> cat ~/whoami.txt";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(t);
    }, 55);
    return () => clearInterval(t);
  }, []);

  const isLight = theme === "light";

  return (
    <>
      <style>{styles}</style>
      <div className={`crt ${isLight ? "light" : ""}`}>
        <div className="relative z-10 mx-auto max-w-6xl p-4 md:p-8">
          {/* top bar */}
          <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-[0.2em]">
            <div className="flex items-center gap-3">
              <span className="glow">●</span>
              <span>ronOS v4.7 — tty1</span>
            </div>
            <div className="flex items-center gap-4">
              <span>
                <Icon name="clock" className="mr-1 inline size-3" /> {time}
              </span>
              <span className="hidden md:inline">
                <Icon name="calendar" className="mr-1 inline size-3" /> {date}
              </span>
              <button
                className="btn"
                onClick={() => setTheme(isLight ? "dark" : "light")}
              >
                {isLight ? "dark" : "light"}
              </button>
              <Link to="/designs" className="btn">
                exit
              </Link>
            </div>
          </div>

          <pre className="ascii glow mb-6 overflow-x-auto">{banner}</pre>

          <div className="grid gap-4 md:grid-cols-3">
            {/* whoami panel */}
            <section className="panel boot col-span-2 p-5 pt-8">
              <span className="panel-title">WHOAMI.TXT</span>
              <div className="mb-3 text-sm opacity-80">
                {typed}
                <span className="cursor">_</span>
              </div>
              <h1 className="display glow mb-4 text-6xl md:text-8xl">
                ron.<span style={{ color: "var(--amber)" }}>exe</span>
              </h1>
              <p className="mb-3 max-w-prose text-sm leading-relaxed">
                {about.description[0]}
              </p>
              <p className="max-w-prose text-sm leading-relaxed opacity-80">
                {about.description[1]}
              </p>
              <div className="mt-5 flex gap-2">
                {mediaLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    className="btn flex items-center gap-2"
                  >
                    <Icon name={l.label as "github"} className="size-3" />
                    {l.label}
                  </a>
                ))}
              </div>
            </section>

            {/* system panel */}
            <section className="panel boot p-5 pt-8">
              <span className="panel-title">SYSTEM</span>
              <ul className="space-y-2 text-xs">
                <li className="flex justify-between">
                  <span className="opacity-60">host</span>
                  <span>ronb.co</span>
                </li>
                <li className="flex justify-between">
                  <span className="opacity-60">uptime</span>
                  <span>6 years</span>
                </li>
                <li className="flex justify-between">
                  <span className="opacity-60">role</span>
                  <span>UI engineer</span>
                </li>
                <li className="flex justify-between">
                  <span className="opacity-60">locale</span>
                  <span>en_US.UTF-8</span>
                </li>
                <li className="flex justify-between">
                  <span className="opacity-60">shell</span>
                  <span>/bin/zsh</span>
                </li>
              </ul>
              <div className="mt-4 border-t border-current/30 pt-3">
                <div className="mb-1 text-xs opacity-60">STACK</div>
                <div className="flex flex-wrap gap-2 text-lg">
                  {[
                    "typescript",
                    "react",
                    "golang",
                    "postgresql",
                    "tailwind",
                    "vite",
                    "git",
                  ].map((t) => (
                    <Icon key={t} tooltip name={t as "react"} />
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* now */}
          <section className="panel boot mt-4 p-5 pt-8">
            <span className="panel-title">~/now &gt; tail -f</span>
            <div className="mb-3 text-xs opacity-60">
              streaming {nowData.length} record(s)
            </div>
            <ul className="space-y-3">
              {nowData.slice(0, 6).map((n) => (
                <li key={n.id} className="flex gap-3 text-sm">
                  <span style={{ color: "var(--amber)" }}>[{n.id}]</span>
                  <div className="flex-1">
                    <div className="glow font-bold">{n.title}</div>
                    <div className="text-xs opacity-80">{n.desc}</div>
                    <div className="text-xs opacity-50">
                      {formatDate(n.created_at)}
                    </div>
                  </div>
                </li>
              ))}
              {nowData.length === 0 && (
                <li className="text-xs opacity-60">
                  no records. connection idle.
                </li>
              )}
            </ul>
          </section>

          {/* work */}
          <section className="panel boot mt-4 p-5 pt-8">
            <span className="panel-title">~/work &gt; ls -la</span>
            <table className="w-full text-xs">
              <thead className="opacity-60">
                <tr className="text-left">
                  <th className="py-1">DATE</th>
                  <th>ROLE</th>
                  <th className="hidden md:table-cell">EMPLOYER</th>
                  <th className="hidden md:table-cell">STACK</th>
                </tr>
              </thead>
              <tbody>
                {experienceItems.map((w, i) => (
                  <tr key={i} className="border-t border-current/15">
                    <td className="py-2 opacity-70">
                      {w.startDate}→{w.endDate || "now"}
                    </td>
                    <td className="py-2">
                      <span className="glow">{w.jobTitle}</span>
                    </td>
                    <td className="hidden py-2 md:table-cell">
                      {w.url ? (
                        <a
                          href={w.url}
                          target="_blank"
                          className="underline hover:no-underline"
                          style={{ color: "var(--amber)" }}
                        >
                          {w.employer}
                        </a>
                      ) : (
                        w.employer
                      )}
                    </td>
                    <td className="hidden py-2 md:table-cell">
                      <div className="flex gap-1">
                        {w.tools.slice(0, 5).map((t) => (
                          <Icon key={t} tooltip name={t} className="size-3" />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* portfolio */}
          <section className="panel boot mt-4 p-5 pt-8">
            <span className="panel-title">~/projects</span>
            <div className="grid gap-3 md:grid-cols-2">
              {portfolioItems.map((p, i) => (
                <div key={i} className="border border-current/20 p-3">
                  <div className="glow mb-1 text-sm font-bold">
                    $ ./{p.name.toLowerCase().replace(/\s/g, "-")}
                  </div>
                  <p className="mb-2 text-xs opacity-80">{p.description[0]}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {p.tools.slice(0, 6).map((t) => (
                        <Icon key={t} tooltip name={t} className="size-3" />
                      ))}
                    </div>
                    <div className="flex gap-3 text-xs">
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          className="underline hover:no-underline"
                        >
                          src
                        </a>
                      )}
                      {p.link && (
                        <a
                          href={p.link.href}
                          target="_blank"
                          className="underline hover:no-underline"
                          style={{ color: "var(--amber)" }}
                        >
                          live↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="panel boot mt-4 p-5 pt-8">
            <span className="panel-title">~/contact</span>
            <div className="text-sm">
              <span className="opacity-60">{contactText.description}</span>
            </div>
            <div className="mt-3 flex gap-2">
              {mediaLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  className="btn flex items-center gap-2"
                >
                  <Icon name={l.label as "github"} className="size-3" />
                  {l.label}
                </a>
              ))}
            </div>
          </section>

          <div className="mt-6 text-xs opacity-50">
            <span className="cursor">_</span> connection established · 56.6 kbps
            · {time}
          </div>
        </div>
      </div>
    </>
  );
};
