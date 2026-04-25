import { Icon } from "@/components/icon";
import type { PortfolioItem } from "@/lib/types";

type MainPagePortfolioCardProps = {
  item: PortfolioItem;
  index: number;
};

export const MainPagePortfolioCard = ({
  item,
  index,
}: MainPagePortfolioCardProps) => {
  return (
    <article className="box p-5">
      <div className="mb-3 flex items-center justify-between">
        <span
          className="text-5xl"
          style={{ fontFamily: "Archivo Black", color: "var(--accent)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          {item.github && (
            <a
              href={item.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn text-xs"
            >
              <Icon name="github" />
              SRC
            </a>
          )}
          {item.link && (
            <a
              href={item.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-alt text-xs"
            >
              <Icon name="link" />
              LIVE
            </a>
          )}
        </div>
      </div>
      <h3 className="mb-3 text-3xl">{item.name}</h3>
      <div className="mb-4 space-y-3">
        {item.description.map((paragraph, index) => (
          <p key={`${item.name}-desc-${index}`} className="text-sm leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      <div
        className="flex flex-wrap gap-2 border-t-2 pt-3"
        style={{ borderColor: "var(--ink)" }}
      >
        {item.tools.map((tool) => (
          <Icon key={tool} tooltip name={tool} className="size-5" />
        ))}
      </div>
    </article>
  );
};
