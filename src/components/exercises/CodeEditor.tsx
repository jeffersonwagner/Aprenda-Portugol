import { useEffect, useState } from "react";
import type { CodeExercise } from "../../types";
import { execute, normalizeOutput, type RunResult } from "../../lib/portugol";

interface Props {
  exercise: CodeExercise;
  answer: string | null;
  submitted: boolean;
  onChange: (value: string) => void;
}

export default function CodeEditor({ exercise, answer, submitted, onChange }: Props) {
  const [lastRun, setLastRun] = useState<RunResult | null>(null);

  useEffect(() => {
    setLastRun(null);
  }, [exercise.id]);

  useEffect(() => {
    if (submitted && typeof answer === "string" && !lastRun) {
      setLastRun(execute(answer, exercise.inputs ?? []));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  function handleRun() {
    if (typeof answer === "string") {
      setLastRun(execute(answer, exercise.inputs ?? []));
    }
  }

  const passed =
    lastRun !== null &&
    lastRun.error === null &&
    normalizeOutput(lastRun.output) === normalizeOutput(exercise.expectedOutput);

  return (
    <div>
      <h3 className="mb-2 text-xl font-bold text-slate-800">{exercise.prompt}</h3>
      {exercise.inputs && exercise.inputs.length > 0 && (
        <p className="mb-3 text-sm text-slate-500">
          Entradas simuladas, na ordem em que seu programa vai "ler":{" "}
          <span className="font-mono">{exercise.inputs.join(", ")}</span>
        </p>
      )}

      <textarea
        value={answer ?? exercise.starterCode}
        onChange={(e) => onChange(e.target.value)}
        disabled={submitted}
        spellCheck={false}
        rows={12}
        className="mb-3 w-full resize-y rounded-xl bg-slate-800 p-3 font-mono text-sm text-slate-100 outline-none disabled:opacity-80"
      />

      <button
        type="button"
        onClick={handleRun}
        disabled={submitted}
        className="mb-3 rounded-lg border-2 border-brand-indigo px-4 py-2 text-sm font-bold text-brand-indigo transition-colors hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        ▶ Executar
      </button>

      {lastRun && (
        <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-3">
          <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-400">
            Saída do console
          </p>
          {lastRun.error ? (
            <pre className="whitespace-pre-wrap font-mono text-sm text-brand-rose">
              {lastRun.error}
            </pre>
          ) : (
            <pre className="whitespace-pre-wrap font-mono text-sm text-slate-700">
              {lastRun.output || "(nenhuma saída)"}
            </pre>
          )}
          {submitted && (
            <p
              className={`mt-2 text-sm font-bold ${
                passed ? "text-brand-teal" : "text-brand-rose"
              }`}
            >
              {passed ? "Saída corresponde ao esperado ✓" : "A saída ainda não é a esperada."}
            </p>
          )}
          {submitted && !passed && exercise.hint && (
            <p className="mt-2 text-sm text-slate-500">💡 {exercise.hint}</p>
          )}
        </div>
      )}
    </div>
  );
}
