import { Outlet } from "react-router-dom";
import StatsHeader from "./StatsHeader";
import TabBar from "./TabBar";
import { useProgress } from "../state/progress";

export default function AppShell() {
  const { state } = useProgress();

  return (
    <div className="min-h-svh bg-slate-50 pb-20">
      <StatsHeader xp={state.xp} streak={state.streak} />
      <Outlet />
      <TabBar />
    </div>
  );
}
