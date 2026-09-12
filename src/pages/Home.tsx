import Trail from "../components/Trail";

export default function Home() {
  return (
    <>
      <main className="px-4 pt-8 sm:px-6">
        <Trail />
      </main>
      <footer className="mx-auto max-w-md px-6 pb-6 text-center text-xs text-slate-400">
        Sintaxe baseada no{" "}
        <a
          href="https://univali-lite.github.io/Portugol-Studio/"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-slate-600"
        >
          Portugol Studio
        </a>{" "}
        (UNIVALI) — projeto de estudo independente, sem vínculo oficial.
      </footer>
    </>
  );
}
