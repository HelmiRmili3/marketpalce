import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Auth0Contract,
  ComposableContract,
  MedicalDataNFTContract,
} from "../utils/contracts";
import {
  parseNFTS,
  parseNft,
  parseCollection,
  getCollections,
  parseLaboratory,
  categorizeNfts,
  getAllNFTs,
  getNfts,
} from "../utils/helper";
import { useWallet } from "./walletContext";

const LaboContext = createContext();

export function useLabo() {
  return useContext(LaboContext);
}

export const LaboProvider = ({ children }) => {
  const { address } = useWallet();
  const [user, setUser] = useState();
  const [collections, setCollections] = useState(null);
  const [allNfts, setAllNfts] = useState(null);
  const [categoryzed , setCategoryzed] = useState(null);
  const [filtredNFTs, setFiltredNFTs] = useState(null);
  const [request, setRequest] = useState(null);
  const Request = [
    {
      owner: "0x1254dsf6s8sf",
      buyer: "0x1254dsf6s8sf",
      date: 1245587,
      deleted: false,
      price: 30000000,
      nfts: [5, 2, 0, 1, 4],
    },
    {
      owner: "0x1254dsf6s8sf",
      buyer: "0x1254dsf6s8sf",
      date: 1245587,
      deleted: false,
      price: 30000000,
      nfts: [5, 2, 0, 1, 4],
    },
    {
      owner: "0x1254dsf6s8sf",
      buyer: "0x1254dsf6s8sf",
      date: 1245587,
      deleted: false,
      price: 30000000,
      nfts: [5, 2, 0, 1, 4],
    },
  ];

  const getAllNFTs = async () => {
    const result = [];
    try {
      await MedicalDataNFTContract.methods
        .getAllNfts()
        .call()
        .then((nfts) => nfts.forEach((nft) => result.push(parseNft(nft))));
    } catch (error) {
      console.log(error);
    }
    setAllNfts(result);
    setCategoryzed(categorizeNfts(result));
  };

  console.log(categoryzed);
  // Get the laboratory data from the contract
  const getLaboratory = async (_address) => {
    try {
      const response = await Auth0Contract.methods
        .getLaboratory(_address)
        .call();
      setUser(parseLaboratory(response));
    } catch (error) {
      console.log(error);
    }
  };

  // Make a collection of requests
  const makeRequest = async (_request) => {
    try {
      await ComposableContract.methods.addBuyRequest(_request).then(() => {
        console.log("Request sent successfully");
      });
    } catch (error) {
      console.log(error);
    }
  };

  // categoraise them per collection

  // const getPurshasedNfts = (_collections) => {
  //   const purchased = {};
  //   _collections.forEach(collection => {
  //     collection.
  //     if(purchased[])
  //   });

  // };

  // Get owned NFTs from the contract

  // Accept payment for a request
  const acceptPayment = async (_id) => {
    try {
      await ComposableContract.methods.acceptPayment(_id).call();
      console.log("The request has been accepted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // Reject payment for a request
  const rejectPayment = async (_id) => {
    try {
      await ComposableContract.methods.rejectPayment(_id).call();
      console.log("The request has been rejected");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLaboratory(address);
    getCollections();
    getAllNFTs();
  }, [address]);

  return (
    <LaboContext.Provider
      value={{
        user,
        collections,
        allNfts,
        filtredNFTs,
        categoryzed,
        request,
        getLaboratory,
        setCategoryzed,
        makeRequest,
        getAllNFTs,
        getCollections,
        getNfts,
        acceptPayment,
        rejectPayment,
        setFiltredNFTs,
        setRequest,
      }}
    >
      {children}
    </LaboContext.Provider>
  );
};
