import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider.tsx";
import { BrowserRouter } from "react-router";
import { RecoilRoot } from "recoil";
import { HelmetProvider } from "react-helmet-async";
import App from "@/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Provider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </Provider>
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>
);
