import type { IconsLisType } from "@/components/icon/icons-list-files";
import { TechList } from "@/components/tech/TechList";
import { experienceItems, portfolioItems } from "@/data/text";

// Every tool from jobs and projects, most used first.
const getToolbox = () => {
  const counts = new Map<IconsLisType, number>();

  for (const item of [...experienceItems, ...portfolioItems]) {
    for (const tool of item.tools) {
      counts.set(tool, (counts.get(tool) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([tool]) => tool);
};

export const MainPageToolbox = () => {
  return (
    <section className="sheet" aria-labelledby="tools-h">
      <div className="cell full tools-cell">
        <h2 id="tools-h">
          Toolbox<small>Hover an icon for its name</small>
        </h2>
        <TechList tools={getToolbox()} label="Toolbox" />
      </div>
    </section>
  );
};
