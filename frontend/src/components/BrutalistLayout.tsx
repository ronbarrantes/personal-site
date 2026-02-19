import { useEffect, useState } from "react";
import { NavLink } from "react-router";

import { Icon } from "@/components/icon";
import { iconFileNames, type IconsLisType } from "@/components/icon/icons-list-files";
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
import { AddOrUpdateItem, EditDialog } from "@/pages/Home";

const getDescriptionText = (value?: string | string[]) =>
  Array.isArray(value) ? value.join(" ") : value;

function hasToolIcon(tool: string): tool is IconsLisType {
  return tool in iconFileNames;
}

const TOOL_CHIP_CLASS =
  "inline-flex items-center gap-1.5 border px-2 py-0.5 text-xs opacity-65";

type ClockPosition = "header" | "footer" | "sidebar";

type Theme = {
  root: string;
  borderAccent: string;
  borderMuted: string;
  textAccent: string;
  textMuted: string;
  linkMain: string;
  linkOther: string;
  cardBorder: string;
  workBorder: string;
};

const THEMES: Record<string, { light: Theme; dark: Theme }> = {
  amber: {
    light: {
      root: "bg-[#f0f4ef] text-[#1a2418]",
      borderAccent: "border-emerald-700",
      borderMuted: "border-emerald-800/40",
      textAccent: "text-emerald-800",
      textMuted: "text-emerald-800/60",
      linkMain: "border-emerald-700 text-emerald-800 hover:bg-emerald-700/10",
      linkOther: "border-emerald-800/40 text-[#1a2418] opacity-70 hover:opacity-100",
      cardBorder: "border-emerald-600/30",
      workBorder: "border-emerald-600/50",
    },
    dark: {
      root: "dark:bg-[#1a1814] dark:text-[#e8e4dc]",
      borderAccent: "dark:border-amber-500",
      borderMuted: "dark:border-amber-700/50",
      textAccent: "dark:text-amber-400",
      textMuted: "dark:text-amber-600/80",
      linkMain: "dark:border-amber-400 dark:text-amber-400 dark:hover:bg-white/5",
      linkOther: "dark:border-amber-700/50 dark:text-[#e8e4dc] dark:opacity-70 dark:hover:opacity-100",
      cardBorder: "dark:border-amber-500/30",
      workBorder: "dark:border-amber-500/50",
    },
  },
  slate: {
    light: {
      root: "bg-[#f0f4ef] text-[#1a2418]",
      borderAccent: "border-emerald-700",
      borderMuted: "border-emerald-800/40",
      textAccent: "text-emerald-800",
      textMuted: "text-emerald-800/60",
      linkMain: "border-emerald-700 text-emerald-800 hover:bg-emerald-700/10",
      linkOther: "border-emerald-800/40 text-[#1a2418] opacity-70 hover:opacity-100",
      cardBorder: "border-emerald-600/30",
      workBorder: "border-emerald-600/50",
    },
    dark: {
      root: "dark:bg-[#1a1814] dark:text-[#e8e4dc]",
      borderAccent: "dark:border-amber-500",
      borderMuted: "dark:border-amber-700/50",
      textAccent: "dark:text-amber-400",
      textMuted: "dark:text-amber-600/80",
      linkMain: "dark:border-amber-400 dark:text-amber-400 dark:hover:bg-white/5",
      linkOther: "dark:border-amber-700/50 dark:text-[#e8e4dc] dark:opacity-70 dark:hover:opacity-100",
      cardBorder: "dark:border-amber-500/30",
      workBorder: "dark:border-amber-500/50",
    },
  },
  moss: {
    light: {
      root: "bg-[#f0f4ef] text-[#1a2418]",
      borderAccent: "border-emerald-700",
      borderMuted: "border-emerald-800/40",
      textAccent: "text-emerald-800",
      textMuted: "text-emerald-800/60",
      linkMain: "border-emerald-700 text-emerald-800 hover:bg-emerald-700/10",
      linkOther: "border-emerald-800/40 text-[#1a2418] opacity-70 hover:opacity-100",
      cardBorder: "border-emerald-600/30",
      workBorder: "border-emerald-600/50",
    },
    dark: {
      root: "dark:bg-[#1a1814] dark:text-[#e8e4dc]",
      borderAccent: "dark:border-amber-500",
      borderMuted: "dark:border-amber-700/50",
      textAccent: "dark:text-amber-400",
      textMuted: "dark:text-amber-600/80",
      linkMain: "dark:border-amber-400 dark:text-amber-400 dark:hover:bg-white/5",
      linkOther: "dark:border-amber-700/50 dark:text-[#e8e4dc] dark:opacity-70 dark:hover:opacity-100",
      cardBorder: "dark:border-amber-500/30",
      workBorder: "dark:border-amber-500/50",
    },
  },
};

type BrutalistLayoutProps = {
  variant: "amber" | "slate" | "moss";
  clockPosition: ClockPosition;
};

export function BrutalistLayout({ variant, clockPosition }: BrutalistLayoutProps) {
  const { date, time } = useClock();
  const { api } = useRoutes();
  const nowData = api.now.get.data || [];
  const isLoading = api.now.get.isLoading;
  const { isAuth } = useAuthStore();
  const pageSize = 6;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(nowData.length / pageSize));
  const theme = THEMES[variant];
  const l = theme.light;
  const d = theme.dark;

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pagedNow = nowData.slice((page - 1) * pageSize, page * pageSize);

  const designLinks = [
    { to: "/designs/brutalist", label: "Amber" },
    { to: "/designs/brutalist/slate", label: "Slate" },
    { to: "/designs/brutalist/moss", label: "Moss" },
  ];

  const ClockBlock = () => (
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
  );

  return (
    <div
      className={`flex min-h-screen w-full flex-col font-['Sora',sans-serif] ${l.root} ${d.root}`}
    >
      <div className="flex w-full flex-1 flex-col px-6 py-8 lg:px-12 lg:py-10">
        <header
          className={`mb-10 flex flex-wrap items-start justify-between gap-6 border-b-2 pb-8 lg:mb-14 lg:pb-10 ${l.borderMuted} ${d.borderMuted}`}
        >
          <div>
            <h1
              className={`text-3xl font-semibold tracking-tight lg:text-4xl ${l.textAccent} ${d.textAccent}`}
            >
              Welcome to my site
            </h1>
            <p className="mt-2 max-w-2xl text-base opacity-90">
              I'm glad you found it. Explore the sections below for updates, work
              history, and projects.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <NavLink
              to="/"
              className={`border px-4 py-2 text-sm font-medium transition ${l.linkMain} ${d.linkMain}`}
            >
              Main
            </NavLink>
            {designLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={`border px-4 py-2 text-sm font-medium transition ${l.linkOther} ${d.linkOther}`}
              >
                {label}
              </NavLink>
            ))}
            <ModeToggle />
            {clockPosition === "header" && <ClockBlock />}
          </div>
        </header>

        <div className="grid w-full flex-1 gap-12 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,1fr)] lg:gap-16">
          <aside className="flex flex-col gap-10">
            <section className={`border-l-2 pl-5 ${l.borderAccent} ${d.borderAccent}`}>
              <h2 className={`text-lg font-semibold ${l.textAccent} ${d.textAccent}`}>
                {about.title}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed opacity-90">
                {about.description.map((item, idx) => (
                  <p key={`brutal-about-${idx}`}>{item}</p>
                ))}
              </div>
            </section>
            <section className={`border-l-2 pl-5 ${l.borderAccent} ${d.borderAccent}`}>
              <h2 className={`text-lg font-semibold ${l.textAccent} ${d.textAccent}`}>
                {contactText.title}
              </h2>
              <p className="mt-2 text-sm opacity-80">
                {getDescriptionText(contactText.description)}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {mediaLinks.map((item, idx) => (
                  <a
                    key={`brutal-contact-${item.label}-${idx}`}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 border px-3 py-2 text-sm transition hover:opacity-100 ${l.linkOther} ${d.linkOther}`}
                  >
                    <Icon name={item.label as IconsLisType} className="size-4" />
                    {item.label}
                  </a>
                ))}
              </div>
            </section>
            {clockPosition === "sidebar" && (
              <section className={`border-l-2 pl-5 ${l.borderAccent} ${d.borderAccent}`}>
                <ClockBlock />
              </section>
            )}
          </aside>

          <main className="flex flex-col gap-10">
            <section>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h2
                  className={`text-xl font-semibold ${l.textAccent} ${d.textAccent}`}
                >
                  Right now
                </h2>
                {isAuth && <AddOrUpdateItem>Add Item</AddOrUpdateItem>}
              </div>
              {isLoading ? (
                <p className="opacity-60">Loading...</p>
              ) : (
                <ul className="grid gap-4 sm:grid-cols-2">
                  {pagedNow.map((item) => (
                    <li
                      key={item.id}
                      className={`border p-4 transition hover:bg-black/5 dark:hover:bg-white/5 ${l.cardBorder} ${d.cardBorder}`}
                    >
                      <div className="flex flex-col gap-2">
                        <span className="text-xs opacity-50">
                          {formatDate(item.created_at)}
                        </span>
                        <h3
                          className={`font-semibold ${l.textAccent} ${d.textAccent}`}
                        >
                          {item.title}
                        </h3>
                        <p className="text-sm opacity-85">{item.desc}</p>
                        {isAuth && (
                          <div className="mt-2 flex gap-2">
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
                    </li>
                  ))}
                </ul>
              )}
              <div
                className={`mt-6 flex items-center justify-between text-sm opacity-60`}
              >
                <button
                  className={`border px-3 py-1.5 transition hover:opacity-100 disabled:opacity-30 ${l.borderMuted} ${d.borderMuted}`}
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </button>
                <span>
                  {page} / {totalPages}
                </span>
                <button
                  className={`border px-3 py-1.5 transition hover:opacity-100 disabled:opacity-30 ${l.borderMuted} ${d.borderMuted}`}
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </button>
              </div>
            </section>

            <section>
              <h2
                className={`mb-4 text-xl font-semibold ${l.textAccent} ${d.textAccent}`}
              >
                {workHistoryText.title}
              </h2>
              <p className="mb-6 text-sm opacity-80">
                {getDescriptionText(workHistoryText.description)}
              </p>
              <ul className="grid gap-6 lg:grid-cols-2">
                {experienceItems.map((item, idx) => (
                  <li
                    key={`${item.employer}-${idx}`}
                    className={`flex flex-col border-l-2 pl-4 ${l.workBorder} ${d.workBorder}`}
                  >
                    <div className="flex flex-wrap justify-between gap-2">
                      <h3
                        className={`font-semibold ${l.textAccent} ${d.textAccent}`}
                      >
                        {item.jobTitle}
                      </h3>
                      <span className="text-xs opacity-55">
                        {item.startDate} — {item.endDate ?? "Present"}
                      </span>
                    </div>
                    <p className="text-sm opacity-75">{item.employer}</p>
                    <div className="mt-2 flex flex-1 flex-col space-y-1 text-sm opacity-85">
                      {item.description.map((d, i) => (
                        <p key={i}>{d}</p>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.tools.map((tool) => (
                        <span
                          key={tool}
                          className={`${TOOL_CHIP_CLASS} ${l.borderMuted} ${d.borderMuted}`}
                        >
                          {hasToolIcon(tool) && (
                            <Icon
                              name={tool}
                              className="size-3.5 shrink-0 opacity-80"
                            />
                          )}
                          {tool}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2
                className={`mb-4 text-xl font-semibold ${l.textAccent} ${d.textAccent}`}
              >
                {portfolioText.title}
              </h2>
              <p className="mb-6 text-sm opacity-80">
                {getDescriptionText(portfolioText.description)}
              </p>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {portfolioItems.map((item, idx) => (
                  <li
                    key={`${item.name}-${idx}`}
                    className={`flex flex-col border p-4 ${l.cardBorder} ${d.cardBorder}`}
                  >
                    <h3
                      className={`font-semibold ${l.textAccent} ${d.textAccent}`}
                    >
                      {item.name}
                    </h3>
                    <div className="mt-2 flex flex-1 flex-col space-y-1 text-sm opacity-85">
                      {item.description.map((d, i) => (
                        <p key={i}>{d}</p>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.github && (
                        <a
                          href={item.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 text-xs font-medium opacity-80 hover:opacity-100 ${l.textAccent} ${d.textAccent}`}
                        >
                          <Icon name="git" className="size-4" /> Github
                        </a>
                      )}
                      {item.link && (
                        <a
                          href={item.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 text-xs font-medium opacity-80 hover:opacity-100 ${l.textAccent} ${d.textAccent}`}
                        >
                          <Icon name="link" className="size-4" />{" "}
                          {item.link.label}
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

      {clockPosition === "footer" && (
        <footer
          className={`flex items-center justify-end gap-6 border-t px-6 py-3 ${l.borderMuted} ${d.borderMuted}`}
        >
          <ClockBlock />
        </footer>
      )}
    </div>
  );
}
