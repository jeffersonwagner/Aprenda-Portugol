import type { ReactNode } from "react";
import { useAuth } from "../state/auth";

/**
 * Waits for the initial Supabase session check before mounting the app, so
 * the progress contexts always know whether there's a logged-in user before
 * they load or sync any state (avoids a guest-data flash / spurious writes).
 */
export default function AuthGate({ children }: { children: ReactNode }) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-slate-50 text-slate-400">
        Carregando...
      </div>
    );
  }

  return <>{children}</>;
}
