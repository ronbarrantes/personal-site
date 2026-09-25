import { sections, services } from "@/data/text";
import { mailto } from "@/utils/mailto";

export const MainPageServicesSection = () => {
  return (
    <section className="sheet" aria-labelledby="services-h">
      <div className="cell c-4 label vio">
        <h2 id="services-h">{sections.services.title}</h2>
        <p>{sections.services.sub}</p>
      </div>
      {services.map((service) => (
        <article key={service.title} className="cell c-4 svc">
          <h3>{service.title}</h3>
          <p>{service.body}</p>
        </article>
      ))}
      <a className="cell c-4 ask lav" href={mailto("Project: ")}>
        <b>Need one of these? Tell me about it.</b>
        <span aria-hidden="true">→</span>
      </a>
    </section>
  );
};
