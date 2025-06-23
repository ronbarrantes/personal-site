import classNames from "classnames";
import { toast } from "sonner";

import { Icon } from "@/components/icon";
import { mediaLinks } from "@/data/text";
import { useClock } from "@/hooks/use-clock";
import type { Link } from "@/lib/types";
import { useLinksStore } from "@/store/use-links";
import type { IconsLisType } from "./icon/icons-list-files";

const LineSection = ({
  direction,
  children,
  className,
}: {
  direction?: "left" | "right";
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={classNames(
      "flex items-center",
      direction === "left" &&
        "pl-3 after:h-4 after:w-4 after:translate-x-2 after:rotate-45",
      direction === "right" &&
        "pr-3 before:h-4 before:w-4 before:-translate-x-2 before:rotate-45",
      !direction && "px-5",
      className
    )}
  >
    {children}
  </div>
);

const FooterMediaItem = ({
  label,
  href,
  isLast,
}: Link & { isLast: boolean; className?: string }) => {
  return (
    <>
      <a
        className={classNames(
          "mx-1 hover:text-pink-600 hover:dark:text-pink-400",
          isLast && "mr-0"
        )}
        href={href}
        target="_blank"
      >
        <Icon tooltip name={label as IconsLisType} />
      </a>
    </>
  );
};

//{!isLast && <span className="text-slate-400 dark:text-slate-600">|</span>}
export const Footer = ({ className }: { className: string }) => {
  const { iconLink, pageIdx } = useLinksStore();
  const { date, time } = useClock();
  return (
    <div className={classNames(className)}>
      <footer className="glass flex items-center justify-between border-t border-slate-950/5 drop-shadow-xl dark:border-slate-50/10">
        <div className="flex">
          <LineSection
            direction="left"
            className="gap-1 bg-fuchsia-300 after:bg-fuchsia-300 dark:bg-fuchsia-800 dark:after:bg-fuchsia-800"
          >
            <Icon name={iconLink} />
            <span>{iconLink}</span>
          </LineSection>
          <LineSection
            direction="left"
            className="hidden bg-cyan-300 after:bg-cyan-300 sm:flex dark:bg-cyan-800 dark:after:bg-cyan-800"
          >
            <span className="ml-2">{pageIdx}</span>
          </LineSection>
          <LineSection
            direction="left"
            className="bg-slate-300 after:bg-slate-300 dark:bg-slate-700 dark:after:bg-slate-700"
          >
            <button onClick={() => toast("QUACK!")}>
              <Icon
                tooltip
                asChild
                className="ml-2 hover:text-yellow-600 hover:dark:text-yellow-400"
                name="duck"
              />
            </button>
          </LineSection>
          <LineSection className="flex gap-2">
            {mediaLinks.map((item, idx) => {
              const isLast = mediaLinks.length - 1 === idx;
              return (
                <FooterMediaItem
                  key={`footer-${item}--${idx}`}
                  {...item}
                  isLast={isLast}
                />
              );
            })}
            <span className="text-slate-400 dark:text-slate-600">
              <Icon className="rotate-180" name="chevronLeft" />
            </span>
          </LineSection>
        </div>

        <div className="flex">
          <LineSection
            direction="right"
            className="gap-2 bg-cyan-300 before:bg-cyan-300 dark:bg-cyan-800 dark:before:bg-cyan-800"
          >
            <Icon name="clock" />
            <span className="mr-2">{time}</span>
          </LineSection>
          <LineSection
            direction="right"
            className="hidden gap-2 bg-fuchsia-300 before:bg-fuchsia-300 sm:flex dark:bg-fuchsia-800 dark:before:bg-fuchsia-800"
          >
            <Icon name="calendar" />
            <span>{date}</span>
          </LineSection>
        </div>
      </footer>
    </div>
  );
};
