import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persist, store } from "@store/app/store.ts";
// import { persist, store } from "@store/app/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persist}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
