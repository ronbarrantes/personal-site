import { useTheme } from "@/components/theme-provider/theme-provider-state";

const stamps = [
  "BEST VIEWED 800x600",
  "HTML 4.01",
  "NO FRAMES",
  "WEBRING MEMBER",
  "EMAIL ME!!!",
  "UNDER CONSTRUCTION",
];

export function GeocitiesDecor() {
  const { theme } = useTheme();

  if (theme !== "geocities") return null;

  return (
    <div className="geocities-chrome" aria-hidden="true">
      <div className="geocities-corner geocities-corner-left">NEW!</div>
      <div className="geocities-corner geocities-corner-right">COOL SITE</div>

      <div className="geocities-marquee-shell">
        <div className="geocities-marquee-track">
          <span>WELCOME SURFER</span>
          <span>YOU FOUND THE SECRET MODE</span>
          <span>SIGN THE GUESTBOOK</span>
          <span>JOIN MY WEBRING</span>
          <span>UNDER CONSTRUCTION FOREVER</span>
          <span>WELCOME SURFER</span>
          <span>YOU FOUND THE SECRET MODE</span>
          <span>SIGN THE GUESTBOOK</span>
          <span>JOIN MY WEBRING</span>
          <span>UNDER CONSTRUCTION FOREVER</span>
        </div>
      </div>

      <aside className="geocities-side-rail geocities-side-rail-left">
        <div className="geocities-rail-title">WEBRING</div>
        <div className="geocities-widget">
          <div className="geocities-widget-title">:: NAVIGATE ::</div>
          <div className="geocities-webring-row">
            <span>&lt;&lt; Prev</span>
            <span>Random</span>
            <span>Next &gt;&gt;</span>
          </div>
        </div>
        <div className="geocities-widget">
          <div className="geocities-widget-title">SITE STATUS</div>
          <ul className="geocities-dot-list">
            <li>Totally awesome</li>
            <li>Updated recently*</li>
            <li>* maybe</li>
          </ul>
        </div>
      </aside>

      <aside className="geocities-side-rail geocities-side-rail-right">
        <div className="geocities-rail-title">AWARDS</div>
        <div className="geocities-stamp-grid">
          {stamps.map((stamp) => (
            <div key={stamp} className="geocities-stamp">
              {stamp}
            </div>
          ))}
        </div>
      </aside>

      <div className="geocities-bottom-dock">
        <div className="geocities-pill">Guestbook: OPEN</div>
        <div className="geocities-pill">MIDI: OFF (for now)</div>
        <div className="geocities-pill geocities-pill-blink">NEW LINKS ADDED</div>
      </div>
    </div>
  );
}
