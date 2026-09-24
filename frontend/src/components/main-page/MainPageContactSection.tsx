import { Icon } from "@/components/icon";
import { getIconLabel } from "@/components/icon/icon-labels";
import { contactEmail, mediaLinks, sections } from "@/data/text";
import { mailto } from "@/utils/mailto";

const CHOICES = [
  {
    subject: "Job opportunity: ",
    lead: "Have a role to fill?",
    action: "Bring me onto your team",
  },
  {
    subject: "Project: ",
    lead: "Have a project or idea?",
    action: "Let's build it together",
  },
];

export const MainPageContactSection = () => {
  return (
    <section className="cta" id="contact" aria-labelledby="contact-h">
      <div className="cta-inner">
        <h2 id="contact-h">
          Let&apos;s work<span>together</span>
        </h2>
        <p className="sub">{sections.contact.sub}</p>
        <div className="choices">
          {CHOICES.map((choice) => (
            <a key={choice.subject} href={mailto(choice.subject)}>
              <span>
                <small>{choice.lead}</small>
                <b>{choice.action}</b>
              </span>
              <span className="a" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </div>
        <div className="links">
          <a href={mailto()}>{contactEmail}</a>
          {mediaLinks.map((link) => (
            <a key={link.label} href={link.href} rel="me noopener noreferrer">
              <Icon name={link.label} />
              {getIconLabel(link.label)}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
