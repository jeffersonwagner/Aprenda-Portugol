import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/auth";

interface StatsHeaderProps {
  xp: number;
  streak: number;
}

export default function StatsHeader({ xp, streak }: StatsHeaderProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-ink font-mono text-base font-bold text-brand-teal">
          {"{ }"}
        </span>
        <span className="text-lg font-extrabold text-slate-700">
          Aprenda Portugol
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div
          className="flex items-center gap-1 font-bold text-orange-500"
          title="Sequência de dias"
        >
          <span aria-hidden>🔥</span>
          <span>{streak}</span>
        </div>
        <div
          className="flex items-center gap-1 font-bold text-amber-500"
          title="Pontos de experiência"
        >
          <span aria-hidden>⭐</span>
          <span>{xp} XP</span>
        </div>
        <button
          type="button"
          onClick={() => navigate("/conta")}
          aria-label="Sua conta"
          title={user ? user.email : "Entrar / criar conta"}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500 hover:bg-slate-200"
        >
          {user ? user.email?.charAt(0).toUpperCase() : "👤"}
        </button>
      </div>
    </header>
  );
}
