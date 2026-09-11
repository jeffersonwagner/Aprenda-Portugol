import type { MultipleChoiceExercise } from "../../types";
import CodeBlock from "../CodeBlock";

interface Props {
  exercise: MultipleChoiceExercise;
  answer: number | null;
  submitted: boolean;
  onChange: (index: number) => void;
}

export default function MultipleChoice({
  exercise,
  answer,
  submitted,
  onChange,
}: Props) {
  return (
    <div>
      <h3 className="mb-4 text-xl font-bold text-slate-800">
        {exercise.prompt}
      </h3>
      {exercise.code && <CodeBlock code={exercise.code} className="mb-4" />}
      <div className="flex flex-col gap-3">
        {exercise.options.map((option, index) => {
          const isSelected = answer === index;
          const isCorrectOption = index === exercise.correctIndex;

          let stateClasses =
            "border-slate-200 hover:border-slate-300 hover:bg-slate-50";
          if (submitted) {
            if (isCorrectOption) {
              stateClasses = "border-brand-teal bg-teal-50 text-teal-800";
            } else if (isSelected) {
              stateClasses = "border-brand-rose bg-rose-50 text-rose-800";
            } else {
              stateClasses = "border-slate-200 opacity-60";
            }
          } else if (isSelected) {
            stateClasses = "border-brand-indigo bg-indigo-50";
          }

          return (
            <button
              key={index}
              type="button"
              disabled={submitted}
              onClick={() => onChange(index)}
              className={`rounded-xl border-2 px-4 py-3 text-left font-mono text-sm font-medium transition-colors disabled:cursor-not-allowed sm:font-sans ${stateClasses}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
