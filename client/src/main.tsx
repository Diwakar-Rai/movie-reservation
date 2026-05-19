import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

import { store } from "@/store/store.ts";
import { queryClient } from "@/lib/queryClient.ts";

import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster richColors />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
