import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./redux/store/store.ts";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AuthProvider from "./components/AuthProvider.tsx";
import AlertProvider from "./components/AlertProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </AlertProvider>
    </Provider>
  </React.StrictMode>
);
