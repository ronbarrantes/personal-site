import classNames from "classnames";

import { Icon } from "@/components/icon";
import { experienceItems, workHistoryText } from "@/data/text";
import type { WorkExperience } from "@/lib/types";

const WItem = ({
  employer,
  jobTitle,
  startDate,
  endDate,
  description,
  url,
  tools,
  className,
}: WorkExperience & { className: string }) => {
  return (
    <div
      className={classNames(
        "glass flex flex-col gap-5 rounded-3xl border border-slate-950/5 px-5 py-3 dark:border-white/10",
        className
      )}
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-cyan-500 dark:text-cyan-400">
          {jobTitle}
        </h2>
        <div className="flex gap-2">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cyan-500 underline hover:no-underline dark:text-cyan-400"
            >
              {employer}
            </a>
          ) : (
            <span>{employer}</span>
          )}
          <span className="">::</span>
          <span>{`${startDate} | ${endDate ? endDate : "Present"}`}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {description.map((item, idx) => (
          <p key={`${startDate}-${idx}`}>{item}</p>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <span>Tools used:</span>
        <ul className="ml-2 flex gap-3">
          {tools.map((item, idx) => (
            <li key={`${startDate}-${item}-${idx}`}>
              <Icon tooltip name={item} className="size-6" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const Resume = () => {
  return (
    <div className="flex h-screen flex-col gap-3 overflow-hidden overflow-y-scroll pt-18 pb-10">
      <div className="mx-8 flex flex-col gap-3">
        <h1>{workHistoryText.title}</h1>
        <p>{workHistoryText.description}</p>
      </div>
      <div>
        <ul className="flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-0">
          {experienceItems.map((item, idx) => {
            return (
              <li
                key={`${item.employer}-${item.jobTitle}-${idx}`}
                className="flex lg:w-1/2"
              >
                <WItem {...item} className="md:m-2" />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
