import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { FlashcardLevel, FlashcardResult, FlashcardsState } from "../types";

const STORAGE_KEY = "aprenda-portugol:flashcards";

const defaultState: FlashcardsState = {
  results: {},
  totalScore: 0,
};

function loadState(): FlashcardsState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

interface FlashcardsProgressContextValue {
  state: FlashcardsState;
  recordResult: (cardId: string, result: FlashcardResult, pointsEarned: number) => void;
  masteredCount: (cardIds: string[]) => number;
}

const FlashcardsProgressContext = createContext<FlashcardsProgressContextValue | null>(
  null
);

export function FlashcardsProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FlashcardsState>(loadState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore write failures (e.g. private browsing storage limits)
    }
  }, [state]);

  const value = useMemo<FlashcardsProgressContextValue>(() => {
    function recordResult(cardId: string, result: FlashcardResult, pointsEarned: number) {
      setState((prev) => ({
        ...prev,
        totalScore: prev.totalScore + (result === "correct" ? pointsEarned : 0),
        results: { ...prev.results, [cardId]: result },
      }));
    }

    function masteredCount(cardIds: string[]): number {
      return cardIds.filter((id) => state.results[id] === "correct").length;
    }

    return { state, recordResult, masteredCount };
  }, [state]);

  return (
    <FlashcardsProgressContext.Provider value={value}>
      {children}
    </FlashcardsProgressContext.Provider>
  );
}

export function useFlashcardsProgress(): FlashcardsProgressContextValue {
  const ctx = useContext(FlashcardsProgressContext);
  if (!ctx) {
    throw new Error(
      "useFlashcardsProgress deve ser usado dentro de FlashcardsProgressProvider"
    );
  }
  return ctx;
}

export function cardIdsForLevel(
  allIds: { id: string; level: FlashcardLevel }[],
  level: FlashcardLevel | "todos"
): string[] {
  return allIds
    .filter((c) => level === "todos" || c.level === level)
    .map((c) => c.id);
}
