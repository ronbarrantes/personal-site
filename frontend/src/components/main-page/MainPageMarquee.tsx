import { marqueeItems } from "@/data/text";

type MarqueeToken =
  | { kind: "text"; value: string }
  | { kind: "separator"; value: string };

const MARQUEE_SAMPLE_SIZE = 14;

const buildMarqueeTokens = (items: string[]): MarqueeToken[] =>
  items.flatMap((item) => [
    { kind: "text", value: item },
    { kind: "separator", value: "★" },
  ]);

export const MainPageMarquee = () => {
  const items = marqueeItems.slice(0, MARQUEE_SAMPLE_SIZE);
  const tokens = buildMarqueeTokens(items);
  const animationDuration = `${Math.max(items.length * 5, 44)}s`;

  const renderContent = (keyPrefix: string) =>
    tokens.map((token, index) => (
      <span
        key={`${keyPrefix}-${token.kind}-${token.value}-${index}`}
        aria-hidden={token.kind === "separator" ? "true" : undefined}
        className={
          token.kind === "separator" ? "marquee-separator" : "marquee-item"
        }
      >
        {token.value}
      </span>
    ));

  return (
    <div
      className="overflow-hidden border-b-4 py-2"
      style={{ borderColor: "var(--ink)", background: "var(--ink)" }}
    >
      <div
        aria-hidden="true"
        className="marquee syne text-2xl font-extrabold text-[var(--bg)]"
        style={{ animationDuration }}
      >
        <div className="marquee-group">{renderContent("first")}</div>
        <div className="marquee-group">{renderContent("second")}</div>
      </div>
    </div>
  );
};
