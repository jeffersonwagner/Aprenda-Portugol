import { useNavigate } from "react-router-dom";
import { units } from "../data/units";
import { getLessonsByUnit, lessons } from "../data/lessons";
import { useProgress } from "../state/progress";
import LessonNode, { type LessonStatus } from "./LessonNode";

const unitBannerClasses: Record<string, string> = {
  "brand-green": "bg-brand-green",
  "brand-blue": "bg-brand-blue",
  "brand-yellow": "bg-brand-yellow",
  "brand-red": "bg-brand-red",
  "brand-purple": "bg-brand-purple",
};

export default function Trail() {
  const navigate = useNavigate();
  const { state, isLessonUnlocked } = useProgress();

  return (
    <div className="mx-auto max-w-md pb-16">
      {units.map((unit) => (
        <section key={unit.id} className="mb-10">
          <div
            className={`mx-4 mb-8 rounded-2xl px-5 py-4 text-white shadow-md sm:mx-0 ${
              unitBannerClasses[unit.color] ?? "bg-brand-green"
            }`}
          >
            <h2 className="text-lg font-extrabold">{unit.title}</h2>
            <p className="text-sm opacity-90">{unit.description}</p>
          </div>

          <div className="flex flex-col items-center gap-8">
            {getLessonsByUnit(unit.id).map((lesson) => {
              const globalIndex = lessons.findIndex((l) => l.id === lesson.id);
              const offsetX = Math.round(
                70 * Math.sin((globalIndex * Math.PI) / 3)
              );
              const progress = state.lessonProgress[lesson.id];
              const status: LessonStatus = progress?.completed
                ? "completed"
                : isLessonUnlocked(lesson.id)
                  ? "unlocked"
                  : "locked";

              return (
                <LessonNode
                  key={lesson.id}
                  lesson={lesson}
                  status={status}
                  stars={progress?.stars ?? 0}
                  offsetX={offsetX}
                  color={unit.color}
                  onClick={() => navigate(`/licao/${lesson.id}`)}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
