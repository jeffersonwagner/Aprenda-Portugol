interface StatsHeaderProps {
  xp: number;
  streak: number;
}

export default function StatsHeader({ xp, streak }: StatsHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-green text-lg font-black text-white">
          P&gt;
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
      </div>
    </header>
  );
}
