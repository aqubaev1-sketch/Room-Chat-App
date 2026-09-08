import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserDataProvider } from "./context/Context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserDataProvider>
        <App />
      </UserDataProvider>
    </BrowserRouter>
  </StrictMode>,
);
