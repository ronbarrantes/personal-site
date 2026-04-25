import { SocialLinkButton } from "@/components/shell/SocialLinkButton";
import { contactText, mediaLinks } from "@/data/text";

export const MainPageContactSection = () => {
  return (
    <section
      className="border-t-4 py-14"
      style={{
        borderColor: "var(--ink)",
        background: "var(--accent)",
        color: "var(--alt)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
        <h2 className="mb-4 text-6xl md:text-[12vw]">
          SAY
          <br />
          HELLO.
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-sm">{contactText.description}</p>
        <div className="flex flex-wrap justify-center gap-4">
          {mediaLinks.map((link) => (
            <SocialLinkButton
              key={link.label}
              link={link}
              className="btn btn-alt"
              iconClassName="size-5"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
