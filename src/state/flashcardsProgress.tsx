import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { fetchCloudRow, upsertCloudRow } from "../lib/cloudSync";
import { useAuth } from "./auth";
import type { FlashcardLevel, FlashcardResult, FlashcardsState } from "../types";

const STORAGE_KEY = "aprenda-portugol:flashcards";
const TABLE = "flashcards_progress";

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

interface FlashcardsCloudRow {
  results: Record<string, FlashcardResult>;
  total_score: number;
}

function fromCloudRow(row: FlashcardsCloudRow): FlashcardsState {
  return { results: row.results ?? {}, totalScore: row.total_score };
}

function toCloudPayload(state: FlashcardsState) {
  return { results: state.results, total_score: state.totalScore };
}

/** One-time merge when a guest logs in: "correct" always wins, score never drops. */
function mergeFlashcards(a: FlashcardsState, b: FlashcardsState): FlashcardsState {
  const ids = new Set([...Object.keys(a.results), ...Object.keys(b.results)]);
  const results: Record<string, FlashcardResult> = {};
  for (const id of ids) {
    const av = a.results[id];
    const bv = b.results[id];
    results[id] = av === "correct" || bv === "correct" ? "correct" : (av ?? bv)!;
  }
  return { results, totalScore: Math.max(a.totalScore, b.totalScore) };
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
  const { user } = useAuth();
  const [state, setState] = useState<FlashcardsState>(loadState);
  const syncedUserRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const uid = user?.id ?? null;
    if (syncedUserRef.current === uid) return;
    syncedUserRef.current = uid;

    if (!uid) {
      setState(loadState());
      return;
    }

    let cancelled = false;
    (async () => {
      const localGuest = loadState();
      const cloudRow = await fetchCloudRow<FlashcardsCloudRow>(TABLE, uid);
      const merged = cloudRow
        ? mergeFlashcards(localGuest, fromCloudRow(cloudRow))
        : localGuest;
      if (cancelled) return;
      await upsertCloudRow(TABLE, uid, toCloudPayload(merged));
      if (!cancelled) setState(merged);
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore write failures (e.g. private browsing storage limits)
    }
    if (user) {
      upsertCloudRow(TABLE, user.id, toCloudPayload(state));
    }
  }, [state, user]);

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
