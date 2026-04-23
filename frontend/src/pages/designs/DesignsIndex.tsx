import { Link } from "react-router";

const designs = [
  {
    slug: "terminal",
    name: "CRT Terminal",
    desc: "Phosphor green, scanlines, ASCII chrome.",
    accent: "#7ef29d",
    bg: "#0a0f0d",
  },
  {
    slug: "editorial",
    name: "Editorial",
    desc: "Print magazine, serifs, numbered sections.",
    accent: "#c1440e",
    bg: "#f3eee4",
  },
  {
    slug: "brutalist",
    name: "Brutalist",
    desc: "Black, white, acid yellow. Raw concrete.",
    accent: "#ffe500",
    bg: "#0c0c0c",
  },
  {
    slug: "deco",
    name: "Art Deco",
    desc: "Onyx & gold. Symmetry, geometry, lacquer.",
    accent: "#d4af37",
    bg: "#111014",
  },
  {
    slug: "organic",
    name: "Soft Organic",
    desc: "Pastel clay. Wavy, handwritten, gentle.",
    accent: "#ef7c6a",
    bg: "#fcf6ee",
  },
];

export const DesignsIndex = () => {
  return (
    <div className="min-h-screen bg-neutral-950 p-8 text-neutral-100 md:p-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-5xl font-semibold tracking-tight">
          design explorations
        </h1>
        <p className="mb-12 text-neutral-400">
          Five takes on the same site. Same data, five voices.
        </p>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {designs.map((d) => (
            <li key={d.slug}>
              <Link
                to={`/designs/${d.slug}`}
                className="group block rounded-2xl border border-neutral-800 p-8 transition-all hover:border-neutral-600"
                style={{ background: d.bg }}
              >
                <div
                  className="mb-6 h-24 w-24 rounded-full transition-transform group-hover:scale-110"
                  style={{ background: d.accent }}
                />
                <div className="text-2xl font-semibold">{d.name}</div>
                <p className="mt-2 text-sm opacity-60">{d.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
