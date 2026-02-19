import { useEffect, useState } from "react";

import { Icon } from "@/components/icon";
import { iconFileNames, type IconsLisType } from "@/components/icon/icons-list-files";
import {
  about,
  contactText,
  experienceItems,
  mediaLinks,
  portfolioItems,
  portfolioText,
  workHistoryText,
} from "@/data/text";
import { useRoutes } from "@/hooks/use-api";
import { useAuthStore } from "@/store/use-auth";
import { formatDate } from "@/utils/time";
import { MAIN_THEME } from "@/lib/brutalist-theme";
import { AddOrUpdateItem, EditDialog } from "@/pages/Home";

const getDescriptionText = (value?: string | string[]) =>
  Array.isArray(value) ? value.join(" ") : value;

function hasToolIcon(tool: string): tool is IconsLisType {
  return tool in iconFileNames;
}

const TOOL_CHIP_CLASS =
  "inline-flex items-center gap-1.5 border px-2 py-0.5 text-xs opacity-65";

const l = MAIN_THEME.light;
const d = MAIN_THEME.dark;

function NowLoadingSkeleton() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {[1, 2, 3, 4].map((i) => (
        <li
          key={i}
          className={`border p-4 ${l.cardBorder} ${d.cardBorder}`}
        >
          <div
            className={`h-3 w-20 rounded bg-current opacity-20 ${l.borderMuted} ${d.borderMuted}`}
          />
          <div
            className={`mt-3 h-5 w-[75%] rounded bg-current opacity-25 ${l.borderMuted} ${d.borderMuted}`}
          />
          <div
            className={`mt-2 h-4 w-full rounded bg-current opacity-20 ${l.borderMuted} ${d.borderMuted}`}
          />
          <div
            className={`mt-2 h-4 w-[85%] rounded bg-current opacity-20 ${l.borderMuted} ${d.borderMuted}`}
          />
        </li>
      ))}
    </ul>
  );
}

export function MainContent() {
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
    <div className="grid w-full flex-1 gap-12 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,1fr)] lg:gap-16">
      <aside className="flex flex-col gap-10">
        <section className={`border-l-2 pl-5 ${l.borderAccent} ${d.borderAccent}`}>
          <h2 className={`text-lg font-semibold ${l.textAccent} ${d.textAccent}`}>
            {about.title}
          </h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed opacity-90">
            {about.description.map((item, idx) => (
              <p key={`main-about-${idx}`}>{item}</p>
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
                key={`main-contact-${item.label}-${idx}`}
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
      </aside>

      <main className="flex flex-col gap-10">
        <section>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className={`text-xl font-semibold ${l.textAccent} ${d.textAccent}`}>
              Right now
            </h2>
            {isAuth && <AddOrUpdateItem>Add Item</AddOrUpdateItem>}
          </div>
          {isLoading ? (
            <NowLoadingSkeleton />
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
                    <h3 className={`font-semibold ${l.textAccent} ${d.textAccent}`}>
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
          <div className="mt-6 flex items-center justify-between text-sm opacity-60">
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
          <h2 className={`mb-4 text-xl font-semibold ${l.textAccent} ${d.textAccent}`}>
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
                  <h3 className={`font-semibold ${l.textAccent} ${d.textAccent}`}>
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
                        <Icon name={tool} className="size-3.5 shrink-0 opacity-80" />
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
          <h2 className={`mb-4 text-xl font-semibold ${l.textAccent} ${d.textAccent}`}>
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
                <h3 className={`font-semibold ${l.textAccent} ${d.textAccent}`}>
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
  );
}
