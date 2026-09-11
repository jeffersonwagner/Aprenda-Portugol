export type ExerciseType = "multiple-choice" | "fill-blank" | "order-blocks";

export interface BaseExercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  code?: string;
  explanation?: string;
}

export interface MultipleChoiceExercise extends BaseExercise {
  type: "multiple-choice";
  options: string[];
  correctIndex: number;
}

export interface FillBlankExercise extends BaseExercise {
  type: "fill-blank";
  /** Code containing a single "___" placeholder for the blank. */
  code: string;
  options: string[];
  correctAnswer: string;
}

export interface OrderBlocksExercise extends BaseExercise {
  type: "order-blocks";
  /** Lines of code in the correct order; will be shuffled for the user. */
  blocks: string[];
}

export type Exercise =
  | MultipleChoiceExercise
  | FillBlankExercise
  | OrderBlocksExercise;

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  icon: string;
  exercises: Exercise[];
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  color: string;
}

export interface LessonProgress {
  completed: boolean;
  stars: 0 | 1 | 2 | 3;
  bestScore: number;
}

export interface ProgressState {
  xp: number;
  streak: number;
  lastActiveDate: string | null;
  lessonProgress: Record<string, LessonProgress>;
}
