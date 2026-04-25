import { portfolioItems } from "@/data/text";

import { MainPagePortfolioCard } from "./MainPagePortfolioCard";

export const MainPagePortfolioSection = () => {
  return (
    <section className="stripe border-t-4" style={{ borderColor: "var(--ink)" }}>
      <div
        className="mx-auto max-w-7xl border-4 px-4 py-10 md:px-8"
        style={{ borderColor: "var(--ink)", background: "var(--bg)" }}
      >
        <h2 className="mb-6 text-6xl md:text-8xl">
          SHIPS<span style={{ color: "var(--accent)" }}>.</span>
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {portfolioItems.map((item, index) => (
            <MainPagePortfolioCard key={item.name} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
