import type { Lesson } from "../types";
import { accentShadow } from "../lib/style";

export type LessonStatus = "locked" | "unlocked" | "completed";

interface LessonNodeProps {
  lesson: Lesson;
  status: LessonStatus;
  stars: number;
  offsetX: number;
  color: string;
  onClick: () => void;
}

const colorClasses: Record<string, string> = {
  "brand-teal": "bg-brand-teal",
  "brand-indigo": "bg-brand-indigo",
  "brand-amber": "bg-brand-amber",
  "brand-rose": "bg-brand-rose",
  "brand-violet": "bg-brand-violet",
};

export default function LessonNode({
  lesson,
  status,
  stars,
  offsetX,
  color,
  onClick,
}: LessonNodeProps) {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";

  return (
    <div
      className="flex flex-col items-center"
      style={{ transform: `translateX(${offsetX}px)` }}
    >
      <button
        type="button"
        onClick={onClick}
        disabled={isLocked}
        aria-label={
          isLocked
            ? `${lesson.title} (bloqueada)`
            : `Abrir lição: ${lesson.title}`
        }
        className={`btn-3d relative flex h-16 w-16 items-center justify-center rounded-2xl text-2xl shadow-md ${
          isLocked
            ? "cursor-not-allowed bg-slate-300 text-slate-400"
            : `${colorClasses[color] ?? "bg-brand-teal"} text-white`
        }`}
        style={!isLocked ? accentShadow("rgba(0,0,0,0.2)") : undefined}
      >
        {isLocked ? "🔒" : lesson.icon}
        {isCompleted && (
          <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs shadow">
            ✓
          </span>
        )}
      </button>
      <div className="mt-1 flex gap-0.5">
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            className={`text-xs ${
              n <= stars ? "text-brand-amber" : "text-slate-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="mt-0.5 max-w-24 text-center text-xs font-semibold text-slate-600">
        {lesson.title}
      </span>
    </div>
  );
}
