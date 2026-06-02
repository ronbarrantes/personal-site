import { experienceItems } from "@/data/text";
import { MainPageWorkCard } from "./MainPageWorkCard";

export const MainPageWorkSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <h2 className="mb-6 text-6xl md:text-8xl">
        WORK<span style={{ color: "var(--accent)" }}>{"///"}</span>
      </h2>
      <div className="space-y-5">
        {experienceItems.map((item, index) => (
          <MainPageWorkCard
            key={`${item.employer}-${item.startDate}`}
            item={item}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};
