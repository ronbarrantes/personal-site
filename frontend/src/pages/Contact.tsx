import { Icon } from "@/components/icon";
import type { IconsLisType } from "@/components/icon/icons-list-files";
import { contactText, mediaLinks } from "@/data/text";
import type { Link } from "@/lib/types";

const ContactItem = ({ href, label }: Link) => {
  return (
    <a
      href={href}
      target="_blank"
      className="glass flex h-fit w-fit flex-col gap-5 rounded-3xl border border-slate-950/10 p-5 transition-all hover:!bg-lime-500 hover:text-slate-950 dark:border-white/10 hover:dark:!bg-lime-400"
    >
      <Icon
        className="mx-auto size-20"
        name={label as IconsLisType}
        aria-label={label}
      />
      <span>@ronbarrantes</span>
    </a>
  );
};

export const Contact = () => {
  return (
    <div className="mx-auto flex h-screen max-w-screen-lg flex-col gap-3 overflow-hidden overflow-y-scroll pt-18 pb-10">
      <div className="mx-8 flex flex-col gap-3">
        <h1>{contactText.title}</h1>
        <p>{contactText.description}</p>
      </div>
      <div className="glass flex flex-col gap-3 rounded-3xl border border-slate-950/10 px-5 py-3 dark:border-white/10">
        <ul className="mx-auto flex w-full max-w-2xl flex-col justify-between gap-5 sm:flex-row">
          {mediaLinks.map((item, idx) => (
            <li key={`contact-${item}--${idx}`} className="mx-auto w-fit">
              <ContactItem {...item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
