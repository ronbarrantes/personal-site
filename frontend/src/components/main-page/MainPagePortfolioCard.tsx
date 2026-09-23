import { Icon } from "@/components/icon";
import { TechList } from "@/components/tech/TechList";
import type { PortfolioItem } from "@/lib/types";

type MainPagePortfolioCardProps = {
  item: PortfolioItem;
};

export const MainPagePortfolioCard = ({ item }: MainPagePortfolioCardProps) => {
  return (
    <article className="cell c-4 proj">
      {(item.category || item.status) && (
        <div className="top">
          <span>{item.category}</span>
          <span className="st">{item.status}</span>
        </div>
      )}
      <h3>{item.name}</h3>
      <p>{item.summary ?? item.description[0]}</p>
      <TechList tools={item.tools} />
      <div className="links">
        {item.link && (
          <a href={item.link.href} target="_blank" rel="noopener noreferrer">
            Visit<span className="sr-only"> {item.name}</span> ↗
          </a>
        )}
        {item.github && (
          <a href={item.github} target="_blank" rel="noopener noreferrer">
            <Icon name="github" />
            Source<span className="sr-only"> for {item.name}</span>
          </a>
        )}
      </div>
    </article>
  );
};
