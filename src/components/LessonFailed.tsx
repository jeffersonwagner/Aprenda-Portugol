import { accentShadow } from "../lib/style";

interface LessonFailedProps {
  onRetry: () => void;
  onExit: () => void;
}

export default function LessonFailed({ onRetry, onExit }: LessonFailedProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <p className="mb-4 text-6xl" aria-hidden>
        💔
      </p>
      <h1 className="mb-2 text-3xl font-extrabold text-slate-800">
        Você ficou sem corações
      </h1>
      <p className="mb-10 text-slate-500">
        Sem problemas! Revise a lição e tente novamente.
      </p>

      <div className="flex w-full max-w-xs flex-col gap-3">
        <button
          type="button"
          onClick={onRetry}
          style={accentShadow("#1899d6")}
          className="btn-3d w-full rounded-2xl bg-brand-blue py-4 text-lg font-extrabold text-white"
        >
          Tentar novamente
        </button>
        <button
          type="button"
          onClick={onExit}
          className="w-full rounded-2xl py-3 text-base font-bold text-slate-400 hover:text-slate-600"
        >
          Sair da lição
        </button>
      </div>
    </div>
  );
}
