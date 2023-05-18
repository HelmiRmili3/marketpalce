import React, { useState } from "react";
import { useLabo } from "../../../../Contexts/laboContext";
import Owners from "./Components/Owners/owners";
import Empty from "./Components/NoNFT/empty";
import Filter from "./Components/Filter/filter";
const Nfts = () => {
  const { categoryzed } = useLabo();
  const [allNfts, setAllNfts] = useState(categoryzed);
  const [selectedNFTs, setSelectedNFTs] = useState([]);
  return (
    <>
      <Filter
        selectedNFTs={selectedNFTs}
        setSelectedNFTs={setSelectedNFTs}
        allNfts={allNfts}
        setAllNfts={setAllNfts}
      />
      {allNfts ? (
        <Owners
          patients={allNfts}
          selectedNFTs={selectedNFTs}
          setSelectedNFTs={setSelectedNFTs}
        />
      ) : (
        <Empty />
      )}
    </>
  );
};
export default Nfts;
