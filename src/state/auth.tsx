import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { isCloudSyncEnabled, supabase } from "../lib/supabase";

const ERROR_MESSAGES: Record<string, string> = {
  "Invalid login credentials": "E-mail ou senha incorretos.",
  "User already registered": "Este e-mail já está cadastrado.",
  "Email not confirmed":
    "Confirme seu e-mail antes de entrar (verifique sua caixa de entrada).",
};

function translateError(message: string): string {
  if (ERROR_MESSAGES[message]) return ERROR_MESSAGES[message];
  if (message.toLowerCase().includes("password")) {
    return "A senha precisa ter pelo menos 6 caracteres.";
  }
  return message;
}

interface AuthResult {
  error: string | null;
  needsEmailConfirmation?: boolean;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  cloudEnabled: boolean;
  signUp: (email: string, password: string) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(isCloudSyncEnabled);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.subscription.unsubscribe();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      cloudEnabled: isCloudSyncEnabled,
      async signUp(email, password) {
        if (!supabase) {
          return { error: "Sincronização na nuvem não está configurada neste app." };
        }
        try {
          const { data, error } = await supabase.auth.signUp({ email, password });
          if (error) return { error: translateError(error.message) };
          return { error: null, needsEmailConfirmation: !data.session };
        } catch {
          return {
            error: "Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.",
          };
        }
      },
      async signIn(email, password) {
        if (!supabase) {
          return { error: "Sincronização na nuvem não está configurada neste app." };
        }
        try {
          const { error } = await supabase.auth.signInWithPassword({ email, password });
          return { error: error ? translateError(error.message) : null };
        } catch {
          return {
            error: "Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.",
          };
        }
      },
      async signOut() {
        if (!supabase) return;
        await supabase.auth.signOut();
      },
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
