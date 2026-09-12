import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CodeBlock from "../components/CodeBlock";
import { flashcards } from "../data/flashcards";
import { cardIdsForLevel, useFlashcardsProgress } from "../state/flashcardsProgress";
import type { Flashcard, FlashcardLevel, FlashcardResult } from "../types";

type LevelFilter = FlashcardLevel | "todos";

const LEVELS: { id: LevelFilter; label: string; emoji: string }[] = [
  { id: "facil", label: "Fácil", emoji: "🟢" },
  { id: "medio", label: "Médio", emoji: "🟡" },
  { id: "dificil", label: "Difícil", emoji: "🔴" },
  { id: "todos", label: "Todos", emoji: "🔀" },
];

const BADGE_CLASSES: Record<FlashcardLevel, string> = {
  facil: "bg-teal-100 text-teal-800",
  medio: "bg-amber-100 text-amber-800",
  dificil: "bg-rose-100 text-rose-800",
};

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function deckForLevel(level: LevelFilter): Flashcard[] {
  return level === "todos" ? flashcards : flashcards.filter((c) => c.level === level);
}

export default function Flashcards() {
  const navigate = useNavigate();
  const { state, recordResult, masteredCount } = useFlashcardsProgress();

  const [level, setLevel] = useState<LevelFilter>("facil");
  const [deck, setDeck] = useState<Flashcard[]>(() => deckForLevel("facil"));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionWrong, setSessionWrong] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);

  const card = deck[index];
  const cardIds = cardIdsForLevel(flashcards, level);
  const mastered = masteredCount(cardIds);

  function resetCardView() {
    setFlipped(false);
    setShowHint(false);
  }

  function selectLevel(newLevel: LevelFilter) {
    setLevel(newLevel);
    setDeck(deckForLevel(newLevel));
    setIndex(0);
    setShowCompletion(false);
    resetCardView();
  }

  function goNext() {
    if (index < deck.length - 1) {
      setIndex((i) => i + 1);
      resetCardView();
    }
  }

  function goPrev() {
    if (index > 0) {
      setIndex((i) => i - 1);
      resetCardView();
    }
  }

  function shuffleDeck() {
    setDeck((d) => shuffleArray(d));
    setIndex(0);
    setShowCompletion(false);
    resetCardView();
  }

  function mark(result: FlashcardResult) {
    if (!card) return;
    let bonus = 0;
    if (result === "correct") {
      const newStreak = streak + 1;
      bonus = newStreak >= 3 ? Math.floor(card.points * 1.5) : card.points;
      setStreak(newStreak);
      setSessionCorrect((c) => c + 1);
    } else {
      setStreak(0);
      setSessionWrong((c) => c + 1);
    }
    recordResult(card.id, result, bonus);

    const mergedResults = { ...state.results, [card.id]: result };
    const allMastered = deck.every((c) => mergedResults[c.id] === "correct");

    if (index < deck.length - 1) {
      setIndex((i) => i + 1);
      resetCardView();
    } else if (allMastered) {
      setShowCompletion(true);
    } else {
      resetCardView();
    }
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (e.key === "ArrowRight") {
        goNext();
      } else if (e.key === "ArrowLeft") {
        goPrev();
      } else if (e.key === "1" && flipped) {
        mark("correct");
      } else if (e.key === "2" && flipped) {
        mark("wrong");
      } else if (e.key.toLowerCase() === "h" && card?.hint) {
        setShowHint((s) => !s);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipped, index, deck, streak, card]);

  const totalAnswered = sessionCorrect + sessionWrong;
  const accuracy = totalAnswered > 0 ? Math.round((sessionCorrect / totalAnswered) * 100) : 0;

  if (!card) return null;

  return (
    <main className="mx-auto max-w-xl px-4 pt-6 pb-6 sm:px-6">
      <button
        type="button"
        onClick={() => navigate("/praticar")}
        className="mb-3 text-sm font-semibold text-slate-400 hover:text-slate-600"
      >
        ← Praticar
      </button>

      <h1 className="mb-4 text-2xl font-extrabold text-slate-800">Flashcards</h1>

      <div className="mb-4 flex flex-wrap gap-2">
        {LEVELS.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => selectLevel(l.id)}
            className={`rounded-full border-2 px-3 py-1.5 text-sm font-bold transition-colors ${
              level === l.id
                ? "border-brand-teal bg-teal-50 text-brand-teal"
                : "border-slate-200 text-slate-500 hover:border-slate-300"
            }`}
          >
            {l.emoji} {l.label}
          </button>
        ))}
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-white p-3 text-center shadow-sm">
          <p className="text-lg font-black text-brand-teal">
            {mastered}/{cardIds.length}
          </p>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            dominados
          </p>
        </div>
        <div className="rounded-xl bg-white p-3 text-center shadow-sm">
          <p className="text-lg font-black text-amber-500">{state.totalScore}</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            pontos
          </p>
        </div>
        <div className="rounded-xl bg-white p-3 text-center shadow-sm">
          <p className="text-lg font-black text-brand-indigo">{streak}</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            sequência
          </p>
        </div>
      </div>

      {showCompletion && (
        <div className="mb-4 rounded-xl border-2 border-brand-teal bg-teal-50 p-4 text-center">
          <p className="font-extrabold text-brand-teal">
            🎉 Nível {level === "todos" ? "completo" : level} dominado!
          </p>
          <p className="text-sm text-teal-800">
            Você acertou todos os cards deste nível pelo menos uma vez.
          </p>
        </div>
      )}

      <div className="flip-scene mb-4">
        <div
          className={`flip-card cursor-pointer rounded-2xl shadow-md ${flipped ? "flipped" : ""}`}
          onClick={() => setFlipped((f) => !f)}
          role="button"
          tabIndex={0}
          aria-label="Virar carta"
        >
          <div className="flip-face rounded-2xl border-2 border-slate-200 bg-white p-5">
            <div className="mb-3 flex items-start justify-between gap-2">
              <h2 className="text-lg font-bold text-slate-800">{card.question}</h2>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${BADGE_CLASSES[card.level]}`}
              >
                {card.level}
              </span>
            </div>
            <p className="text-slate-600">{card.content}</p>
            {showHint && card.hint && (
              <div className="mt-4 rounded-xl bg-indigo-50 p-3 text-sm text-indigo-900">
                <strong>💡 Dica:</strong> {card.hint}
              </div>
            )}
            <p className="mt-6 text-center text-xs text-slate-300">
              Toque no card ou aperte espaço para virar
            </p>
          </div>

          <div className="flip-face flip-face-back rounded-2xl border-2 border-slate-200 bg-white p-5">
            <div className="mb-3 flex items-start justify-between gap-2">
              <h2 className="text-lg font-bold text-slate-800">{card.answer}</h2>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${BADGE_CLASSES[card.level]}`}
              >
                {card.level}
              </span>
            </div>
            <CodeBlock code={card.solution} className="mb-3" />
            {card.explanation && (
              <p className="text-sm text-slate-600">
                <strong>💡 Explicação:</strong> {card.explanation}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          className="flex-1 rounded-xl border-2 border-brand-indigo px-3 py-2 text-sm font-bold text-brand-indigo hover:bg-indigo-50"
        >
          🔄 Virar
        </button>
        {card.hint && (
          <button
            type="button"
            onClick={() => setShowHint((s) => !s)}
            className="flex-1 rounded-xl border-2 border-slate-300 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50"
          >
            💡 Dica
          </button>
        )}
        <button
          type="button"
          onClick={() => mark("correct")}
          disabled={!flipped}
          className="flex-1 rounded-xl bg-brand-teal px-3 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          ✅ Acertei
        </button>
        <button
          type="button"
          onClick={() => mark("wrong")}
          disabled={!flipped}
          className="flex-1 rounded-xl bg-brand-rose px-3 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          ❌ Errei
        </button>
      </div>

      <div className="mb-4 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={goPrev}
          disabled={index === 0}
          className="rounded-xl px-3 py-2 text-sm font-bold text-slate-500 disabled:cursor-not-allowed disabled:opacity-30"
        >
          ⬅️ Anterior
        </button>
        <span className="text-sm font-semibold text-slate-400">
          {index + 1} / {deck.length}
        </span>
        <button
          type="button"
          onClick={goNext}
          disabled={index === deck.length - 1}
          className="rounded-xl px-3 py-2 text-sm font-bold text-slate-500 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Próximo ➡️
        </button>
        <button
          type="button"
          onClick={shuffleDeck}
          className="rounded-xl px-3 py-2 text-sm font-bold text-brand-indigo"
        >
          🔀 Embaralhar
        </button>
      </div>

      <p className="text-center text-xs text-slate-400">
        Nesta sessão: {sessionCorrect} acertos, {sessionWrong} erros ({accuracy}% de
        precisão) · Atalhos: espaço vira, ← → navega, 1 acertei, 2 errei, H dica
      </p>
    </main>
  );
}
