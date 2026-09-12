import { useNavigate } from "react-router-dom";
import { flashcards } from "../data/flashcards";
import { useFlashcardsProgress } from "../state/flashcardsProgress";

export default function Practice() {
  const navigate = useNavigate();
  const { state, masteredCount } = useFlashcardsProgress();

  const total = flashcards.length;
  const mastered = masteredCount(flashcards.map((c) => c.id));

  return (
    <main className="mx-auto max-w-md px-4 pt-8 pb-6 sm:px-6">
      <h1 className="mb-1 text-2xl font-extrabold text-slate-800">Praticar</h1>
      <p className="mb-6 text-slate-500">
        Modos livres para revisar o que você já aprendeu, sem afetar sua trilha.
      </p>

      <button
        type="button"
        onClick={() => navigate("/praticar/flashcards")}
        className="w-full rounded-2xl border-2 border-slate-200 bg-white p-5 text-left shadow-sm transition-colors hover:border-brand-teal"
      >
        <div className="mb-3 flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-teal text-2xl">
            🗂️
          </span>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Flashcards</h2>
            <p className="text-sm text-slate-500">
              Vire a carta, veja a solução comentada e avalie a si mesmo
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-brand-teal">
            {mastered}/{total} dominados
          </span>
          <span className="font-semibold text-amber-500">
            {state.totalScore} pts
          </span>
        </div>
      </button>
    </main>
  );
}
