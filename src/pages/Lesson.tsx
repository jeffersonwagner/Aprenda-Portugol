import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import HeartsBar from "../components/HeartsBar";
import LessonComplete from "../components/LessonComplete";
import LessonFailed from "../components/LessonFailed";
import ProgressBar from "../components/ProgressBar";
import FillBlank from "../components/exercises/FillBlank";
import MultipleChoice from "../components/exercises/MultipleChoice";
import OrderBlocks from "../components/exercises/OrderBlocks";
import { getLessonById } from "../data/lessons";
import { checkAnswer, isAnswerComplete, type Answer } from "../lib/exercise";
import { accentShadow } from "../lib/style";
import { useProgress, type LessonResultOutput } from "../state/progress";

const MAX_HEARTS = 5;

type Phase = "playing" | "complete" | "failed";

export default function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { recordLessonResult } = useProgress();

  const lesson = lessonId ? getLessonById(lessonId) : undefined;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState<Answer>(null);
  const [submitted, setSubmitted] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [mistakes, setMistakes] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("playing");
  const [result, setResult] = useState<LessonResultOutput | null>(null);

  function resetAttempt() {
    setCurrentIndex(0);
    setAnswer(null);
    setSubmitted(false);
    setLastCorrect(false);
    setHearts(MAX_HEARTS);
    setMistakes(0);
    setCorrectCount(0);
    setPhase("playing");
    setResult(null);
  }

  // Restart the attempt whenever the learner navigates to a different lesson.
  useEffect(() => {
    resetAttempt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  if (!lesson) {
    return <Navigate to="/" replace />;
  }

  const exercise = lesson.exercises[currentIndex];

  function handleSubmit() {
    const isCorrect = checkAnswer(exercise, answer);
    setLastCorrect(isCorrect);
    setSubmitted(true);
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
    } else {
      setMistakes((m) => m + 1);
      setHearts((h) => Math.max(0, h - 1));
    }
  }

  function handleContinue() {
    if (hearts <= 0 && !lastCorrect) {
      setPhase("failed");
      return;
    }
    if (currentIndex + 1 >= lesson!.exercises.length) {
      const output = recordLessonResult({
        lessonId: lesson!.id,
        totalExercises: lesson!.exercises.length,
        correctCount,
        mistakes,
      });
      setResult(output);
      setPhase("complete");
      return;
    }
    setCurrentIndex((i) => i + 1);
    setAnswer(null);
    setSubmitted(false);
    setLastCorrect(false);
  }

  if (phase === "complete" && result) {
    return (
      <LessonComplete
        stars={result.stars}
        xpGained={result.xpGained}
        correctCount={correctCount}
        total={lesson.exercises.length}
        onContinue={() => navigate("/")}
      />
    );
  }

  if (phase === "failed") {
    return (
      <LessonFailed onRetry={resetAttempt} onExit={() => navigate("/")} />
    );
  }

  return (
    <div className="flex min-h-svh flex-col bg-slate-50">
      <header className="flex items-center gap-4 px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={() => navigate("/")}
          aria-label="Sair da lição"
          className="text-2xl text-slate-400 hover:text-slate-600"
        >
          ✕
        </button>
        <ProgressBar value={currentIndex} max={lesson.exercises.length} />
        <HeartsBar hearts={hearts} maxHearts={MAX_HEARTS} />
      </header>

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-4 pb-32 sm:px-6">
        {exercise.type === "multiple-choice" && (
          <MultipleChoice
            key={exercise.id}
            exercise={exercise}
            answer={typeof answer === "number" ? answer : null}
            submitted={submitted}
            onChange={setAnswer}
          />
        )}
        {exercise.type === "fill-blank" && (
          <FillBlank
            key={exercise.id}
            exercise={exercise}
            answer={typeof answer === "string" ? answer : null}
            submitted={submitted}
            onChange={setAnswer}
          />
        )}
        {exercise.type === "order-blocks" && (
          <OrderBlocks
            key={exercise.id}
            exercise={exercise}
            submitted={submitted}
            onChange={setAnswer}
          />
        )}
      </main>

      <footer
        className={`fixed inset-x-0 bottom-0 border-t px-4 py-4 sm:px-6 ${
          submitted
            ? lastCorrect
              ? "border-green-200 bg-green-50"
              : "border-red-200 bg-red-50"
            : "border-slate-200 bg-white"
        }`}
      >
        <div className="mx-auto flex w-full max-w-xl items-center justify-between gap-4">
          {submitted ? (
            <div className="flex-1">
              <p
                className={`text-lg font-extrabold ${
                  lastCorrect ? "text-green-700" : "text-red-700"
                }`}
              >
                {lastCorrect ? "Certinho! 🎉" : "Não foi dessa vez"}
              </p>
              {exercise.explanation && (
                <p className="text-sm text-slate-500">
                  {exercise.explanation}
                </p>
              )}
            </div>
          ) : (
            <div className="flex-1" />
          )}
          {submitted ? (
            <button
              type="button"
              onClick={handleContinue}
              style={accentShadow(lastCorrect ? "#46a302" : "#d43939")}
              className={`btn-3d rounded-2xl px-8 py-3 text-base font-extrabold text-white ${
                lastCorrect ? "bg-brand-green" : "bg-brand-red"
              }`}
            >
              Continuar
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isAnswerComplete(exercise, answer)}
              style={accentShadow("#46a302")}
              className="btn-3d rounded-2xl bg-brand-green px-8 py-3 text-base font-extrabold text-white"
            >
              Verificar
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
