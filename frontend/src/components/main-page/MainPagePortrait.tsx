type MainPagePortraitProps = {
  mobile?: boolean;
};

const crosshairPositions = [
  "-top-[9px] -left-[9px]",
  "-top-[9px] -right-[9px]",
  "-bottom-[9px] -left-[9px]",
  "-right-[9px] -bottom-[9px]",
];

const Crosshair = ({ className }: { className: string }) => {
  return (
    <svg
      className={`absolute h-4 w-4 ${className}`}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      style={{ color: "var(--ink)" }}
    >
      <path d="M0 8 H16 M8 0 V16" />
    </svg>
  );
};

export const MainPagePortrait = ({ mobile = false }: MainPagePortraitProps) => {
  if (mobile) {
    return (
      <div className="w-[40%] shrink-0 md:hidden">
        <div
          className="relative h-full border-4"
          style={{
            borderColor: "var(--ink)",
            boxShadow: "6px 6px 0 var(--accent)",
          }}
        >
          <img
            src="/img/ron.webp"
            alt="Ron Barrantes"
            className="block h-full w-full object-cover"
            style={{ filter: "grayscale(100%) contrast(1.15) brightness(1.05)" }}
          />
          <div
            className="pointer-events-none absolute inset-0 mix-blend-multiply"
            style={{ background: "var(--accent)", opacity: 0.35 }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(var(--ink) 1px, transparent 1.5px)",
              backgroundSize: "5px 5px",
            }}
          />
          <div
            className="absolute top-2 left-2 border-2 px-1.5 py-0.5 text-[9px] font-bold tracking-[0.15em]"
            style={{
              borderColor: "var(--ink)",
              background: "var(--bg)",
              color: "var(--ink)",
            }}
          >
            RON · 01
          </div>
          <div
            className="syne absolute right-2 bottom-2 text-[10px] font-extrabold"
            style={{ color: "var(--bg)" }}
          >
            ★'09
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:order-1 md:col-span-5 md:block">
      <div className="relative mx-auto w-full max-w-xs md:max-w-none">
        <div
          className="relative border-4"
          style={{
            borderColor: "var(--ink)",
            boxShadow: "10px 10px 0 var(--accent)",
          }}
        >
          <div className="relative overflow-hidden">
            <img
              src="/img/ron.webp"
              alt="Ron Barrantes"
              className="block aspect-[4/5] w-full object-cover"
              style={{ filter: "grayscale(100%) contrast(1.15) brightness(1.05)" }}
            />
            <div
              className="pointer-events-none absolute inset-0 mix-blend-multiply"
              style={{ background: "var(--accent)", opacity: 0.35 }}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(var(--ink) 1px, transparent 1.5px)",
                backgroundSize: "5px 5px",
              }}
            />
          </div>
          <div
            className="absolute top-3 left-3 border-2 px-2 py-0.5 text-[10px] font-bold tracking-[0.2em]"
            style={{
              borderColor: "var(--ink)",
              background: "var(--bg)",
              color: "var(--ink)",
            }}
          >
            SUBJECT 01 · RON
          </div>
          {crosshairPositions.map((position) => (
            <Crosshair key={position} className={position} />
          ))}
        </div>
        <div
          className="mt-3 flex items-center justify-between border-3 px-3 py-2"
          style={{
            borderColor: "var(--ink)",
            background: "var(--ink)",
            color: "var(--bg)",
          }}
        >
          <span className="syne text-sm font-extrabold tracking-wide">
            ★ EST. 2009
          </span>
          <span className="text-[10px] tracking-[0.2em]">PLATE — I</span>
        </div>
      </div>
    </div>
  );
};
