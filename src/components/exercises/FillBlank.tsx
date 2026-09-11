import type { FillBlankExercise } from "../../types";

interface Props {
  exercise: FillBlankExercise;
  answer: string | null;
  submitted: boolean;
  onChange: (value: string) => void;
}

export default function FillBlank({
  exercise,
  answer,
  submitted,
  onChange,
}: Props) {
  const displayed = exercise.code.replace("___", answer ?? "▁▁▁");

  return (
    <div>
      <h3 className="mb-4 text-xl font-bold text-slate-800">
        {exercise.prompt}
      </h3>
      <pre className="mb-4 overflow-x-auto rounded-xl bg-slate-800 px-4 py-3 text-left font-mono text-sm text-slate-100">
        <code>{displayed}</code>
      </pre>
      <div className="flex flex-wrap gap-3">
        {exercise.options.map((option) => {
          const isSelected = answer === option;
          const isCorrectOption = option === exercise.correctAnswer;

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
              key={option}
              type="button"
              disabled={submitted}
              onClick={() => onChange(option)}
              className={`rounded-xl border-2 px-4 py-2 font-mono text-sm font-semibold transition-colors disabled:cursor-not-allowed ${stateClasses}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
