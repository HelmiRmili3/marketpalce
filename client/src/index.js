import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { AuthProvider } from "./Contexts/authContext";
import { WalletProvider } from "./Contexts/walletContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WalletProvider>
      <AuthProvider>
          <App />
      </AuthProvider>
    </WalletProvider>
  </React.StrictMode>
);
reportWebVitals();
