import React, { createContext, useContext, useState, useEffect } from "react";
import { useNftDatabase } from "./NFTdatabase";
import { useWallet } from "./walletContext";

import Web3 from "web3";
import { useWallet } from "./walletContext";
const web3 = new Web3("http://localhost:7545");
const contractAbi = require("../MedicalDataNFT.json");
const contractAddress = "0x9CE8072BB397F1EF4Ae6344DA57B521EE784d5F7";
const contract = new web3.eth.Contract(contractAbi.abi, contractAddress);

const LaboContext = createContext();
export function useLabo() {
  return useContext(LaboContext);
}

export const LaboProvider = ({ children }) => {
  const [nfts, setNfts] = useState();
  //get all nfts for all users and filter the the owned one out
  const getAllNfts = () => {
    try {
      contract.methods
        ._NftsCounter()
        .call()
        .then((counter) => {
          try {
            contract.methods.getNftData().call.then((response) => {
              setNfts(response);
            });
          } catch (error) {
            console.log(error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  //get all nfts for this user

  //get all categorys for this user

  //Add buy function that take list of Lab Reqests

  const { Nfts } = useNftDatabase();
  const { address } = useWallet();

  const [notOwnedList, setNotOwnedList] = useState([]);
  const [ownedList, setOwnedList] = useState([]);

  const [filterdBycategory, setfilterdBycategory] = useState([]);
  const [toBuyList, setToBuyList] = useState([]);
  const [price, setPrice] = useState(0);

  const [filtred, setFiltred] = useState(notOwnedList);

  const Category = (data) => {
    const category = {};
    for (let index = 0; index < data?.length; index++) {
      const owner = data[index].owner;
      if (data[index].name === "Electrolytes") {
        if (category.hasOwnProperty(owner)) {
          category[owner].Electrolytes.push(data[index].tokenId);
        } else {
          category[owner] = { Electrolytes: [], Glucose: [], Cholesterol: [] };
          category[owner].Electrolytes.push(data[index].tokenId);
        }
      }
      if (data[index].name === "Glucose") {
        if (category.hasOwnProperty(owner)) {
          category[owner].Glucose.push(data[index].tokenId);
        } else {
          category[owner] = { Electrolytes: [], Glucose: [], Cholesterol: [] };
          category[owner].Glucose.push(data[index].tokenId);
        }
      }
      if (data[index].name === "Cholesterol") {
        if (category.hasOwnProperty(owner)) {
          category[owner].Cholesterol.push(data[index].tokenId);
        } else {
          category[owner] = { Electrolytes: [], Glucose: [], Cholesterol: [] };
          category[owner].Cholesterol.push(data[index].tokenId);
        }
      }
    }
    setfilterdBycategory(category);
  };
  const Owned = () => {
    const nfts = allNfts.filter((nft) => nft.buyers.includes(address));
    setOwnedList(nfts);
  };
  const NotOwned = () => {
    const nfts = allNfts.filter((nft) => !nft.buyers.includes(address));
    setNotOwnedList(nfts);
  };

  const callAllFunctions = () => {
    Category(notOwnedList);
    NotOwned();
    Owned();
    setFiltred(notOwnedList);
  };
  useEffect(() => {
    callAllFunctions();
  }, [allNfts]);

  return (
    <LaboContext.Provider
      value={{
        filterdBycategory,
        notOwnedList,
        toBuyList,
        ownedList,
        filtred,
        price,
        setfilterdBycategory,
        setNotOwnedList,
        setToBuyList,
        setOwnedList,
        setFiltred,
        Category,
        setPrice,
      }}
    >
      {children}
    </LaboContext.Provider>
  );
};
