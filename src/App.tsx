import { Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Flashcards from "./pages/Flashcards";
import LessonPage from "./pages/Lesson";
import Practice from "./pages/Practice";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/praticar" element={<Practice />} />
        <Route path="/praticar/flashcards" element={<Flashcards />} />
      </Route>
      <Route path="/licao/:lessonId" element={<LessonPage />} />
      <Route path="/conta" element={<Account />} />
    </Routes>
  );
}
