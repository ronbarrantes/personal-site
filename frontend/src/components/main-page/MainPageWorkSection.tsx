import { experienceItems, sections } from "@/data/text";
import { MainPageWorkCard } from "./MainPageWorkCard";

export const MainPageWorkSection = () => {
  return (
    <section className="sheet" id="work" aria-labelledby="work-h">
      <div className="cell c-3 label inv">
        <h2 id="work-h">{sections.work.title}</h2>
        <p>{sections.work.sub}</p>
      </div>
      <div className="cell c-9 rows inv">
        {experienceItems.map((item) => (
          <MainPageWorkCard key={`${item.employer}-${item.startDate}`} item={item} />
        ))}
      </div>
    </section>
  );
};
