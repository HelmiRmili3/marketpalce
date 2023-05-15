import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import Web3 from "web3";

const WalletContext = createContext();

export function useWallet() {
  return useContext(WalletContext);
}

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [changed, setChanged] = useState(false);
  const [errors, setErrors] = useState(null);
  const connectWallet = useCallback(async () => {
    try {
      const ethereum = window.ethereum;
      if (ethereum) {
        const web3 = new Web3(ethereum);
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        setAddress(accounts[0]);
        setErrors(null);
        ethereum.on("accountsChanged", function (accounts) {
          setAddress(accounts[0]);
          setErrors(null);
          setChanged(true);
          console.log("Account changed to", accounts[0]);
        });
      } else {
        setErrors("MetaMask not detected");
        console.error("MetaMask not detected");
      }
    } catch (error) {
      setErrors("Connect your wallet");
    }
  }, []);

  useEffect(() => {
    connectWallet();
  }, [connectWallet]);

  const walletContextValue = {
    address,
    setAddress,
    changed,
    setChanged,
    errors,
  };

  return (
    <WalletContext.Provider value={walletContextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export default React.memo(WalletProvider);
