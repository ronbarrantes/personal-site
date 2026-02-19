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

export const DesignSoft = () => {
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
      className="flex min-h-screen w-full flex-col bg-[#f8f6f1] text-[#2d2a26] dark:bg-[#1c1a17] dark:text-[#eae8e4]"
      style={{ fontFamily: "Nunito, sans-serif" }}
    >
      <div className="flex min-h-screen w-full flex-col">
        <header className="flex w-full flex-wrap items-center justify-between gap-6 rounded-b-3xl bg-white/80 px-6 py-6 shadow-sm dark:bg-[#252320]/90 lg:px-12 lg:py-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-[#6b5b4f] dark:text-[#c4b5a5] lg:text-5xl">
              Welcome to my site
            </h1>
            <p className="mt-2 max-w-xl text-lg text-[#5c5349] dark:text-[#a89f94]">
              I'm glad you found it. Explore the sections below.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <NavLink to="/" className="rounded-2xl bg-[#8b7355] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#7a6348]">Main</NavLink>
            <NavLink to="/designs/b" className="rounded-2xl bg-white/80 px-4 py-2.5 text-sm font-semibold text-[#5c5349] shadow-sm transition hover:bg-white dark:bg-[#252320] dark:text-[#c4b5a5] dark:hover:bg-[#2d2a26]">System</NavLink>
            <NavLink to="/designs/brutalist" className="rounded-2xl bg-white/80 px-4 py-2.5 text-sm font-semibold text-[#5c5349] shadow-sm transition hover:bg-white dark:bg-[#252320] dark:text-[#c4b5a5] dark:hover:bg-[#2d2a26]">Brutalist</NavLink>
            <NavLink to="/designs/deco" className="rounded-2xl bg-white/80 px-4 py-2.5 text-sm font-semibold text-[#5c5349] shadow-sm transition hover:bg-white dark:bg-[#252320] dark:text-[#c4b5a5] dark:hover:bg-[#2d2a26]">Deco</NavLink>
            <NavLink to="/designs/industrial" className="rounded-2xl bg-white/80 px-4 py-2.5 text-sm font-semibold text-[#5c5349] shadow-sm transition hover:bg-white dark:bg-[#252320] dark:text-[#c4b5a5] dark:hover:bg-[#2d2a26]">Industrial</NavLink>
            <ModeToggle />
            <span className="flex items-center gap-4 rounded-2xl bg-white/60 px-4 py-2.5 text-sm font-medium text-[#5c5349] dark:bg-[#252320]/80 dark:text-[#a89f94]">
              <span className="flex items-center gap-1.5"><Icon name="calendar" className="size-4" />{date}</span>
              <span className="flex items-center gap-1.5"><Icon name="clock" className="size-4" />{time}</span>
            </span>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-10 px-6 py-10 lg:flex-row lg:gap-14 lg:px-12 lg:py-12">
          <aside className="flex shrink-0 flex-col gap-8 lg:w-72">
            <section className="rounded-3xl bg-white/70 p-6 shadow-sm dark:bg-[#252320]/70">
              <h2 className="text-xl font-bold text-[#6b5b4f] dark:text-[#c4b5a5]">{about.title}</h2>
              <div className="mt-4 space-y-3 text-base leading-relaxed text-[#5c5349] dark:text-[#a89f94]">
                {about.description.map((item, idx) => (
                  <p key={`soft-about-${idx}`}>{item}</p>
                ))}
              </div>
            </section>
            <section className="rounded-3xl bg-white/70 p-6 shadow-sm dark:bg-[#252320]/70">
              <h2 className="text-xl font-bold text-[#6b5b4f] dark:text-[#c4b5a5]">{contactText.title}</h2>
              <p className="mt-2 text-sm text-[#5c5349] dark:text-[#a89f94]">{getDescriptionText(contactText.description)}</p>
              <div className="mt-4 flex flex-col gap-2">
                {mediaLinks.map((item, idx) => (
                  <a
                    key={`soft-contact-${item.label}-${idx}`}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 text-sm font-semibold text-[#5c5349] transition hover:bg-[#8b7355]/10 dark:bg-[#2d2a26] dark:text-[#c4b5a5] dark:hover:bg-[#8b7355]/20"
                  >
                    <Icon name={item.label as IconsLisType} className="size-5" />
                    {item.label}
                  </a>
                ))}
              </div>
            </section>
          </aside>

          <main className="min-w-0 flex-1 space-y-10">
            <section className="rounded-3xl bg-white/70 p-6 shadow-sm dark:bg-[#252320]/70 lg:p-8">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-[#6b5b4f] dark:text-[#c4b5a5]">Right now</h2>
                {isAuth && <AddOrUpdateItem>Add Item</AddOrUpdateItem>}
              </div>
              {isLoading ? (
                <p className="text-[#5c5349] dark:text-[#a89f94]">Loading...</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {pagedNow.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl bg-white/80 p-5 shadow-sm dark:bg-[#2d2a26]/80"
                    >
                      <span className="text-xs font-medium text-[#8b7355] dark:text-[#a89f94]">{formatDate(item.created_at)}</span>
                      <h3 className="mt-2 text-lg font-bold text-[#5c5349] dark:text-[#eae8e4]">{item.title}</h3>
                      <p className="mt-2 text-sm text-[#5c5349] dark:text-[#a89f94]">{item.desc}</p>
                      {isAuth && (
                        <div className="mt-4 flex gap-2">
                          <AddOrUpdateItem id={item.id} title={item.title} desc={item.desc}>Edit</AddOrUpdateItem>
                          <EditDialog {...item} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-6 flex items-center justify-between text-sm font-medium text-[#5c5349] dark:text-[#a89f94]">
                <button className="rounded-2xl border-2 border-[#8b7355]/30 px-4 py-2 transition hover:border-[#8b7355]/60 disabled:opacity-40" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Previous</button>
                <span>{page} / {totalPages}</span>
                <button className="rounded-2xl border-2 border-[#8b7355]/30 px-4 py-2 transition hover:border-[#8b7355]/60 disabled:opacity-40" disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</button>
              </div>
            </section>

            <section className="rounded-3xl bg-white/70 p-6 shadow-sm dark:bg-[#252320]/70 lg:p-8">
              <h2 className="mb-2 text-2xl font-bold text-[#6b5b4f] dark:text-[#c4b5a5]">{workHistoryText.title}</h2>
              <p className="mb-6 text-sm text-[#5c5349] dark:text-[#a89f94]">{getDescriptionText(workHistoryText.description)}</p>
              <div className="grid gap-6 lg:grid-cols-2">
                {experienceItems.map((item, idx) => (
                  <div key={`${item.employer}-${idx}`} className="rounded-2xl bg-white/80 p-5 shadow-sm dark:bg-[#2d2a26]/80">
                    <div className="flex flex-wrap justify-between gap-2">
                      <h3 className="text-lg font-bold text-[#5c5349] dark:text-[#eae8e4]">{item.jobTitle}</h3>
                      <span className="text-xs font-medium text-[#8b7355] dark:text-[#a89f94]">{item.startDate} — {item.endDate ?? "Present"}</span>
                    </div>
                    <p className="text-sm text-[#5c5349] dark:text-[#a89f94]">{item.employer}</p>
                    <div className="mt-3 space-y-2 text-sm text-[#5c5349] dark:text-[#a89f94]">
                      {item.description.map((d, i) => (
                        <p key={i}>{d}</p>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tools.map((tool) => (
                        <span key={tool} className="rounded-xl bg-[#8b7355]/15 px-3 py-1 text-xs font-semibold text-[#6b5b4f] dark:bg-[#8b7355]/25 dark:text-[#c4b5a5]">{tool}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white/70 p-6 shadow-sm dark:bg-[#252320]/70 lg:p-8">
              <h2 className="mb-2 text-2xl font-bold text-[#6b5b4f] dark:text-[#c4b5a5]">{portfolioText.title}</h2>
              <p className="mb-6 text-sm text-[#5c5349] dark:text-[#a89f94]">{getDescriptionText(portfolioText.description)}</p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {portfolioItems.map((item, idx) => (
                  <div key={`${item.name}-${idx}`} className="rounded-2xl bg-white/80 p-5 shadow-sm dark:bg-[#2d2a26]/80">
                    <h3 className="text-lg font-bold text-[#5c5349] dark:text-[#eae8e4]">{item.name}</h3>
                    <div className="mt-3 space-y-2 text-sm text-[#5c5349] dark:text-[#a89f94]">
                      {item.description.map((d, i) => (
                        <p key={i}>{d}</p>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {item.github && (
                        <a href={item.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8b7355] hover:underline dark:text-[#c4b5a5]">
                          <Icon name="git" className="size-4" /> Github
                        </a>
                      )}
                      {item.link && (
                        <a href={item.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8b7355] hover:underline dark:text-[#c4b5a5]">
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
