import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import AuthGate from "./components/AuthGate.tsx";
import { AuthProvider } from "./state/auth.tsx";
import { FlashcardsProgressProvider } from "./state/flashcardsProgress.tsx";
import { ProgressProvider } from "./state/progress.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AuthGate>
          <ProgressProvider>
            <FlashcardsProgressProvider>
              <App />
            </FlashcardsProgressProvider>
          </ProgressProvider>
        </AuthGate>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
