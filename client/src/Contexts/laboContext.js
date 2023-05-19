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
  const [collections, setCollections] = useState([]);
  const [allNfts, setAllNfts] = useState([]);
  const [categoryzed, setCategoryzed] = useState([]);
  const [filtredNFTs, setFiltredNFTs] = useState([]);
  const [selected, SetSelected] = useState([]);
  let [requests, setRequests] = useState([]);

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
  // Get the laboratory data from the contract
  const getLaboratory = async (_address) => {
    if (_address) {
      try {
        const response = await Auth0Contract.methods
          .getLaboratory(_address)
          .call();
        setUser(parseLaboratory(response));
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Make a collection of requests
  const makeRequest = async (_request) => {
    try {
      const response = await ComposableContract.methods
        .addBuyRequest(_request)
        .send({ from: address, gas: 567202});
      console.log("Request sent successfully");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  // get all laboratory requestes
  const getRequests = async () => {
    try {
      const response = await ComposableContract.methods.getRequests().call({
        from: address,
      });
      setRequests(response);
      console.log(response);
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
    getRequests();
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
        requests,
        selected,
        SetSelected,
        getLaboratory,
        setCategoryzed,
        makeRequest,
        getAllNFTs,
        getCollections,
        getNfts,
        acceptPayment,
        rejectPayment,
        setFiltredNFTs,
        setRequests,
      }}
    >
      {children}
    </LaboContext.Provider>
  );
};
