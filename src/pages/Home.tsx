import StatsHeader from "../components/StatsHeader";
import Trail from "../components/Trail";
import { useProgress } from "../state/progress";

export default function Home() {
  const { state } = useProgress();

  return (
    <div className="min-h-svh bg-slate-50">
      <StatsHeader xp={state.xp} streak={state.streak} />
      <main className="px-4 pt-8 sm:px-6">
        <Trail />
      </main>
    </div>
  );
}
