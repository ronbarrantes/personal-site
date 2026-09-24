import type { CSSProperties } from "react";

import { portfolioItems, sections } from "@/data/text";
import { MainPagePortfolioCard } from "./MainPagePortfolioCard";

// Desktop: two rows next to the label, bottom row gets the extra card when the
// count is odd (5 → 2 + 3, 7 → 3 + 4). Each row splits its width evenly.
const splitIntoRows = <T,>(items: T[]) => {
  const topCount = Math.floor(items.length / 2);

  return topCount > 0
    ? [items.slice(0, topCount), items.slice(topCount)]
    : [items];
};

export const MainPagePortfolioSection = () => {
  const rows = splitIntoRows(portfolioItems);
  const lastItem = portfolioItems[portfolioItems.length - 1];
  // On tablet (two per row) an odd count leaves the last card alone; it spans the row.
  const isOddCount = portfolioItems.length % 2 === 1;

  return (
    <section className="sheet" id="projects" aria-labelledby="projects-h">
      <div className="cell c-4 label lav">
        <span className="n">04</span>
        <h2 id="projects-h">{sections.projects.title}</h2>
        <p>{sections.projects.sub}</p>
      </div>
      <div className="cell c-8 proj-grid">
        {rows.map((row, index) => (
          <div
            key={index}
            className="proj-row"
            data-cols={row.length}
            style={{ "--cols": row.length } as CSSProperties}
          >
            {row.map((item) => (
              <MainPagePortfolioCard
                key={item.name}
                item={item}
                isWide={isOddCount && item === lastItem}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
