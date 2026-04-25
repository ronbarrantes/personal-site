import { about, mediaLinks } from "@/data/text";

import { SocialLinkButton } from "@/components/shell/SocialLinkButton";

import { MainPagePortrait } from "./MainPagePortrait";

export const MainPageHero = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <div className="grid items-stretch gap-6 md:grid-cols-12">
        <div className="flex flex-col md:order-2 md:col-span-7">
          <div className="flex items-stretch gap-3 md:block">
            <div className="brut-name-col flex min-w-0 flex-1 flex-col md:block">
              <div className="tag self-start">FILE_01 // HELLO</div>
              <h1 className="brut-name smash mt-3 flex flex-1 items-center leading-[0.82] md:my-6 md:block md:text-[11vw]">
                <span>
                  RON
                  <br />
                  BARR-
                  <br />
                  ANTES
                  <span style={{ color: "var(--accent)" }}>.</span>
                </span>
              </h1>
            </div>
            <MainPagePortrait mobile />
          </div>
          <div
            className="mt-5 mb-5 border-3 px-4 py-3 text-sm font-bold tracking-[0.1em] md:mt-0 md:text-base"
            style={{
              borderColor: "var(--ink)",
              background: "var(--accent)",
              color: "var(--alt)",
            }}
          >
            UI ENGINEER / EX-SALSA-INSTRUCTOR / COFFEE-POWERED
          </div>
          <div className="box p-5">
            <div className="tag mb-3">ABOUT.TXT</div>
            <p className="mb-3 text-sm leading-snug">{about.description[0]}</p>
            <p className="text-sm leading-snug">{about.description[3]}</p>
            <div className="stripe mt-4 h-3" />
            <div className="mt-4 flex flex-wrap gap-2">
              {mediaLinks.map((link) => (
                <SocialLinkButton
                  key={link.label}
                  link={link}
                  className="btn text-xs"
                />
              ))}
            </div>
          </div>
        </div>
        <MainPagePortrait />
      </div>
    </section>
  );
};
