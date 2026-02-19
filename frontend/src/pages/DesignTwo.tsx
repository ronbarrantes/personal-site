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

const DataChip = ({ label }: { label: string }) => (
  <span className="rounded-full border border-slate-900/15 bg-slate-900/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 font-['Fira_Mono'] dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
    {label}
  </span>
);

const getDescriptionText = (value?: string | string[]) =>
  Array.isArray(value) ? value.join(" ") : value;

export const DesignTwo = () => {
  const { date, time } = useClock();
  const { api } = useRoutes();
  const nowData = api.now.get.data || [];
  const isLoading = api.now.get.isLoading;
  const { isAuth } = useAuthStore();
  const pageSize = 4;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(nowData.length / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pagedNow = nowData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f6f2] text-slate-900 dark:bg-[#0a0f0f] dark:text-slate-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:36px_36px] opacity-70 dark:bg-[linear-gradient(to_right,rgba(248,250,252,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(248,250,252,0.08)_1px,transparent_1px)]"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-24 pt-10 font-['Space_Grotesk'] md:pt-16">
        <header className="flex flex-col gap-6 border border-slate-900/10 bg-white/60 p-6 backdrop-blur motion-safe:animate-[slide-fade-in_0.8s_ease-out] dark:border-white/10 dark:bg-black/30">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
              System
            </p>
            <h1 className="text-4xl font-semibold font-['Unbounded'] md:text-5xl">
              Welcome to my site
            </h1>
            <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              I'm glad you found it. Explore the modules below for live updates,
              work history, and selected projects.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <NavLink
              to="/"
              className="rounded-none border border-slate-900/20 bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-slate-800 dark:border-white/20 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Main
            </NavLink>
            <NavLink
              to="/designs/brutalist"
              className="rounded-none border border-slate-900/20 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-700 transition hover:bg-white dark:border-white/20 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
              Brutalist
            </NavLink>
            <NavLink
              to="/designs/deco"
              className="rounded-none border border-slate-900/20 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-700 transition hover:bg-white dark:border-white/20 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
              Deco
            </NavLink>
            <NavLink
              to="/designs/soft"
              className="rounded-none border border-slate-900/20 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-700 transition hover:bg-white dark:border-white/20 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
              Soft
            </NavLink>
            <NavLink
              to="/designs/industrial"
              className="rounded-none border border-slate-900/20 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-700 transition hover:bg-white dark:border-white/20 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
              Industrial
            </NavLink>
            <ModeToggle />
            <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
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

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="flex flex-col gap-6">
            <section className="border border-slate-900/10 bg-white/70 p-6 shadow-[8px_8px_0px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-black/30 dark:shadow-[8px_8px_0px_rgba(248,250,252,0.12)]">
              <div className="flex flex-col gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
                  About me
                </p>
                <h2 className="text-2xl font-semibold">{about.title}</h2>
                <div className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-300">
                  {about.description.map((item, idx) => (
                    <p key={`design-two-about-${idx}`}>{item}</p>
                  ))}
                </div>
              </div>
            </section>

            <section className="border border-slate-900/10 bg-white/70 p-6 shadow-[8px_8px_0px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-black/30 dark:shadow-[8px_8px_0px_rgba(248,250,252,0.12)]">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
                {contactText.title}
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {getDescriptionText(contactText.description)}
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {mediaLinks.map((item, idx) => (
                  <a
                    key={`design-two-contact-${item.label}-${idx}`}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 border border-slate-900/10 bg-white/70 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-700 transition hover:border-slate-900/30 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:text-white"
                  >
                    {item.label}
                    <Icon name={item.label as IconsLisType} className="size-5" />
                  </a>
                ))}
              </div>
            </section>
          </aside>

          <main className="flex flex-col gap-6">
            <section className="border border-slate-900/10 bg-white/70 p-6 shadow-[8px_8px_0px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-black/30 dark:shadow-[8px_8px_0px_rgba(248,250,252,0.12)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
                    Now feed
                  </p>
                  <h2 className="text-2xl font-semibold">Right now</h2>
                </div>
                {isAuth && <AddOrUpdateItem>Add Item</AddOrUpdateItem>}
              </div>
              <div className="mt-6 flex flex-col gap-4">
                {isLoading ? (
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Loading updates...
                  </span>
                ) : (
                  pagedNow.map((item) => (
                    <div
                      key={item.id}
                      className="border border-slate-900/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col gap-2">
                          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                            {formatDate(item.created_at)}
                          </span>
                          <h3 className="text-lg font-semibold">
                            {item.title}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            {item.desc}
                          </p>
                        </div>
                        {isAuth && (
                          <div className="flex flex-col gap-2">
                            <AddOrUpdateItem
                              id={item.id}
                              title={item.title}
                              desc={item.desc}
                            >
                              Edit
                            </AddOrUpdateItem>
                            <EditDialog {...item} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-6 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                <button
                  className="border border-slate-900/20 px-3 py-1 transition hover:border-slate-900/40 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/20 dark:hover:border-white/40"
                  disabled={page === 1}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                >
                  Prev
                </button>
                <span>
                  Page {page} / {totalPages}
                </span>
                <button
                  className="border border-slate-900/20 px-3 py-1 transition hover:border-slate-900/40 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/20 dark:hover:border-white/40"
                  disabled={page === totalPages}
                  onClick={() =>
                    setPage((prev) => Math.min(totalPages, prev + 1))
                  }
                >
                  Next
                </button>
              </div>
            </section>

            <section className="border border-slate-900/10 bg-white/70 p-6 shadow-[8px_8px_0px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-black/30 dark:shadow-[8px_8px_0px_rgba(248,250,252,0.12)]">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
                {workHistoryText.title}
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {getDescriptionText(workHistoryText.description)}
              </p>
              <div className="mt-4 grid gap-4">
                {experienceItems.map((item, idx) => (
                  <div
                    key={`${item.employer}-${item.jobTitle}-${idx}`}
                    className="border border-slate-900/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {item.jobTitle}
                        </h3>
                        <span className="text-sm text-slate-600 dark:text-slate-300">
                          {item.employer}
                        </span>
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                        {item.startDate} - {item.endDate ?? "Present"}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300">
                      {item.description.map((desc, descIdx) => (
                        <p key={`${item.employer}-${descIdx}`}>{desc}</p>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tools.map((tool, toolIdx) => (
                        <DataChip
                          key={`${item.employer}-${tool}-${toolIdx}`}
                          label={tool}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="border border-slate-900/10 bg-white/70 p-6 shadow-[8px_8px_0px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-black/30 dark:shadow-[8px_8px_0px_rgba(248,250,252,0.12)]">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
                {portfolioText.title}
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {getDescriptionText(portfolioText.description)}
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {portfolioItems.map((item, idx) => (
                  <div
                    key={`${item.name}-${idx}`}
                    className="flex h-full flex-col justify-between border border-slate-900/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <div className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300">
                        {item.description.map((desc, descIdx) => (
                          <p key={`${item.name}-${descIdx}`}>{desc}</p>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">
                      {item.github && (
                        <a
                          href={item.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 border border-slate-900/10 bg-white/70 px-3 py-2 transition hover:border-slate-900/30 dark:border-white/10 dark:bg-white/5"
                        >
                          <Icon name="git" className="size-4" />
                          Github
                        </a>
                      )}
                      {item.link && (
                        <a
                          href={item.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 border border-slate-900/10 bg-white/70 px-3 py-2 transition hover:border-slate-900/30 dark:border-white/10 dark:bg-white/5"
                        >
                          <Icon name="link" className="size-4" />
                          {item.link.label}
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
