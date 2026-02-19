import { useEffect, useState } from "react";
import { NavLink } from "react-router";

import { Icon } from "@/components/icon";
import { ModeToggle } from "@/components/mode-toggle";
import {
  about,
  contactText,
  experienceItems,
  mediaLinks,
  portfolioItems,
  portfolioText,
  workHistoryText,
} from "@/data/text";
import { useClock } from "@/hooks/use-clock";
import { useRoutes } from "@/hooks/use-api";
import { useAuthStore } from "@/store/use-auth";
import { formatDate } from "@/utils/time";
import { AddOrUpdateItem, EditDialog } from "./Home";
import type { IconsLisType } from "@/components/icon/icons-list-files";

const getDescriptionText = (value?: string | string[]) =>
  Array.isArray(value) ? value.join(" ") : value;

const GOLD = "#c9a227";
const CREAM = "#f5f0e6";

export const DesignDeco = () => {
  const { date, time } = useClock();
  const { api } = useRoutes();
  const nowData = api.now.get.data || [];
  const isLoading = api.now.get.isLoading;
  const { isAuth } = useAuthStore();
  const pageSize = 6;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(nowData.length / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pagedNow = nowData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div
      className="flex min-h-screen w-full flex-col bg-[#0f1629] text-[#f5f0e6]"
      style={{ fontFamily: "Cinzel, serif" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, ${GOLD} 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${GOLD} 0%, transparent 40%)`,
        }}
      />
      <div className="relative flex min-h-screen w-full flex-col">
        <header className="flex w-full flex-wrap items-end justify-between gap-6 border-b px-6 py-6 lg:px-12 lg:py-8" style={{ borderColor: `${GOLD}40` }}>
          <div>
            <h1 className="text-4xl font-semibold tracking-wide lg:text-5xl" style={{ color: GOLD }}>
              Welcome to my site
            </h1>
            <p className="mt-2 max-w-xl text-base opacity-80">
              I'm glad you found it. Explore below.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <NavLink to="/" className="text-sm font-medium opacity-80 hover:opacity-100" style={{ color: GOLD }}>Main</NavLink>
            <NavLink to="/designs/b" className="text-sm opacity-70 hover:opacity-100">System</NavLink>
            <NavLink to="/designs/brutalist" className="text-sm opacity-70 hover:opacity-100">Brutalist</NavLink>
            <NavLink to="/designs/soft" className="text-sm opacity-70 hover:opacity-100">Soft</NavLink>
            <NavLink to="/designs/industrial" className="text-sm opacity-70 hover:opacity-100">Industrial</NavLink>
            <ModeToggle />
            <span className="flex items-center gap-4 text-sm opacity-60">
              <span className="flex items-center gap-1.5"><Icon name="calendar" className="size-4" />{date}</span>
              <span className="flex items-center gap-1.5"><Icon name="clock" className="size-4" />{time}</span>
            </span>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-12 px-6 py-10 lg:flex-row lg:gap-16 lg:px-12 lg:py-12">
          <aside className="flex shrink-0 flex-col gap-10 lg:w-80">
            <section className="border-l-4 pl-5" style={{ borderColor: GOLD }}>
              <h2 className="text-lg font-semibold" style={{ color: GOLD }}>{about.title}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed opacity-85">
                {about.description.map((item, idx) => (
                  <p key={`deco-about-${idx}`}>{item}</p>
                ))}
              </div>
            </section>
            <section className="border-l-4 pl-5" style={{ borderColor: GOLD }}>
              <h2 className="text-lg font-semibold" style={{ color: GOLD }}>{contactText.title}</h2>
              <p className="mt-2 text-sm opacity-80">{getDescriptionText(contactText.description)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {mediaLinks.map((item, idx) => (
                  <a
                    key={`deco-contact-${item.label}-${idx}`}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border px-3 py-2 text-sm transition hover:bg-white/5"
                    style={{ borderColor: `${GOLD}60`, color: CREAM }}
                  >
                    <Icon name={item.label as IconsLisType} className="size-4" />
                    {item.label}
                  </a>
                ))}
              </div>
            </section>
          </aside>

          <main className="min-w-0 flex-1 space-y-12">
            <section>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold" style={{ color: GOLD }}>Right now</h2>
                {isAuth && <AddOrUpdateItem>Add Item</AddOrUpdateItem>}
              </div>
              {isLoading ? (
                <p className="opacity-60">Loading...</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {pagedNow.map((item) => (
                    <div
                      key={item.id}
                      className="border p-5 transition hover:bg-white/5"
                      style={{ borderColor: `${GOLD}35` }}
                    >
                      <span className="text-xs opacity-55">{formatDate(item.created_at)}</span>
                      <h3 className="mt-1 font-semibold" style={{ color: GOLD }}>{item.title}</h3>
                      <p className="mt-2 text-sm opacity-85">{item.desc}</p>
                      {isAuth && (
                        <div className="mt-3 flex gap-2">
                          <AddOrUpdateItem id={item.id} title={item.title} desc={item.desc}>Edit</AddOrUpdateItem>
                          <EditDialog {...item} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-6 flex items-center justify-between text-sm opacity-60">
                <button className="border px-3 py-1.5 hover:opacity-100 disabled:opacity-30" style={{ borderColor: `${GOLD}50` }} disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
                <span>{page} / {totalPages}</span>
                <button className="border px-3 py-1.5 hover:opacity-100 disabled:opacity-30" style={{ borderColor: `${GOLD}50` }} disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</button>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold" style={{ color: GOLD }}>{workHistoryText.title}</h2>
              <p className="mb-6 text-sm opacity-75">{getDescriptionText(workHistoryText.description)}</p>
              <div className="grid gap-6 lg:grid-cols-2">
                {experienceItems.map((item, idx) => (
                  <div key={`${item.employer}-${idx}`} className="border-l-4 border-t border-b border-r p-5" style={{ borderColor: `${GOLD}30` }}>
                    <div className="flex flex-wrap justify-between gap-2">
                      <h3 className="font-semibold" style={{ color: GOLD }}>{item.jobTitle}</h3>
                      <span className="text-xs opacity-55">{item.startDate} — {item.endDate ?? "Present"}</span>
                    </div>
                    <p className="text-sm opacity-75">{item.employer}</p>
                    <div className="mt-3 space-y-2 text-sm opacity-85">
                      {item.description.map((d, i) => (
                        <p key={i}>{d}</p>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tools.map((tool) => (
                        <span key={tool} className="border px-2 py-0.5 text-xs opacity-65" style={{ borderColor: `${GOLD}40` }}>{tool}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold" style={{ color: GOLD }}>{portfolioText.title}</h2>
              <p className="mb-6 text-sm opacity-75">{getDescriptionText(portfolioText.description)}</p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {portfolioItems.map((item, idx) => (
                  <div key={`${item.name}-${idx}`} className="border p-5" style={{ borderColor: `${GOLD}25` }}>
                    <h3 className="font-semibold" style={{ color: GOLD }}>{item.name}</h3>
                    <div className="mt-2 space-y-1 text-sm opacity-85">
                      {item.description.map((d, i) => (
                        <p key={i}>{d}</p>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {item.github && (
                        <a href={item.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-medium opacity-80 hover:opacity-100" style={{ color: GOLD }}>
                          <Icon name="git" className="size-4" /> Github
                        </a>
                      )}
                      {item.link && (
                        <a href={item.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-medium opacity-80 hover:opacity-100" style={{ color: GOLD }}>
                          <Icon name="link" className="size-4" /> {item.link.label}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};
