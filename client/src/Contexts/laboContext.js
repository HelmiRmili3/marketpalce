import React, { createContext, useContext, useState, useEffect } from "react";
import { useNftDatabase } from "./NFTdatabase";
import { useWallet } from "./walletContext";

const LaboContext = createContext();
export function useLabo() {
  return useContext(LaboContext);
}

export const LaboProvider = ({ children }) => {
  const { allNfts } = useNftDatabase();
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
