import { useState } from "react";
import { marqueeItems } from "@/data/text";

const shuffleItems = (items: string[]) => {
  const [firstItem, ...rest] = items;
  const shuffled = [...rest];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return firstItem ? [firstItem, ...shuffled] : shuffled;
};

export const MainPageMarquee = () => {
  const [items] = useState(() => shuffleItems(marqueeItems));
  const animationDuration = `${Math.max(items.length * 5, 44)}s`;

  const renderContent = (keyPrefix: string) =>
    items.map((item, index) => (
      <span key={`${keyPrefix}-${item}-${index}`} className="marquee-item">
        <span>{item}</span>
        <span aria-hidden="true" className="marquee-separator">
          ★
        </span>
      </span>
    ));

  return (
    <div
      className="overflow-hidden border-b-4 py-2"
      style={{ borderColor: "var(--ink)", background: "var(--ink)" }}
    >
      <div
        aria-hidden="true"
        className="marquee syne text-2xl font-extrabold text-[var(--bg)]"
        style={{ animationDuration }}
      >
        <div className="marquee-group">{renderContent("first")}</div>
        <div className="marquee-group">{renderContent("second")}</div>
      </div>
    </div>
  );
};
