import { accentShadow } from "../lib/style";

interface LessonCompleteProps {
  stars: number;
  xpGained: number;
  correctCount: number;
  total: number;
  onContinue: () => void;
}

export default function LessonComplete({
  stars,
  xpGained,
  correctCount,
  total,
  onContinue,
}: LessonCompleteProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <div className="mb-4 flex gap-2 text-5xl">
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            className={n <= stars ? "text-brand-yellow" : "text-slate-200"}
          >
            ★
          </span>
        ))}
      </div>
      <h1 className="mb-2 text-3xl font-extrabold text-slate-800">
        Lição concluída!
      </h1>
      <p className="mb-8 text-slate-500">
        Você acertou {correctCount} de {total} exercícios.
      </p>

      <div className="mb-10 flex w-full max-w-xs gap-4">
        <div className="flex-1 rounded-xl bg-white p-4 shadow">
          <p className="text-2xl font-black text-amber-500">+{xpGained}</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            XP
          </p>
        </div>
        <div className="flex-1 rounded-xl bg-white p-4 shadow">
          <p className="text-2xl font-black text-brand-green">
            {Math.round((correctCount / total) * 100)}%
          </p>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            precisão
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onContinue}
        style={accentShadow("#46a302")}
        className="btn-3d w-full max-w-xs rounded-2xl bg-brand-green py-4 text-lg font-extrabold text-white"
      >
        Continuar
      </button>
    </div>
  );
}
