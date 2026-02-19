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

export const DesignIndustrial = () => {
  const { date, time } = useClock();
  const { api } = useRoutes();
  const nowData = api.now.get.data || [];
  const isLoading = api.now.get.isLoading;
  const { isAuth } = useAuthStore();
  const pageSize = 8;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(nowData.length / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pagedNow = nowData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div
      className="flex min-h-screen w-full flex-col bg-[#18181b] text-[#e4e4e7]"
      style={{ fontFamily: "Archivo Narrow, sans-serif" }}
    >
      <div className="grid min-h-screen w-full flex-1 grid-rows-[auto_1fr]">
        <header className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-[#3f3f46] bg-[#27272a] px-4 py-3 lg:px-8 lg:py-4">
          <nav className="flex flex-wrap items-center gap-2">
            <NavLink to="/" className="border border-[#71717a] px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[#a1a1aa] transition hover:border-[#e4e4e7] hover:text-[#e4e4e7]">Main</NavLink>
            <NavLink to="/designs/b" className="border border-[#71717a] px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[#a1a1aa] transition hover:border-[#e4e4e7] hover:text-[#e4e4e7]">System</NavLink>
            <NavLink to="/designs/brutalist" className="border border-[#71717a] px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[#a1a1aa] transition hover:border-[#e4e4e7] hover:text-[#e4e4e7]">Brutalist</NavLink>
            <NavLink to="/designs/deco" className="border border-[#71717a] px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[#a1a1aa] transition hover:border-[#e4e4e7] hover:text-[#e4e4e7]">Deco</NavLink>
            <NavLink to="/designs/soft" className="border border-[#71717a] px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[#a1a1aa] transition hover:border-[#e4e4e7] hover:text-[#e4e4e7]">Soft</NavLink>
            <ModeToggle />
          </nav>
          <h1 className="text-center text-xl font-bold uppercase tracking-[0.2em] text-[#e4e4e7] lg:text-2xl">
            Welcome
          </h1>
          <div className="flex justify-end gap-6 text-xs font-bold uppercase tracking-widest text-[#71717a]">
            <span className="flex items-center gap-2">
              <Icon name="calendar" className="size-4" />
              {date}
            </span>
            <span className="flex items-center gap-2">
              <Icon name="clock" className="size-4" />
              {time}
            </span>
          </div>
        </header>

        <div className="grid w-full flex-1 grid-cols-1 gap-6 overflow-auto p-4 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-8 lg:p-8">
          <aside className="flex flex-col gap-6 lg:gap-8">
            <section className="border border-[#3f3f46] bg-[#27272a] p-4">
              <h2 className="border-b border-[#71717a] pb-2 text-sm font-bold uppercase tracking-widest text-[#a1a1aa]">{about.title}</h2>
              <div className="mt-3 space-y-2 text-sm leading-relaxed text-[#a1a1aa]">
                {about.description.map((item, idx) => (
                  <p key={`ind-about-${idx}`}>{item}</p>
                ))}
              </div>
            </section>
            <section className="border border-[#3f3f46] bg-[#27272a] p-4">
              <h2 className="border-b border-[#71717a] pb-2 text-sm font-bold uppercase tracking-widest text-[#a1a1aa]">{contactText.title}</h2>
              <p className="mt-2 text-sm text-[#a1a1aa]">{getDescriptionText(contactText.description)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {mediaLinks.map((item, idx) => (
                  <a
                    key={`ind-contact-${item.label}-${idx}`}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-[#71717a] px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#a1a1aa] transition hover:border-[#e4e4e7] hover:text-[#e4e4e7]"
                  >
                    <Icon name={item.label as IconsLisType} className="size-4" />
                    {item.label}
                  </a>
                ))}
              </div>
            </section>
          </aside>

          <main className="flex min-w-0 flex-col gap-6 lg:gap-8">
            <section className="border border-[#3f3f46] bg-[#27272a] p-4 lg:p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#a1a1aa]">Right now</h2>
                {isAuth && <AddOrUpdateItem>Add Item</AddOrUpdateItem>}
              </div>
              {isLoading ? (
                <p className="text-sm text-[#71717a]">Loading...</p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {pagedNow.map((item) => (
                    <div
                      key={item.id}
                      className="border border-[#3f3f46] bg-[#18181b] p-3"
                    >
                      <span className="text-xs text-[#71717a]">{formatDate(item.created_at)}</span>
                      <h3 className="mt-1 font-bold uppercase tracking-wide text-[#e4e4e7]">{item.title}</h3>
                      <p className="mt-1 text-xs text-[#a1a1aa] line-clamp-3">{item.desc}</p>
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
              <div className="mt-4 flex items-center justify-between border-t border-[#3f3f46] pt-4 text-xs font-bold uppercase tracking-wider text-[#71717a]">
                <button className="border border-[#71717a] px-2 py-1 transition hover:text-[#e4e4e7] disabled:opacity-40" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
                <span>{page} / {totalPages}</span>
                <button className="border border-[#71717a] px-2 py-1 transition hover:text-[#e4e4e7] disabled:opacity-40" disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</button>
              </div>
            </section>

            <section className="border border-[#3f3f46] bg-[#27272a] p-4 lg:p-6">
              <h2 className="border-b border-[#71717a] pb-2 text-sm font-bold uppercase tracking-widest text-[#a1a1aa]">{workHistoryText.title}</h2>
              <p className="mt-2 mb-4 text-sm text-[#a1a1aa]">{getDescriptionText(workHistoryText.description)}</p>
              <div className="grid gap-4 lg:grid-cols-2">
                {experienceItems.map((item, idx) => (
                  <div key={`${item.employer}-${idx}`} className="border border-[#3f3f46] bg-[#18181b] p-4">
                    <div className="flex flex-wrap justify-between gap-2">
                      <h3 className="font-bold uppercase tracking-wide text-[#e4e4e7]">{item.jobTitle}</h3>
                      <span className="text-xs text-[#71717a]">{item.startDate} — {item.endDate ?? "Present"}</span>
                    </div>
                    <p className="text-sm text-[#a1a1aa]">{item.employer}</p>
                    <div className="mt-3 space-y-1 text-sm text-[#a1a1aa]">
                      {item.description.map((d, i) => (
                        <p key={i}>{d}</p>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.tools.map((tool) => (
                        <span key={tool} className="border border-[#71717a] px-2 py-0.5 text-xs text-[#71717a]">{tool}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="border border-[#3f3f46] bg-[#27272a] p-4 lg:p-6">
              <h2 className="border-b border-[#71717a] pb-2 text-sm font-bold uppercase tracking-widest text-[#a1a1aa]">{portfolioText.title}</h2>
              <p className="mt-2 mb-4 text-sm text-[#a1a1aa]">{getDescriptionText(portfolioText.description)}</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {portfolioItems.map((item, idx) => (
                  <div key={`${item.name}-${idx}`} className="border border-[#3f3f46] bg-[#18181b] p-4">
                    <h3 className="font-bold uppercase tracking-wide text-[#e4e4e7]">{item.name}</h3>
                    <div className="mt-2 space-y-1 text-sm text-[#a1a1aa]">
                      {item.description.map((d, i) => (
                        <p key={i}>{d}</p>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.github && (
                        <a href={item.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-[#71717a] px-2 py-1 text-xs font-bold uppercase tracking-wider text-[#a1a1aa] transition hover:border-[#e4e4e7] hover:text-[#e4e4e7]">
                          <Icon name="git" className="size-4" /> Github
                        </a>
                      )}
                      {item.link && (
                        <a href={item.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-[#71717a] px-2 py-1 text-xs font-bold uppercase tracking-wider text-[#a1a1aa] transition hover:border-[#e4e4e7] hover:text-[#e4e4e7]">
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
