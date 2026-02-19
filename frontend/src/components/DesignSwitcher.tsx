import { NavLink } from "react-router";

const LinkItem = ({ to, label }: { to: string; label: string }) => (
  <NavLink
    to={to}
    className="rounded-full border border-slate-900/20 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 transition hover:border-slate-900/40 hover:text-slate-900 dark:border-white/20 dark:bg-white/10 dark:text-slate-200 dark:hover:text-white"
  >
    {label}
  </NavLink>
);

export const DesignSwitcher = () => {
  return (
    <div className="fixed left-4 top-1/2 z-50 -translate-y-1/2">
      <details className="group">
        <summary className="cursor-pointer list-none rounded-full border border-slate-900/20 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-700 shadow-lg transition hover:-translate-y-0.5 hover:border-slate-900/40 dark:border-white/20 dark:bg-white/10 dark:text-slate-200">
          Menu
        </summary>
        <div className="mt-3 flex flex-col gap-2 rounded-2xl border border-slate-900/15 bg-white/90 p-3 shadow-lg dark:border-white/15 dark:bg-slate-950/80">
          <LinkItem to="/" label="Main" />
          <LinkItem to="/designs/b" label="System" />
          <LinkItem to="/designs/brutalist" label="Brutalist" />
          <LinkItem to="/designs/deco" label="Deco" />
          <LinkItem to="/designs/soft" label="Soft" />
          <LinkItem to="/designs/industrial" label="Industrial" />
        </div>
      </details>
    </div>
  );
};
