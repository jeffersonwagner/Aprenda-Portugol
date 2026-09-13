import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { lessons } from "../data/lessons";
import { fetchCloudRow, upsertCloudRow } from "../lib/cloudSync";
import { useAuth } from "./auth";
import type { LessonProgress, ProgressState } from "../types";

const STORAGE_KEY = "aprenda-portugol:progress";
const TABLE = "lesson_progress";

const defaultState: ProgressState = {
  xp: 0,
  streak: 0,
  lastActiveDate: null,
  lessonProgress: {},
};

function loadState(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return { ...defaultState, ...parsed };
  } catch {
    return defaultState;
  }
}

interface LessonCloudRow {
  xp: number;
  streak: number;
  last_active_date: string | null;
  lesson_progress: Record<string, LessonProgress>;
}

function fromCloudRow(row: LessonCloudRow): ProgressState {
  return {
    xp: row.xp,
    streak: row.streak,
    lastActiveDate: row.last_active_date,
    lessonProgress: row.lesson_progress ?? {},
  };
}

function toCloudPayload(state: ProgressState) {
  return {
    xp: state.xp,
    streak: state.streak,
    last_active_date: state.lastActiveDate,
    lesson_progress: state.lessonProgress,
  };
}

/** One-time merge when a guest logs in: never lose progress from either side. */
function mergeProgress(a: ProgressState, b: ProgressState): ProgressState {
  const lessonProgress: Record<string, LessonProgress> = { ...a.lessonProgress };
  for (const [id, bProg] of Object.entries(b.lessonProgress)) {
    const aProg = lessonProgress[id];
    lessonProgress[id] = aProg
      ? {
          completed: aProg.completed || bProg.completed,
          stars: Math.max(aProg.stars, bProg.stars) as 0 | 1 | 2 | 3,
          bestScore: Math.max(aProg.bestScore, bProg.bestScore),
        }
      : bProg;
  }

  const preferB = (b.lastActiveDate ?? "") > (a.lastActiveDate ?? "");

  return {
    xp: Math.max(a.xp, b.xp),
    streak: preferB ? b.streak : a.streak,
    lastActiveDate: preferB ? b.lastActiveDate : a.lastActiveDate,
    lessonProgress,
  };
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function isYesterday(dateKey: string, today: string): boolean {
  const d = new Date(dateKey + "T00:00:00");
  const t = new Date(today + "T00:00:00");
  const diffDays = Math.round((t.getTime() - d.getTime()) / 86400000);
  return diffDays === 1;
}

export interface LessonResultInput {
  lessonId: string;
  totalExercises: number;
  correctCount: number;
  mistakes: number;
}

export interface LessonResultOutput {
  xpGained: number;
  stars: 1 | 2 | 3;
  isNewBest: boolean;
  streak: number;
}

interface ProgressContextValue {
  state: ProgressState;
  recordLessonResult: (input: LessonResultInput) => LessonResultOutput;
  isLessonUnlocked: (lessonId: string) => boolean;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [state, setState] = useState<ProgressState>(loadState);
  const syncedUserRef = useRef<string | null | undefined>(undefined);

  // On login, merge guest progress with the cloud copy (if any); on logout,
  // fall back to whatever is in localStorage.
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
      const cloudRow = await fetchCloudRow<LessonCloudRow>(TABLE, uid);
      const merged = cloudRow ? mergeProgress(localGuest, fromCloudRow(cloudRow)) : localGuest;
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

  const value = useMemo<ProgressContextValue>(() => {
    function recordLessonResult({
      lessonId,
      totalExercises,
      correctCount,
      mistakes,
    }: LessonResultInput): LessonResultOutput {
      const stars: 1 | 2 | 3 = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
      const xpGained = totalExercises * 10 + (stars - 1) * 10;

      let resultStreak = state.streak;
      let output: LessonResultOutput | null = null;

      setState((prev) => {
        const today = todayKey();
        let streak = prev.streak;
        if (prev.lastActiveDate !== today) {
          streak = isYesterday(prev.lastActiveDate ?? "", today)
            ? prev.streak + 1
            : 1;
        }

        const existing = prev.lessonProgress[lessonId];
        const isNewBest = !existing || stars > existing.stars;
        const bestScore = Math.max(
          existing?.bestScore ?? 0,
          correctCount / totalExercises
        );

        resultStreak = streak;
        output = { xpGained, stars, isNewBest, streak };

        return {
          ...prev,
          xp: prev.xp + xpGained,
          streak,
          lastActiveDate: today,
          lessonProgress: {
            ...prev.lessonProgress,
            [lessonId]: {
              completed: true,
              stars: (existing
                ? Math.max(existing.stars, stars)
                : stars) as 0 | 1 | 2 | 3,
              bestScore,
            },
          },
        };
      });

      return (
        output ?? { xpGained, stars, isNewBest: true, streak: resultStreak }
      );
    }

    function isLessonUnlocked(lessonId: string): boolean {
      const index = lessons.findIndex((l) => l.id === lessonId);
      if (index <= 0) return true;
      const previous = lessons[index - 1];
      return Boolean(state.lessonProgress[previous.id]?.completed);
    }

    function resetProgress() {
      setState(defaultState);
    }

    return { state, recordLessonResult, isLessonUnlocked, resetProgress };
  }, [state]);

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress deve ser usado dentro de ProgressProvider");
  }
  return ctx;
}
