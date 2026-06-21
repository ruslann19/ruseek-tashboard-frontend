// import { StrictMode } from "react";
import App from "@/app";

import { createRoot } from "react-dom/client";

import { AuthProvider } from "@/shared/contexts/auth";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>,
  // </StrictMode>
);
