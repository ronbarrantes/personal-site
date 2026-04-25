export const MainPageMarquee = () => {
  return (
    <div
      className="overflow-hidden border-b-4 py-2"
      style={{ borderColor: "var(--ink)", background: "var(--ink)" }}
    >
      <div className="marquee syne text-2xl font-extrabold text-[var(--bg)]">
        {Array.from({ length: 6 }).map((_, index) => (
          <span key={index} className="mx-6">
            ★ SHIPS CODE ★ BUILDS INTERFACES ★ DRINKS COFFEE ★ DANCES SALSA ★
            TRAVELS LIGHT ★
          </span>
        ))}
      </div>
    </div>
  );
};
