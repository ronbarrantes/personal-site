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

const BG = "#1a1814";
const ACCENT = "#c9a227";
const TEXT = "#e8e4dc";
const MUTED = "#9c9588";

export const DesignBrutalist = () => {
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
      className="flex min-h-screen w-full flex-col"
      style={{ background: BG, color: TEXT, fontFamily: "Sora, sans-serif" }}
    >
      <div className="flex w-full flex-1 flex-col px-6 py-8 lg:px-12 lg:py-10">
        <header className="mb-10 flex flex-wrap items-start justify-between gap-6 border-b pb-8 lg:mb-14 lg:pb-10">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight lg:text-4xl" style={{ color: ACCENT }}>
              Welcome to my site
            </h1>
            <p className="mt-2 max-w-2xl text-base opacity-90">
              I'm glad you found it. Explore the sections below for updates, work history, and projects.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <NavLink
              to="/"
              className="border px-4 py-2 text-sm font-medium transition hover:bg-white/5"
              style={{ borderColor: ACCENT, color: ACCENT }}
            >
              Main
            </NavLink>
            <NavLink
              to="/designs/b"
              className="border px-4 py-2 text-sm font-medium opacity-70 transition hover:opacity-100"
              style={{ borderColor: MUTED, color: TEXT }}
            >
              System
            </NavLink>
            <NavLink
              to="/designs/deco"
              className="border px-4 py-2 text-sm font-medium opacity-70 transition hover:opacity-100"
              style={{ borderColor: MUTED, color: TEXT }}
            >
              Deco
            </NavLink>
            <NavLink
              to="/designs/soft"
              className="border px-4 py-2 text-sm font-medium opacity-70 transition hover:opacity-100"
              style={{ borderColor: MUTED, color: TEXT }}
            >
              Soft
            </NavLink>
            <NavLink
              to="/designs/industrial"
              className="border px-4 py-2 text-sm font-medium opacity-70 transition hover:opacity-100"
              style={{ borderColor: MUTED, color: TEXT }}
            >
              Industrial
            </NavLink>
            <ModeToggle />
            <span className="flex items-center gap-4 text-sm opacity-60">
              <span className="flex items-center gap-1.5">
                <Icon name="calendar" className="size-4" />
                {date}
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="clock" className="size-4" />
                {time}
              </span>
            </span>
          </div>
        </header>

        <div className="grid w-full flex-1 gap-12 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,1fr)] lg:gap-16">
          <aside className="flex flex-col gap-10">
            <section className="border-l-2 pl-5" style={{ borderColor: ACCENT }}>
              <h2 className="text-lg font-semibold" style={{ color: ACCENT }}>{about.title}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed opacity-90">
                {about.description.map((item, idx) => (
                  <p key={`brutal-about-${idx}`}>{item}</p>
                ))}
              </div>
            </section>
            <section className="border-l-2 pl-5" style={{ borderColor: ACCENT }}>
              <h2 className="text-lg font-semibold" style={{ color: ACCENT }}>{contactText.title}</h2>
              <p className="mt-2 text-sm opacity-80">{getDescriptionText(contactText.description)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {mediaLinks.map((item, idx) => (
                  <a
                    key={`brutal-contact-${item.label}-${idx}`}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border px-3 py-2 text-sm transition hover:bg-white/5"
                    style={{ borderColor: MUTED, color: TEXT }}
                  >
                    <Icon name={item.label as IconsLisType} className="size-4" />
                    {item.label}
                  </a>
                ))}
              </div>
            </section>
          </aside>

          <main className="flex flex-col gap-10">
            <section>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl font-semibold" style={{ color: ACCENT }}>Right now</h2>
                {isAuth && <AddOrUpdateItem>Add Item</AddOrUpdateItem>}
              </div>
              {isLoading ? (
                <p className="opacity-60">Loading...</p>
              ) : (
                <ul className="grid gap-4 sm:grid-cols-2">
                  {pagedNow.map((item) => (
                    <li
                      key={item.id}
                      className="border p-4 transition hover:bg-white/5"
                      style={{ borderColor: "rgba(201, 162, 39, 0.3)" }}
                    >
                      <div className="flex flex-col gap-2">
                        <span className="text-xs opacity-50">{formatDate(item.created_at)}</span>
                        <h3 className="font-semibold" style={{ color: ACCENT }}>{item.title}</h3>
                        <p className="text-sm opacity-85">{item.desc}</p>
                        {isAuth && (
                          <div className="mt-2 flex gap-2">
                            <AddOrUpdateItem id={item.id} title={item.title} desc={item.desc}>
                              Edit
                            </AddOrUpdateItem>
                            <EditDialog {...item} />
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-6 flex items-center justify-between text-sm opacity-60">
                <button
                  className="border px-3 py-1.5 transition hover:opacity-100 disabled:opacity-30"
                  style={{ borderColor: MUTED }}
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </button>
                <span>{page} / {totalPages}</span>
                <button
                  className="border px-3 py-1.5 transition hover:opacity-100 disabled:opacity-30"
                  style={{ borderColor: MUTED }}
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </button>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold" style={{ color: ACCENT }}>{workHistoryText.title}</h2>
              <p className="mb-6 text-sm opacity-80">{getDescriptionText(workHistoryText.description)}</p>
              <ul className="grid gap-6 lg:grid-cols-2">
                {experienceItems.map((item, idx) => (
                  <li key={`${item.employer}-${idx}`} className="border-l-2 pl-4" style={{ borderColor: "rgba(201, 162, 39, 0.5)" }}>
                    <div className="flex flex-wrap justify-between gap-2">
                      <h3 className="font-semibold" style={{ color: ACCENT }}>{item.jobTitle}</h3>
                      <span className="text-xs opacity-55">{item.startDate} — {item.endDate ?? "Present"}</span>
                    </div>
                    <p className="text-sm opacity-75">{item.employer}</p>
                    <div className="mt-2 space-y-1 text-sm opacity-85">
                      {item.description.map((d, i) => (
                        <p key={i}>{d}</p>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.tools.map((tool) => (
                        <span key={tool} className="border px-2 py-0.5 text-xs opacity-65" style={{ borderColor: MUTED }}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold" style={{ color: ACCENT }}>{portfolioText.title}</h2>
              <p className="mb-6 text-sm opacity-80">{getDescriptionText(portfolioText.description)}</p>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {portfolioItems.map((item, idx) => (
                  <li key={`${item.name}-${idx}`} className="border p-4" style={{ borderColor: "rgba(201, 162, 39, 0.25)" }}>
                    <h3 className="font-semibold" style={{ color: ACCENT }}>{item.name}</h3>
                    <div className="mt-2 space-y-1 text-sm opacity-85">
                      {item.description.map((d, i) => (
                        <p key={i}>{d}</p>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.github && (
                        <a href={item.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-medium opacity-80 hover:opacity-100" style={{ color: ACCENT }}>
                          <Icon name="git" className="size-4" /> Github
                        </a>
                      )}
                      {item.link && (
                        <a href={item.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-medium opacity-80 hover:opacity-100" style={{ color: ACCENT }}>
                          <Icon name="link" className="size-4" /> {item.link.label}
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};
