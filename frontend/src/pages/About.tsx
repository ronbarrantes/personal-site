import { about } from "@/data/text";

export const About = () => {
  return (
    <div className="mx-auto flex h-screen max-w-screen-lg flex-col gap-3 overflow-hidden overflow-y-scroll pt-18 pb-10">
      <div className="mx-8 flex flex-col gap-3">
        <h1>{about.title}</h1>
      </div>
      <div className="glass flex flex-col gap-3 rounded-3xl border border-slate-950/10 px-5 py-3 dark:border-white/10">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <img
            className="w-4/6 rounded-full border-6 border-green-500 sm:w-3/6 md:w-64"
            alt="Image of my face"
            src="img/ron.webp"
          />
          <div className="flex flex-col gap-3">
            {about.description.map((item, idx) => (
              <p key={`about-item-${idx}`}>{item}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
