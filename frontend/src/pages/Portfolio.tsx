import classNames from "classnames";

import { Icon } from "@/components/icon";
import { portfolioItems, portfolioText } from "@/data/text";
import type { PortfolioItem } from "@/lib/types";

const PItem = ({
  name,
  description,
  dateAdded,
  github,
  link,
  tools,
  className,
}: PortfolioItem & { className: string }) => {
  return (
    <div
      className={classNames(
        "glass flex flex-col gap-5 rounded-3xl border border-slate-950/5 px-5 py-3 dark:border-white/10",
        className
      )}
    >
      <h2 className="font-semibold text-fuchsia-600 dark:text-fuchsia-400">
        {name}
      </h2>
      <div className="flex flex-1 flex-col gap-2">
        {description.map((item, idx) => (
          <p key={`${name}-${link}-${idx}`}>{item}</p>
        ))}
      </div>
      <span>{dateAdded}</span>
      <div>
        {github && (
          <a
            href={github}
            className="flex items-center gap-2 font-semibold text-fuchsia-600 underline hover:no-underline dark:text-fuchsia-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="git" className="size-5" />
            github
          </a>
        )}

        {link && (
          <a
            href={link.href}
            className="flex items-center gap-2 font-semibold text-fuchsia-600 underline hover:no-underline dark:text-fuchsia-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="link" className="size-5" />
            {link.label}
          </a>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <span>Tools used:</span>
        <ul className="ml-2 flex gap-3">
          {tools.map((item, idx) => (
            <li key={`${name}-${item}-${idx}`}>
              <Icon className="size-6" tooltip name={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const Portfolio = () => {
  return (
    <div className="flex h-screen flex-col gap-3 overflow-hidden overflow-y-scroll pt-18 pb-10">
      <div className="mx-8 flex flex-col gap-3">
        <h1>{portfolioText.title}</h1>
        <p>{portfolioText.description}</p>
      </div>
      <ul className="flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-0">
        {portfolioItems.map((item, idx) => {
          return (
            <li key={`${item.name}-${idx}`} className="flex lg:w-1/2">
              <PItem className="md:m-2" {...item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
