import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LessonPage from "./pages/Lesson";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/licao/:lessonId" element={<LessonPage />} />
    </Routes>
  );
}
