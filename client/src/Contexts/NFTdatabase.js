import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";

import Web3 from "web3";
// import { useAuth } from "../contexts/authContext";
import { useWallet } from "./walletContext";
const web3 = new Web3("http://localhost:7545");
const contractAbi = require("../MedicalNFT.json");
const contractAddress = "0xf31c9355B96385E66aBB55fEb527D0E378dc3E6c";
const contract = new web3.eth.Contract(contractAbi.abi, contractAddress);

const NftDatabaseContext = createContext();

export function useNftDatabase() {
  return useContext(NftDatabaseContext);
}

export const NftDatabaseProvider = ({ children }) => {
  const { address } = useWallet();
  const [allNfts, setAllNfts] = useState([]);
  const [ownedNfts, setOwnedNfts] = useState([]);
  const [buyRequest, setBuyRequest] = useState();
  const [blocked, setblocked] = useState();

  const addBuyRequest = async (tokenID) => {
    try {
      let responce = await contract.methods.addBuyRequest(tokenID);
      console.log(responce);
    } catch (error) {
      console.log(error);
    }
  };
  const mint = async (nftname, nftprice, nftdata, nftperiode) => {
    const options = {
      from: address,
      gas: 1000000,
    };
    try {
      const response = await contract.methods
        .mint(nftname, nftprice, nftdata, nftperiode)
        .send(options);
      console.log("The nft seccfuly added to the your nft collaction");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const approveBuyRequest = async (buyer, tokenID, price) => {
    const amount = web3.utils.toWei(price, "ether");
    const options = {
      from: address,
      value: amount,
      gas: 100000,
    };
    try {
      await contract.methods
        .approveBuyRequest(buyer, tokenID)
        .send(options)
        .on("receipt", (receipt) =>
          console.log("Transaction receipt:", receipt)
        )
        .on("error", (error) => console.error("Transaction error:", error));
    } catch (error) {
      console.log(error);
    }
  };
  const rejectBuyRequest = async (buyer, tokenID) => {
    try {
      await contract.methods.rejectBuyRequest(buyer, tokenID);
    } catch (error) {
      console.log(error);
    }
  };
  const getMedicalData = async () => {
    try {
      const count = await contract.methods._tokenIdCounter().call();
      const newNfts = [];
      for (let index = 0; index < count; index++) {
        try {
          const response = await contract.methods.getTokenData(index).call();
          newNfts.push(response);
        } catch (error) {
          console.log(error);
        }
      }
      setAllNfts(newNfts);
      if (newNfts.length > 0) {
        const nfts = newNfts.filter((nft) => {
          if (nft.owner == address) {
            return true;
          }
          if (nft.buyers.includes(address)) {
            return true;
          }
        });
        setOwnedNfts(nfts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBuyRequests = async () => {
    try {
      const response = await contract.methods.getBuyRequests().call();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const tokenIdCounter = async () => {
    try {
      const response = await contract.methods._tokenIdCounter().call();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMedicalData();
  }, [address]);
  return (
    <NftDatabaseContext.Provider
      value={{
        allNfts,
        ownedNfts,
        addBuyRequest,
        mint,
        approveBuyRequest,
        rejectBuyRequest,
        getBuyRequests,
        tokenIdCounter,
      }}
    >
      {children}
    </NftDatabaseContext.Provider>
  );
};
