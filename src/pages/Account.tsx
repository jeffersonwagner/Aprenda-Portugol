import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/auth";
import { accentShadow } from "../lib/style";

export default function Account() {
  const navigate = useNavigate();
  const { user, cloudEnabled, signIn, signUp, signOut } = useAuth();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setSubmitting(true);
    const result =
      mode === "login" ? await signIn(email, password) : await signUp(email, password);
    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }
    if (result.needsEmailConfirmation) {
      setInfo("Conta criada! Confirme seu e-mail para poder entrar.");
      return;
    }
    navigate("/");
  }

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col bg-slate-50 px-6 py-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 self-start text-2xl text-slate-400 hover:text-slate-600"
        aria-label="Voltar"
      >
        ✕
      </button>

      {user ? (
        <div>
          <h1 className="mb-2 text-2xl font-extrabold text-slate-800">Sua conta</h1>
          <p className="mb-6 text-slate-500">
            Conectado como <span className="font-semibold">{user.email}</span>. Seu
            progresso é salvo automaticamente na nuvem.
          </p>
          <button
            type="button"
            onClick={() => signOut()}
            className="w-full rounded-2xl border-2 border-slate-300 py-3 font-bold text-slate-600 hover:bg-slate-100"
          >
            Sair da conta
          </button>
        </div>
      ) : !cloudEnabled ? (
        <div>
          <h1 className="mb-2 text-2xl font-extrabold text-slate-800">Sua conta</h1>
          <p className="text-slate-500">
            A sincronização na nuvem ainda não foi configurada neste app. Seu progresso
            está sendo salvo apenas neste navegador.
          </p>
        </div>
      ) : (
        <div>
          <h1 className="mb-1 text-2xl font-extrabold text-slate-800">
            {mode === "login" ? "Entrar" : "Criar conta"}
          </h1>
          <p className="mb-6 text-slate-500">
            Crie uma conta para salvar seu progresso na nuvem e acessá-lo de qualquer
            aparelho.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              required
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-brand-teal"
            />
            <input
              type="password"
              required
              minLength={6}
              placeholder="Senha (mín. 6 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-brand-teal"
            />

            {error && <p className="text-sm font-semibold text-brand-rose">{error}</p>}
            {info && <p className="text-sm font-semibold text-brand-teal">{info}</p>}

            <button
              type="submit"
              disabled={submitting}
              style={accentShadow("#0f766e")}
              className="btn-3d mt-2 rounded-2xl bg-brand-teal py-3 font-extrabold text-white disabled:opacity-60"
            >
              {mode === "login" ? "Entrar" : "Criar conta"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError(null);
              setInfo(null);
            }}
            className="mt-4 w-full text-center text-sm font-semibold text-brand-indigo"
          >
            {mode === "login"
              ? "Não tem conta? Criar uma"
              : "Já tem conta? Entrar"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 w-full text-center text-sm font-semibold text-slate-400 hover:text-slate-600"
          >
            Continuar sem conta
          </button>
        </div>
      )}
    </div>
  );
}
