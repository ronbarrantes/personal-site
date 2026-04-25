import { Icon } from "@/components/icon";
import type { WorkExperience } from "@/lib/types";

const toMonthDateTime = (value: string) => {
  const [month, year] = value.split("/");

  if (!month || !year) {
    return undefined;
  }

  return `${year}-${month.padStart(2, "0")}`;
};

type MainPageWorkCardProps = {
  item: WorkExperience;
  index: number;
};

export const MainPageWorkCard = ({
  item,
  index,
}: MainPageWorkCardProps) => {
  const startDateTime = toMonthDateTime(item.startDate);
  const endDateTime = item.endDate ? toMonthDateTime(item.endDate) : undefined;

  return (
    <article className="box grid items-start gap-4 p-5 md:grid-cols-12">
      <div className="md:col-span-2">
        <div
          className="text-3xl"
          style={{ fontFamily: "Archivo Black", color: "var(--accent)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        <div
          className="text-xs"
          aria-label={`From ${item.startDate} to ${item.endDate ?? "now"}`}
        >
          <time dateTime={startDateTime}>{item.startDate}</time> →{" "}
          {item.endDate ? (
            <time dateTime={endDateTime}>{item.endDate}</time>
          ) : (
            <time>NOW</time>
          )}
        </div>
      </div>
      <div className="md:col-span-7">
        <h3 className="mb-1 text-2xl md:text-3xl">{item.jobTitle}</h3>
        <div className="mb-3 text-sm">
          @{" "}
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-[var(--accent)] decoration-4 underline-offset-2"
            >
              {item.employer}
            </a>
          ) : (
            item.employer
          )}
        </div>
        <div className="space-y-3">
          {item.description.map((paragraph, descriptionIndex) => (
            <p
              key={`${item.employer}-desc-${descriptionIndex}`}
              className="text-sm leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      <div className="md:col-span-3">
        <div className="tag mb-2">STACK</div>
        <div className="flex flex-wrap gap-2">
          {item.tools.map((tool) => (
            <Icon
              key={tool}
              tooltip
              name={tool}
              className="size-5 border-2 border-[var(--ink)] bg-[var(--bg)] p-1"
            />
          ))}
        </div>
      </div>
    </article>
  );
};
