import { TechList } from "@/components/tech/TechList";
import type { WorkExperience } from "@/lib/types";
import { formatMonthYear, toMonthDateTime } from "@/utils/time";

type MainPageWorkCardProps = {
  item: WorkExperience;
};

export const MainPageWorkCard = ({ item }: MainPageWorkCardProps) => {
  const [summary, ...details] = item.summary
    ? [item.summary, ...item.description]
    : item.description;

  return (
    <article className="job">
      <p className="yr">
        {item.startDate.split("/")[1]}
        <small>
          <time dateTime={toMonthDateTime(item.startDate)}>
            {formatMonthYear(item.startDate)}
          </time>{" "}
          –{" "}
          {item.endDate ? (
            <time dateTime={toMonthDateTime(item.endDate)}>
              {formatMonthYear(item.endDate)}
            </time>
          ) : (
            "Now"
          )}
        </small>
      </p>
      <div>
        <h3>
          {item.jobTitle}{" "}
          <span className="co">
            ·{" "}
            {item.url ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.employer}
              </a>
            ) : (
              item.employer
            )}
          </span>
        </h3>
        <p>{summary}</p>
        {details.length > 0 && (
          <details>
            <summary>Details</summary>
            <ul>
              {details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </details>
        )}
      </div>
      <TechList tools={item.tools} />
    </article>
  );
};
