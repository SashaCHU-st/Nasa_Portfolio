// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AuthProvider from "./context/AuthContext.tsx";

createRoot(document.getElementById("ui")!).render(
  // <StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
  //  </StrictMode>,
);
