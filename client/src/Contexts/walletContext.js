import React, { createContext, useState, useContext, useEffect } from "react";
import Web3 from "web3";
const WalletContext = createContext();
export function useWallet() {
  return useContext(WalletContext);
}
export const WalletProvider = ({ children }) => {
  const [address, setaddress] = useState("");
  const [changed, setChanged] = useState(false);
  const [errors, setErrors] = useState(null);


  const connectWallet = async () => {
    const ethereum = window.ethereum;
    if (ethereum) {
      // Create a Web3 instance using the injected provider from MetaMask
      const web3 = new Web3(ethereum);
      // Request account access from the user
      try {
        await ethereum
          .request({
            method: "eth_requestAccounts",
          })
          .then(async () => {
            // Get the list of accounts from MetaMask
            try {
              await web3.eth.getAccounts().then((accounts) => {
                setaddress(accounts[0]);
              });
            } catch (error) {
              setErrors("No accounts detected");
            }
          });
      } catch (error) {
        setErrors("Connect your wallet");
      }

      ethereum.on("accountsChanged", function(accounts) {
        // handle account change event
        setaddress(accounts[0]);
        setErrors(null);
        setChanged(true);
        console.log("Account changed to", accounts[0]);
      });
    } else {
      setErrors("MetaMask not detected");
      console.error("MetaMask not detected");
    }
  };
  useEffect(() => {
    connectWallet();
  });
  return (
    <WalletContext.Provider
      value={{ address, setaddress, changed, setChanged, errors }}
    >
      {children}
    </WalletContext.Provider>
  );
};
