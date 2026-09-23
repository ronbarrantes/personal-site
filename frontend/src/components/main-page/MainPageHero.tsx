import Image from "next/image";

import { hero } from "@/data/text";
import { mailto } from "@/utils/mailto";

// Phone: headline, then a contained 4:3 photo, then pitch + buttons.
// Desktop: text on the left, photo fills the right column.
export const MainPageHero = () => {
  return (
    <section className="hero" aria-labelledby="hero-h">
      <div className="h-top">
        <span className="status">{hero.status}</span>
        <h1 id="hero-h">
          {hero.headlineLead} <span>{hero.headlineAccent}</span>{" "}
          {hero.headlineTail}
        </h1>
      </div>
      <figure className="pic">
        <Image
          src="/img/ron.webp"
          alt="Portrait of Ron Barrantes smiling"
          fill
          priority
          sizes="(min-width: 1080px) 42vw, 100vw"
        />
        <figcaption>{hero.photoCaption}</figcaption>
      </figure>
      <div className="h-bottom">
        <p className="pitch">{hero.pitch}</p>
        <div className="ctas">
          <a className="btn" href={mailto("Job opportunity: ")}>
            Hire me →
          </a>
          <a className="btn o" href={mailto("Project: ")}>
            Start a project →
          </a>
        </div>
      </div>
    </section>
  );
};
