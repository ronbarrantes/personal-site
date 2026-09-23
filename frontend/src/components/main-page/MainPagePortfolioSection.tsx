import type { CSSProperties } from "react";

import { portfolioItems, sections } from "@/data/text";
import { MainPagePortfolioCard } from "./MainPagePortfolioCard";

const PROJECTS_PER_ROW = 2;

export const MainPagePortfolioSection = () => {
  const rows = Math.ceil(portfolioItems.length / PROJECTS_PER_ROW);

  return (
    <section className="sheet" id="projects" aria-labelledby="projects-h">
      <div
        className="cell c-4 label lav projects-label"
        style={{ "--project-rows": rows } as CSSProperties}
      >
        <span className="n">04</span>
        <h2 id="projects-h">{sections.projects.title}</h2>
        <p>{sections.projects.sub}</p>
      </div>
      {portfolioItems.map((item) => (
        <MainPagePortfolioCard key={item.name} item={item} />
      ))}
    </section>
  );
};
