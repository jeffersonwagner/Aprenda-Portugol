import { useLocation, useNavigate } from "react-router-dom";

const TABS = [
  { path: "/", label: "Trilha", icon: "🗺️" },
  { path: "/praticar", label: "Praticar", icon: "🎯" },
];

export default function TabBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 flex border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)]">
      {TABS.map((tab) => {
        const isActive =
          tab.path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(tab.path);
        return (
          <button
            key={tab.path}
            type="button"
            onClick={() => navigate(tab.path)}
            className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs font-bold transition-colors ${
              isActive ? "text-brand-teal" : "text-slate-400"
            }`}
          >
            <span className="text-xl" aria-hidden>
              {tab.icon}
            </span>
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
