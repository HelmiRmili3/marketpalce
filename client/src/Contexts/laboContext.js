import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Auth0Contract,
  ComposableContract,
  MedicalDataNFTContract,
  ComposableAddress,
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
import { useWallet } from "../Contexts/walletContext";

import Web3 from "web3";
const web3 = new Web3("http://localhost:7545");
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
      // let gasEstimate =
      //   await ComposableContract.methods.addBuyRequest.estimateGas(_request, {
      //     from: address,
      //   });
      // console.log("gas for addBuyRequest : ", gasEstimate);
      const response = await ComposableContract.methods
        .addBuyRequest(_request)
        .send({ from: address, gas: 967202 });
      console.log("Request sent successfully");
      console.log(response);
      getRequests();
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
    } catch (error) {
      console.log(error);
    }
  };

  // categoraise them per collection
  const getCollections = async () => {
    try {
      const response = await ComposableContract.methods
        .getComposition()
        .call({ from: address });
      setCollections(parseCollection(response));
    } catch (error) {
      console.log(error);
    }
  };

  const acceptPayment = async (_id, _price) => {
    try {
      let gasEstimate =
        await ComposableContract.methods.acceptPayment.estimateGas(_id, {
          from: address,
        });
      console.log("gas for acceptPayment : ", gasEstimate);
      const response = await ComposableContract.methods
        .acceptPayment(_id)
        .encodeABI();
      const transactionObject = {
        from: address,
        to: ComposableAddress,
        data: response,
        value: _price,
        gas: "400000",
      };
      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [transactionObject],
        })
        .then((transactionHash) => {
          console.log("Transaction hash:", transactionHash);
          getRequests();
          getCollections();
          getAllNFTs();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Reject payment for a request
  const rejectPayment = async (_id) => {
    try {
      const response = await ComposableContract.methods
        .rejectPayment(_id)
        .send({ from: address, gas: 900000 });
      console.log(response);
      console.log("The request has been rejected");
      getRequests();
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
