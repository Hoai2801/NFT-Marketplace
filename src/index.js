import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  ThirdwebProvider,
  // import the wallets you want
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThirdwebProvider
      supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnect()]}
      activeChain="mumbai"
      clientId="598b4f1195f15842446b09538ba00622"
    >
      <Navbar />
      <App />
    </ThirdwebProvider>
  </BrowserRouter>
);
