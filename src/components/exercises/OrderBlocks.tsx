import { useEffect, useState } from "react";
import type { OrderBlocksExercise } from "../../types";
import { shuffle } from "../../lib/exercise";

interface Props {
  exercise: OrderBlocksExercise;
  submitted: boolean;
  onChange: (value: string[]) => void;
}

export default function OrderBlocks({ exercise, submitted, onChange }: Props) {
  const [order, setOrder] = useState<number[]>([]);
  const shuffled = shuffle(
    exercise.blocks.map((_, i) => i),
    exercise.id
  );
  const available = shuffled.filter((i) => !order.includes(i));

  useEffect(() => {
    onChange(order.map((i) => exercise.blocks[i]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  function place(index: number) {
    if (submitted) return;
    setOrder((prev) => [...prev, index]);
  }

  function removeAt(position: number) {
    if (submitted) return;
    setOrder((prev) => prev.filter((_, i) => i !== position));
  }

  return (
    <div>
      <h3 className="mb-4 text-xl font-bold text-slate-800">
        {exercise.prompt}
      </h3>

      <div className="mb-4 min-h-24 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-3">
        {order.length === 0 && (
          <p className="text-sm text-slate-400">
            Toque nos blocos abaixo para montar o código na ordem certa.
          </p>
        )}
        <div className="flex flex-col gap-2">
          {order.map((blockIndex, position) => {
            const isCorrectPos =
              exercise.blocks[position] === exercise.blocks[blockIndex];
            const stateClasses = submitted
              ? isCorrectPos
                ? "border-brand-green bg-green-50 text-green-800"
                : "border-brand-red bg-red-50 text-red-800"
              : "border-brand-blue bg-white";
            return (
              <button
                key={position}
                type="button"
                disabled={submitted}
                onClick={() => removeAt(position)}
                className={`rounded-lg border-2 px-3 py-2 text-left font-mono text-sm transition-colors disabled:cursor-not-allowed ${stateClasses}`}
              >
                {exercise.blocks[blockIndex]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {available.map((blockIndex) => (
          <button
            key={blockIndex}
            type="button"
            disabled={submitted}
            onClick={() => place(blockIndex)}
            className="rounded-lg border-2 border-slate-200 bg-white px-3 py-2 font-mono text-sm hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {exercise.blocks[blockIndex]}
          </button>
        ))}
      </div>

      {order.length > 0 && !submitted && (
        <button
          type="button"
          onClick={() => setOrder([])}
          className="mt-3 text-sm font-semibold text-slate-400 hover:text-slate-600"
        >
          Limpar
        </button>
      )}
    </div>
  );
}
