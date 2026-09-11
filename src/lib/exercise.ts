import type { Exercise } from "../types";

export type Answer = number | string | string[] | null;

export function isAnswerComplete(exercise: Exercise, answer: Answer): boolean {
  switch (exercise.type) {
    case "multiple-choice":
      return typeof answer === "number";
    case "fill-blank":
      return typeof answer === "string" && answer.length > 0;
    case "order-blocks":
      return Array.isArray(answer) && answer.length === exercise.blocks.length;
  }
}

export function checkAnswer(exercise: Exercise, answer: Answer): boolean {
  switch (exercise.type) {
    case "multiple-choice":
      return answer === exercise.correctIndex;
    case "fill-blank":
      return answer === exercise.correctAnswer;
    case "order-blocks":
      return (
        Array.isArray(answer) &&
        answer.length === exercise.blocks.length &&
        answer.every((line, i) => line === exercise.blocks[i])
      );
  }
}

/** Deterministic shuffle so re-renders don't reshuffle mid-exercise. */
export function shuffle<T>(items: T[], seed: string): T[] {
  const arr = [...items];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  for (let i = arr.length - 1; i > 0; i--) {
    hash = (hash * 1103515245 + 12345) >>> 0;
    const j = hash % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
