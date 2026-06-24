import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Providers } from "./Providers";
import { App } from "./App";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

createRoot(root).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
